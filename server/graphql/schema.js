import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';
import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  connectionArgs,
  connectionFromArray,
  connectionDefinitions,
  mutationWithClientMutationId,
  cursorForObjectInConnection,
} from 'graphql-relay';

import { getUserIdFromToken } from '../helpers/token';

import viewerResolver from './resolvers/viewerResolver';
import userResolver from './resolvers/userResolver';
import postResolver from './resolvers/postResolver';
import commentResolver from './resolvers/commentResolver';
import createTokenMutator from './mutators/tokenMutator';
import { likePostMutator } from './mutators/postMutator';
import { likeCommentMutator, addCommentMutator } from './mutators/commentMutator';

const {
  nodeInterface,
  nodeField,
} = nodeDefinitions(
  (globalId) => {
    const { type, id, login = null } = fromGlobalId(globalId);
    if (type === 'User') {
      return userResolver(login);
    } else if (type === 'Comment') {
      return commentResolver(id);
    } else if (type === 'Post') {
      return postResolver(id);
    }
    return null;
  },
  (obj) => {
    if (obj.firstName) {
      return userType;
    } else if (obj.mainText) {
      return postType;
    } else if (obj.author && obj.text) {
      return commentType;
    }
    return null;
  },
);

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
  },
  interfaces: [nodeInterface],
});

const { connectionType: userConnection, edgeType: userEdge } =
  connectionDefinitions({
    name: 'User',
    nodeType: userType,
    connectionFields: () => ({
      count: {
        type: GraphQLInt,
        resolve: connection => connection.edges.length,
        description: 'Total count of users likes',
      },
    }),
  });

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: globalIdField('Comment'),
    text: {
      type: GraphQLString,
    },
    author: {
      type: userType,
      resolve: root => userResolver(root, { id: root.author }),
    },
    likes: {
      type: userConnection,
      args: connectionArgs,
      resolve: (root, args) =>
        connectionFromArray(root.likes.map(like =>
          userResolver(root, { id: like })), args),
    },
    hasCurrentUserLiked: {
      type: GraphQLBoolean,
      resolve: root =>
        root.likes.includes(root.userId),
    },
  },
  interfaces: [nodeInterface],
});

const { connectionType: commentConnection } =
  connectionDefinitions({ name: 'Comment', nodeType: commentType });

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: globalIdField('Post'),
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    mainText: {
      type: GraphQLString,
    },
    author: {
      type: userType,
      resolve: userResolver,
    },
    comments: {
      type: commentConnection,
      args: connectionArgs,
      resolve: (root, args) =>
        connectionFromArray(root.comments.map(comment =>
          commentResolver(root, { id: comment })), args),
    },
    likes: {
      type: userConnection,
      args: connectionArgs,
      resolve: (root, args) =>
        connectionFromArray(root.likes.map(like =>
          userResolver(root, { id: like })), args),
    },
    hasCurrentUserLiked: {
      type: GraphQLBoolean,
      resolve: root =>
        root.likes.includes(root.id),
    },
  },
  interfaces: [nodeInterface],
});

const { connectionType: postConnection } =
  connectionDefinitions({ name: 'Post', nodeType: postType });

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: globalIdField('Viewer'),
    userId: {
      type: GraphQLString,
    },
    me: {
      type: userType,
      resolve: (root) => {
        const { userId } = root;
        return userId ? userResolver({}, { id: userId }) : null;
      },
    },
    user: {
      type: userType,
      args: {
        id: {
          name: 'id',
          type: GraphQLString,
        },
      },
      resolve: (root, args) => userResolver(root, args),
    },
    post: {
      type: postType,
      args: {
        id: {
          name: 'id',
          type: GraphQLString,
        },
      },
      resolve: (root, { id }) => {
        if (!id) {
          return null;
        }

        return postResolver(root, { id: fromGlobalId(id).id });
      },
    },
    newestPosts: {
      type: postConnection,
      args: connectionArgs,
      resolve: (root, args) =>
        connectionFromArray(root.newestPosts.map(post =>
          postResolver(root, { id: post.id })), args),
    },
    comment: {
      type: commentType,
      args: {
        id: {
          name: 'id',
          type: GraphQLString,
        },
      },
      resolve: (root, { id }) =>
        commentResolver(root, { id: fromGlobalId(id).id }),
    },
  },
  interfaces: [nodeInterface],
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    viewer: {
      type: viewerType,
      args: {
        token: {
          name: 'token',
          type: GraphQLString,
        },
      },
      resolve: (root, args) =>
        viewerResolver(root, args),
    },
  },
});

const CreateTokenMutation = mutationWithClientMutationId({
  name: 'CreateToken',
  inputFields: {
    login: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    token: {
      type: userEdge,
      resolve: ({ token }) => token,
    },
  },
  mutateAndGetPayload: ({ login, password }) => ({
    token: createTokenMutator({}, { login, password }),
  }),
});

const LikePostMutation = mutationWithClientMutationId({
  name: 'LikePost',
  inputFields: {
    postId: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    newLikeEdge: {
      type: userEdge,
      resolve: payload =>
        postResolver({}, { id: payload.postId })
          .then((post) => {
            if (post.likes.length > 0) {
              return userResolver({}, { id: payload.userId })
                .then(user => ({
                  cursor: cursorForObjectInConnection(
                    post.likes,
                    user.id,
                  ),
                  node: user,
                }));
            }
            return null;
          }),
    },
    post: {
      type: postType,
      resolve: ({ postId, token }) =>
        postResolver({}, { id: postId, token }),
    },
  },
  mutateAndGetPayload: ({ postId, token }) => {
    const { id: localPostId } = fromGlobalId(postId);
    const userId = getUserIdFromToken(token);
    if (userId) {
      return likePostMutator(localPostId, userId)
        .then(post => ({ postId: post.id, userId, token }));
    }
    return { postId: localPostId, userId };
  },
});

const LikeCommentMutation = mutationWithClientMutationId({
  name: 'LikeComment',
  inputFields: {
    commentId: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    comment: {
      type: commentType,
      resolve: ({ id }) => commentResolver({}, { id }),
    },
  },
  mutateAndGetPayload: ({ commentId, token }) => {
    const { id: localCommentId } = fromGlobalId(commentId);
    const userId = getUserIdFromToken(token);
    if (userId) {
      return likeCommentMutator(localCommentId, userId);
    }

    return { id: localCommentId };
  },
});

const AddCommentMutation = mutationWithClientMutationId({
  name: 'AddComment',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
    postId: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    comment: {
      type: commentType,
      resolve: ({ id }) => {
        if (id) {
          return commentResolver({}, { id });
        }

        return null;
      },
    },
  },
  mutateAndGetPayload: ({ text, token, postId }) => {
    const { id: localPostId } = fromGlobalId(postId);
    const userId = getUserIdFromToken(token);
    if (userId) {
      return addCommentMutator(text, userId, localPostId);
    }

    return { id: '' };
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createToken: CreateTokenMutation,
    likePost: LikePostMutation,
    addComment: AddCommentMutation,
    likeComment: LikeCommentMutation,
  },
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

export default schema;

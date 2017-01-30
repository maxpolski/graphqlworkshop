import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import viewerResolver from './resolvers/viewerResolver';
import userResolver from './resolvers/userResolver';
import postResolver from './resolvers/postResolver';
import commentResolver from './resolvers/commentResolver';
import createTokenMutator from './mutators/tokenMutator';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
  },
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    text: {
      type: GraphQLString,
    },
    author: {
      type: UserType,
      resolve: root => userResolver(root, { id: root.author }),
    },
    likes: {
      type: new GraphQLList(UserType),
      resolve: root => root.likes.map(like => userResolver(root, { id: like })),
    },
  },
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
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
      type: UserType,
      resolve: userResolver,
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: root => root.comments.map(comment => commentResolver(root, { id: comment })),
    },
    likes: {
      type: new GraphQLList(UserType),
      resolve: root => root.likes.map(like => userResolver(root, { id: like })),
    },
  },
});

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    userId: {
      type: GraphQLString,
    },
    me: {
      type: UserType,
      resolve: root => userResolver({}, { id: root.userId }),
    },
    user: {
      type: UserType,
      args: {
        id: {
          name: 'id',
          type: GraphQLString,
        },
      },
      resolve: (root, args) => userResolver(root, args),
    },
    post: {
      type: PostType,
      args: {
        id: {
          name: 'id',
          type: GraphQLString,
        },
      },
      resolve: postResolver,
    },
    comment: {
      type: CommentType,
      args: {
        id: {
          name: 'id',
          type: GraphQLString,
        },
      },
      resolve: commentResolver,
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: ViewerType,
      args: {
        token: {
          name: 'token',
          type: GraphQLString,
        },
      },
      resolve: viewerResolver,
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createToken: {
      type: new GraphQLObjectType({
        name: 'Token',
        fields: {
          token: {
            type: GraphQLString,
          },
        },
      }),
      args: {
        login: {
          name: 'login',
          type: GraphQLString,
        },
        password: {
          name: 'password',
          type: GraphQLString,
        },
      },
      resolve: createTokenMutator,
    },
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export default schema;

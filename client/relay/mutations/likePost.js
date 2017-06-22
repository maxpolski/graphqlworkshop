import Relay from 'react-relay';

export default class LikePostMutation extends Relay.Mutation {
  static initialVariables = {
    postId: null,
  };

  static fragments = {
    post: () => Relay.QL`
      fragment on Post {
        id
        hasCurrentUserLiked
        likes(first: 10) {
          count
          edges {
            node {
              firstName
              lastName
            }
          }
        }
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        firstName
        lastName
      }
    `,
  };

  getMutation = () =>
    Relay.QL`mutation{likePost}`;

  getFatQuery = () =>
    Relay.QL`
      fragment on LikePostPayload @relay(pattern: true){
        post {
          id
          hasCurrentUserLiked
          likes {
            count
            edges {
              node {
                firstName
                lastName
              }
            }
          }
        }
        newLikeEdge
      }`;

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'post',
        parentID: this.props.post.id,
        connectionName: 'likes',
        edgeName: 'newLikeEdge',
        rangeBehaviors: {
          '': 'append',
          'orderby(oldest)': 'prepend',
        },
      }];
  }

  getVariables() {
    return {
      postId: this.props.post.id,
      token: localStorage.getItem('token'),
    };
  }

  getOptimisticResponse() {
    return {
      post: {
        id: this.props.post.id,
        hasCurrentUserLiked: !this.props.post.hasCurrentUserLiked,
        likes: {
          count: this.props.post.likes.count + (this.props.post.hasCurrentUserLiked ? -1 : 1),
        },
      },
      newLikeEdge: {
        node: {
          firstName: this.props.me.firstName,
          lastName: this.props.me.lastName,
        },
      },
    };
  }
}

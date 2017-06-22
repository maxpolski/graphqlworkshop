import React, { Component, PropTypes } from 'react';
import Relay, { createContainer } from 'react-relay';

import LikePostMutation from '../../relay/mutations/likePost';

class Likes extends Component {

  _likePost = () => {
    this.props.relay.commitUpdate(
      new LikePostMutation({
        post: this.props.post,
        me: this.props.me,
      }),
    );
  }

  render() {
    const {
      post: {
        hasCurrentUserLiked,
        likes: {
          count: likesCount,
        },
      },
    } = this.props;

    const likeIconType = hasCurrentUserLiked ? '♥' : '♡';

    return (
      <a
        onClick={this._likePost}
        className="post-page__post-holder__tool-panel__like-button"
      >
        {likeIconType}
        {' '}
        {likesCount}
      </a>
    );
  }
}

Likes.propTypes = {
  post: PropTypes.shape({
    hasCurrentUserLiked: PropTypes.bool,
    likes: PropTypes.shape({
      count: PropTypes.number,
    }),
  }).isRequired,
};

export default createContainer(Likes, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        hasCurrentUserLiked
        likes {
          count
        }
        ${LikePostMutation.getFragment('post')}
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        ${LikePostMutation.getFragment('me')}
      }
    `,
  },
});

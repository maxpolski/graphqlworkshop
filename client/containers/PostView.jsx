import React, { Component, PropTypes } from 'react';
import Relay, { createContainer } from 'react-relay';
// import { browserHistory } from 'react-router';

import Likes from './common/Likes';
// import CommentsList from './CommentsList';
// import isAuthorized from '../helpers/authChecker';


class PostView extends Component {
  // likePost = () => {
  //   if (isAuthorized()) {
  //     const {
  //       likePost,
  //       post: {
  //         id: postId,
  //       },
  //     } = this.props;
  //     return likePost(postId);
  //   }

  //   browserHistory.push('/auth');
  // }

  likePost = () => {

  }

  render() {
    const {
      viewer: {
        me,
        post,
        post: {
          title,
          mainText,
        },
      },
    } = this.props;

    const isAuth = !!me;

    return (
      <div>
        <div className="row justify-content-center">
          <div className="post-page__post-holder col-md-8">
            <h1>{title}</h1>
            <div className="post-page__post-holder__post-body">{mainText}</div>
            <div className="offset-md-10">
              <Likes post={post} me={me} />
            </div>
            {/*
              isAuth ? (
                <AddCommentComponent onAddComment={this.onAddComment} />
              )
            :
              (
                <Loading />
              )
            <CommentsList commentsList={comments} />
            */}
          </div>
        </div>
      </div>
    );
  }
}

PostView.propTypes = {
  viewer: PropTypes.shape({
    post: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      mainText: PropTypes.string,
    }),
  }).isRequired,
};

export default createContainer(PostView, {
  initialVariables: {
    postId: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        me {
          firstName,
          lastName,
          ${Likes.getFragment('me')}
        }
        post(id: $postId) {
          id
          title
          mainText
          ${Likes.getFragment('post')}
        }
      }
    `,
  },
});

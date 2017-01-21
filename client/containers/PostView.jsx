import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import getPost, { addComment } from '../apiCalls/postViewCalls';
import { getCurrentUser } from '../apiCalls/userDataCalls';
import { likePostCall } from '../apiCalls/likeCalls';
import CommentsList from './CommentsList';
import AddCommentComponent from './AddCommenTextBox';
import Like from './common/Like';
import Loading from './common/Loading';
import isAuthorized from '../helpers/authChecker';

export default class PostView extends Component {
  state = {
    post: {},
    isFetching: true,
    postComment: [],
    currentUserId: '',
  }

  componentWillMount() {
    const {
      params: {
        postId,
      },
    } = this.props;

    getPost(postId)
      .then(post =>
        getCurrentUser()
          .then(({ _id }) => ({ userId: _id, post })),
      )
      .then(({ userId, post }) =>
        this.setState({
          post,
          isFetching: false,
          currentUserId: userId,
        }),
      );
  }

  onAddComment = (commentText, callBack) => {
    const {
      post: {
        _id: postId,
      },
    } = this.state;
    addComment(postId, commentText)
      .then(() => getPost(postId))
      .then((post) => {
        this.setState({
          post,
        });
        callBack();
      });
  }

  likePost = (callback) => {
    if (isAuthorized()) {
      return likePostCall(this.state.post._id)
        .then(() => getPost(this.state.post._id))
        .then((post) => {
          this.setState({
            post,
          });
          callback(post.likes);
        });
    }

    browserHistory.push('/auth');
  }

  render() {
    const {
      post: {
        title,
        mainText,
        comments,
        likes = [],
      },
      isFetching,
      currentUserId,
    } = this.state;
    const hasPostCurrentUserLike = !!likes.find(like => like === currentUserId);
    const isAuth = isAuthorized();

    return (
      <div>
        {
          isFetching ?
            (
              <Loading />
            )
          :
            (
              <div className="row justify-content-center">
                <div className="post-page__post-holder col-md-8">
                  <h1>{title}</h1>
                  <div className="post-page__post-holder__post-body">{mainText}</div>
                  <div className="offset-md-10">
                    <Like
                      hasLiked={hasPostCurrentUserLike}
                      likesCount={likes.length}
                      handleLike={this.likePost}
                    />
                  </div>
                  {
                    isAuth ? (
                      <AddCommentComponent onAddComment={this.onAddComment} />
                    )
                  :
                    (
                      null
                    )
                  }
                  <CommentsList comments={comments} />
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

PostView.propTypes = {
  params: PropTypes.shape({
    postId: PropTypes.string.isRequired,
  }).isRequired,
};

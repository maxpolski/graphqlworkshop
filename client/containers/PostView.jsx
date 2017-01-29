import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Loading from './common/Loading';
import Like from './common/Like';
import getPost, { addComment } from '../apiCalls/postViewCalls';
import { getCurrentUser } from '../apiCalls/userDataCalls';
import CommentsList from './CommentsList';
import AddCommentComponent from './AddCommenTextBox';
import isAuthorized from '../helpers/authChecker';
import { getPostsLikesById, getPendingLikes } from '../reducers/likes';
import { getPostByPostId } from '../reducers/posts';
import { likePost as likePostAction } from '../actions/likes';
import { getCommentsList as getCommentsListAction } from '../actions/comments';
import { getPendingComments, getCommentsByPostId } from '../reducers/comments';
// import { getPendingUsers, getUserById } from '../reducers/users';

class PostView extends Component {
  componentWillMount() {
    const {
      post: {
        _id: postId,
        comments,
      },
      getCommentsList,
    } = this.props;

    getCommentsList(postId, comments);
  }

  // onAddComment = (commentText, callBack) => {
  //   const {
  //     post: {
  //       _id: postId,
  //     },
  //   } = this.state;
  //   addComment(postId, commentText)
  //     .then(() => getPost(postId))
  //     .then((post) => {
  //       this.setState({
  //         post,
  //       });
  //       callBack();
  //     });
  // }

  likePost = () => {
    if (isAuthorized()) {
      const {
        likePost,
        post: {
          _id: postId,
        },
      } = this.props;
      return likePost(postId);
    }

    browserHistory.push('/auth');
  }

  render() {
    const {
      post: {
        _id: postId,
        title,
        mainText,
        comments,
      },
      likes,
      commentsList,
      pendingLikes,
      pendingComments,
    } = this.props;

    // const hasPostCurrentUserLike = !!likes.find(like => like === currentUserId);
    const isAuth = isAuthorized();
    const hasOwnComments = commentsList.length === comments.length;

    return (
      <div>
        <div className="row justify-content-center">
          <div className="post-page__post-holder col-md-8">
            <h1>{title}</h1>
            <div className="post-page__post-holder__post-body">{mainText}</div>
            <div className="offset-md-10">
              <Like
                hasLiked
                likesCount={likes.length}
                onLikeClick={this.likePost}
              />
            </div>
            {
              isAuth ? (
                <AddCommentComponent onAddComment={this.onAddComment} />
              )
            :
              (
                <Loading />
              )
            }
            {
              pendingComments.includes(postId) || !hasOwnComments ?
                (
                  <Loading />
                )
              :
                (
                  <CommentsList postId={postId} commentsList={commentsList} />
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

PostView.defaultProps = {
  likes: [],
};

PostView.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    comments: PropTypes.string,
    mainText: PropTypes.string,
  }).isRequired,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  pendingComments: PropTypes.array.isRequired,
  getCommentsList: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  post: getPostByPostId(state.posts, ownProps.params.postId),
  likes: getPostsLikesById(state.likes, ownProps.params.postId),
  pendingComments: getPendingComments(state.comments),
  commentsList: getCommentsByPostId(state.comments, ownProps.params.postId),
});

const mapDispatchToProps = dispatch => ({
  likePost: likePostAction(dispatch),
  getCommentsList: getCommentsListAction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);

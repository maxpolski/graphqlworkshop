import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import getPost, { addComment } from '../apiCalls/postViewCalls';
import { getCurrentUser } from '../apiCalls/userDataCalls';
import CommentsList from './CommentsList';
import AddCommentComponent from './AddCommenTextBox';
import Like from './common/Like';
import isAuthorized from '../helpers/authChecker';
import { getPostsLikesById, getPendingLikes } from '../reducers/likes';
import { getPostByPostId } from '../reducers/posts';
import { likePost } from '../actions/likes';

class PostView extends Component {
  state = {
    post: {},
    isFetching: true,
    postComment: [],
    currentUserId: '',
  }

  // componentWillMount() {
  //   const {
  //     params: {
  //       postId,
  //     },
  //   } = this.props;

  //   getPost(postId)
  //     .then(post =>
  //       getCurrentUser()
  //         .then(({ _id }) => ({ userId: _id, post })),
  //     )
  //     .then(({ userId, post }) =>
  //       this.setState({
  //         post,
  //         isFetching: false,
  //         currentUserId: userId,
  //       }),
  //     );
  // }

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
      likePost,
      post: {
        title,
        mainText,
        comments,
      },
      likes = [],
      pendingLikes,
    } = this.props;
    console.log('pendingLikes', pendingLikes);
    // const {
    //   post: {
    //     title,
    //     mainText,
    //     comments,
    //     likes = [],
    //   },
    //   currentUserId,
    // } = this.state;
    // const hasPostCurrentUserLike = !!likes.find(like => like === currentUserId);
    const isAuth = isAuthorized();

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
                null
              )
            }
            <CommentsList comments={comments} />
          </div>
        </div>
      </div>
    );
  }
}

PostView.propTypes = {
  params: PropTypes.shape({
    postId: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  post: getPostByPostId(state.posts, ownProps.params.postId),
  likes: getPostsLikesById(state.likes, ownProps.params.postId),
  pendingLikes: getPendingLikes(state.likes),
});

const mapDispatchToProps = dispatch => ({
  likePost: likePost(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);

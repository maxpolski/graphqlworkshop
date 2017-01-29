import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CommentPreview from './CommentPreview';
import Loading from './common/Loading';
// import { getCommentsList } from '../actions/comments';
import { getCommentsByPostId } from '../reducers/comments';
import { getPendingUsers } from '../reducers/users';

class CommentsList extends Component {

  // componentWillMount() {
  //   const {
  //     postId,
  //     commentsIds,
  //     getCommentsList,
  //   } = this.props;

  //   getCommentsList(postId, commentsIds);
  // }

  // fetchComments = (commentsIds) => {
  //   Promise
  //     .all(
  //       commentsIds.map(commentId =>
  //         getComment(commentId),
  //       ),
  //     ).then(comments =>
  //       Promise.all(comments.map(comment =>
  //         getUser(comment.author),
  //       )).then(authors =>
  //         comments.map((comment) => {
  //           const { author: authorId } = comment;
  //           const { firstName, lastName } = authors.find(({ _id }) => _id === authorId);

  //           return {
  //             ...comment,
  //             author: {
  //               firstName,
  //               lastName,
  //             },
  //           };
  //         }),
  //       ),
  //     ).then(comments =>
  //       this.setState({
  //         comments,
  //         isFetching: false,
  //       }),
  //     );
  // }

  render() {
    const {
      commentsList,
      pendingUsers,
    } = this.props;

    const numOfComments = commentsList.length;

    return (
      <div>
        <h3>Comments:</h3>
        {commentsList.map((comment, index) => {
          if (pendingUsers.includes(comment.author)) {
            return <Loading />;
          }
          return (
            <CommentPreview
              key={comment._id}
              text={comment.text}
              author={comment.author}
              isLastComment={numOfComments - 1 === index}
            />
          );
        })}
      </div>
    );
  }
}

CommentsList.propTypes = {
  commentsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  pendingUsers: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  commentsList: getCommentsByPostId(state.comments, ownProps.postId),
  pendingUsers: getPendingUsers(state.users),
});

export default connect(mapStateToProps)(CommentsList);

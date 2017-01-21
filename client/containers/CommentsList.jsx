import React, { Component, PropTypes } from 'react';

import CommentPreview from './CommentPreview';
import Loading from './common/Loading';
import getComment from '../apiCalls/commentsListCalls';
import { getUser } from '../apiCalls/userDataCalls';

export default class CommentsList extends Component {
  state = {
    isFetching: true,
    comments: [],
    authors: [],
  }

  componentWillMount() {
    const {
      comments: commentsIds,
    } = this.props;

    this.fetchComments(commentsIds);
  }

  componentWillReceiveProps(nextProps) {
    const {
      comments: commentsIds,
    } = nextProps;

    this.fetchComments(commentsIds);
  }

  fetchComments = (commentsIds) => {
    Promise
      .all(
        commentsIds.map(commentId =>
          getComment(commentId),
        ),
      ).then(comments =>
        Promise.all(comments.map(comment =>
          getUser(comment.author),
        )).then(authors =>
          comments.map((comment) => {
            const { author: authorId } = comment;
            const { firstName, lastName } = authors.find(({ _id }) => _id === authorId);

            return {
              ...comment,
              author: {
                firstName,
                lastName,
              },
            };
          }),
        ),
      ).then(comments =>
        this.setState({
          comments,
          isFetching: false,
        }),
      );
  }

  render() {
    const {
      isFetching,
      comments,
    } = this.state;

    if (isFetching) {
      return (
        <Loading />
      );
    }

    const numOfComments = comments.length;

    return (
      <div>
        <h3>Comments:</h3>
        {comments.map((comment, index) => (
          <CommentPreview
            key={comment._id}
            text={comment.text}
            author={comment.author}
            isLastComment={numOfComments - 1 === index}
          />
        ))}
      </div>
    );
  }
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

import React, { PropTypes } from 'react';

const CommentPreview = ({ author, text, isLastComment }) => {
  const commentHolderClassName
    = `post-page__comment-holder ${!isLastComment ? 'border-bottom-0' : ''}`;
  return (
    <div className={commentHolderClassName}>
      <h4>
        {`${author.firstName} ${author.lastName} says:`}
      </h4>
      <div>
        {text}
      </div>
    </div>
  );
};

CommentPreview.propTypes = {
  author: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
  isLastComment: PropTypes.bool.isRequired,
};

export default CommentPreview;

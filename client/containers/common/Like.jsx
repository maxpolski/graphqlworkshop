import React, { Component, PropTypes } from 'react';

const Like = (props) => {
  const {
    hasLiked,
    likesCount,
    onLikeClick,
  } = props;

  const likeIconType = hasLiked ? '♥' : '♡';

  return (
    <a
      onClick={onLikeClick}
      className="post-page__post-holder__tool-panel__like-button"
    >
      {likeIconType}
      {' '}
      {likesCount}
    </a>
  );
};

Like.propTypes = {
  hasLiked: PropTypes.bool.isRequired,
  likesCount: PropTypes.number.isRequired,
  onLikeClick: PropTypes.func.isRequired,
};

export default Like;

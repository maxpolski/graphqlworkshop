import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const PostPreview = (props) => {
  const {
    _id,
    title,
    description,
    isLast,
    likes,
  } = props;

  const className = `main-page__posts-holder__post ${isLast ? 'border-bottom-0' : ''}`;
  const numOfLikes = likes.length;

  return (
    <div className={className}>
      <Link to={`/post/${_id}`}><h1>{title}</h1></Link>
      <div>
        {description}
      </div>
      <div>Likes: {numOfLikes}</div>
    </div>
  );
};

PostPreview.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default PostPreview;

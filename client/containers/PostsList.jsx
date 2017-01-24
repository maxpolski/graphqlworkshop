import React, { PropTypes } from 'react';

import PostPreview from './PostPreview';
import { getPostsLikesById } from '../reducers/likes';

const PostsList = (props) => {
  const {
    posts,
    likes,
  } = props;

  return (
    <div className="col-8 main-page__posts-holder">
      {
        posts.map((post, index) => (
          <PostPreview
            key={post._id}
            _id={post._id}
            likes={getPostsLikesById(likes, post._id)}
            title={post.title}
            description={post.description}
            isLast={posts.length - 1 === index}
          />
        ))
      }
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  likes: PropTypes.object.isRequired,
};

export default PostsList;

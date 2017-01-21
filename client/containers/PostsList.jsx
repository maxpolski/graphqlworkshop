import React, { PropTypes } from 'react';

import PostPreview from './PostPreview';
import Loading from './common/Loading';

const PostsList = (props) => {
  const {
    isFetching,
    posts,
  } = props;

  if (isFetching) {
    return (
      <Loading />
    );
  }

  return (
    <div className="col-8 .main-page__posts-holder">
      {
        posts.map((post, index) => (
          <PostPreview
            key={post._id}
            _id={post._id}
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
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostsList;

import React, { PropTypes } from 'react';
import Relay, { createContainer } from 'react-relay';
import { Link } from 'react-router';

const PostPreview = (props) => {
  const {
    post: {
      id,
      title,
      likes: {
        edges: likes,
      },
      description,
    },
    isLast,
  } = props;

  const className = `main-page__posts-holder__post ${isLast ? 'border-bottom-0' : ''}`;
  const numOfLikes = likes.length;

  return (
    <div className={className}>
      <Link to={`/post/${id}`}><h1>{title}</h1></Link>
      <div>
        {description}
      </div>
      <div>Likes: {numOfLikes}</div>
    </div>
  );
};

PostPreview.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.shape({
      count: PropTypes.number,
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
        }),
      })),
    }),
  }).isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default createContainer(PostPreview, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id
        title
        likes(first: 10) {
          count
          edges {
            node {
              firstName
              lastName
            }
          }
        }
        description
      }
    `,
  },
});

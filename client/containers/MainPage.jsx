import React, { PropTypes } from 'react';
import Relay, { createContainer } from 'react-relay';

import PostPreview from './PostPreview';

const MainPage = props => (
  <div className="row justify-content-center">
    <div className="col-8 main-page__posts-holder">
      {
        props.viewer.newestPosts.edges.map(({ node: post }, index) => (
          <PostPreview
            key={post.id}
            id={post.id}
            post={post}
            isLast={props.viewer.newestPosts.edges.length - 1 === index}
          />
        ))
      }
    </div>
  </div>
);

MainPage.propTypes = {
  viewer: PropTypes.shape({
    newestPosts: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string,
        }),
      })),
    }),
    me: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default createContainer(MainPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        me {
          firstName
        },
        newestPosts(first: 10) {
          edges {
            node {
              id
              ${PostPreview.getFragment('post')}
            }
          }
        }
      }
    `,
  },
});

import React from 'react';
import { connect } from 'react-redux';

import PostsList from './PostsList';
import {
  likePost,
  likeComment,
} from '../actions/likes';

const MainPage = props => (
  <div className="row justify-content-center">
    <PostsList
      {...props}
    />
  </div>
);

const mapStateToProps = ({ likes, posts }) => ({
  likes,
  posts: posts.postsList,
});

const mapDispatchToProps = dispatch => ({
  likePost: likePost(dispatch),
  likeComment: likeComment(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

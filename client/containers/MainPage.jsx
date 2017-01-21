import React, { Component } from 'react';

import getPosts from '../apiCalls/mainPageCalls';
import PostsList from './PostsList';

export default class MainPage extends Component {
  state = {
    posts: [],
    isFetching: true,
    currentPage: 1,
  };

  componentWillMount() {
    const {
      currentPage,
    } = this.state;

    getPosts(currentPage)
      .then((posts) => {
        this.setState({
          posts,
          isFetching: false,
        });
      });
  }

  render() {
    const {
      posts,
      isFetching,
    } = this.state;

    return (
      <div className="row justify-content-center">
        <PostsList posts={posts} isFetching={isFetching} />
      </div>
    );
  }
}

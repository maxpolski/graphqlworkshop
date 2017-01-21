import React, { Component, PropTypes } from 'react';

export default class Like extends Component {
  constructor(props) {
    super();

    this.state = {
      isFetching: false,
      likesCount: props.likesCount,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ likesCount: nextProps.likesCount });
  }

  onLikeClick = () => {
    if (!this.state.isFetching) {
      this.setState({
        isFetching: true,
      });

      this.props.handleLike(this.onLikeRequestDone);
    }
  }

  onLikeRequestDone = likesCount =>
    this.setState({
      likesCount,
      isFetching: false,
    })

  render() {
    const {
      hasLiked,
      likesCount,
    } = this.props;

    const likeIconType = hasLiked ? '♥' : '♡';

    if (!this.state.isFetching) {
      return (
        <a
          onClick={this.onLikeClick}
          className="post-page__post-holder__tool-panel__like-button"
        >
          {likeIconType}
          {' '}
          {likesCount}
        </a>
      );
    }

    return (
      <div>Loading</div>
    );
  }
}

Like.propTypes = {
  hasLiked: PropTypes.bool.isRequired,
  likesCount: PropTypes.number.isRequired,
  handleLike: PropTypes.func.isRequired,
};

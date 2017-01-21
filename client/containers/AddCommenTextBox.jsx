import React, { Component, PropTypes } from 'react';

export default class AddCommentComponent extends Component {
  state = {
    commentDraft: '',
  }

  onAddCommentLocal = (event) => {
    event.preventDefault();

    const {
      onAddComment,
    } = this.props;
    const {
      commentDraft,
    } = this.state;

    commentDraft.trim();

    if (commentDraft !== '') {
      onAddComment(commentDraft, this.clearTextArea);
    }
  }

  onCommentChange = ({ target: { value } }) =>
    this.setState({
      commentDraft: value,
    });

  clearTextArea = () =>
    this.setState({
      commentDraft: '',
    });

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="postComment">Your comment:</label>
          <textarea
            className="form-control"
            name="postComment"
            rows="5"
            onChange={this.onCommentChange}
            value={this.state.commentDraft}
          />
        </div>
        <button onClick={this.onAddCommentLocal}>Add Comment</button>
      </form>
    );
  }
}

AddCommentComponent.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

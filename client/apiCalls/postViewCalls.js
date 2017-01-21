import makeFetch from 'fetch-ponyfill';

const { fetch } = makeFetch();

export default postId =>
  fetch(`/api/post/${postId}`)
    .then(response => response.json());

export const addComment = (postId, commentText) => {
  const token = localStorage.getItem('token');

  return fetch('/api/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId, text: commentText, token }),
  }).then(response => response.json());
};

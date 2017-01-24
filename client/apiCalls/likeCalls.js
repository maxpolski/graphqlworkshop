import makeFetch from 'fetch-ponyfill';

const { fetch } = makeFetch();

const makeFetchConfig = body => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export const likePostCall = postId =>
  fetch('/api/likepost', makeFetchConfig({ postId, token: localStorage.getItem('token') }))
    .then(data => data.json());

export const likeCommentCall = commentId =>
  fetch('/api/likecomment', makeFetchConfig({ commentId, token: localStorage.getItem('token') }))
    .then(data => data.json());

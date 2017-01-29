import makeFetch from 'fetch-ponyfill';

const { fetch } = makeFetch();

export default postId =>
  fetch(`/api/postcomments/${postId}`)
    .then(response => response.json());

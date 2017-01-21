import makeFetch from 'fetch-ponyfill';

const { fetch } = makeFetch();

export default pageNum =>
  fetch(`api/posts/${pageNum || ''}`)
    .then(response => response.json());


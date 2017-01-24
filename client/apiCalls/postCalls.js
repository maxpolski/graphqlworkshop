import makeFetch from 'fetch-ponyfill';

const { fetch } = makeFetch();

export const getPostsList = pageNum =>
  fetch(`api/posts/${pageNum || ''}`)
    .then(response => response.json());

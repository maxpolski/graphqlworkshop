import { getPostsList } from './postCalls';

export default () =>
  getPostsList()
    .then(posts => ({ posts }));


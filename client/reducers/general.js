import {
  INITIALIZE_PENDING,
  INITIALIZE_RESOLVED,
} from '../constants/actions';

const defaultState = {
  isInitialized: false,
  postsPageNum: 1,
};

export default (state = defaultState, { type }) => {
  switch (type) {
    case INITIALIZE_PENDING:
      return { ...state, isInitialized: false };
    case INITIALIZE_RESOLVED:
      return { ...state, isInitialized: true };
    default:
      return state;
  }
};

import {
  INITIALIZE_PENDING,
  INITIALIZE_RESOLVED,
  INITIALIZE_REJECTED,
} from '../constants/actions';
import initializeApiCall from '../apiCalls/initialCall';

export const initialize = dispatch => () => {
  dispatch({ type: INITIALIZE_PENDING });
  initializeApiCall()
    .then(initialData => dispatch({ type: INITIALIZE_RESOLVED, payload: initialData }))
    .catch(err => dispatch({ type: INITIALIZE_REJECTED, payload: err }));
};

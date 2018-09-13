import { createActionThunk } from 'redux-thunk-actions';

export default (name, thunkAction, metaCreator) =>
  createActionThunk(name, (payload, store) => {
    const { getState, dispatch } = store;
    return thunkAction(payload)(dispatch, getState);
  }, metaCreator);

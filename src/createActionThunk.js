import { createActionThunk } from 'redux-thunk-actions';

export default (name, thunkAction, metaCreator) => createActionThunk(name, (params, store) => {
  let storeResult = store;
  if (!store) storeResult = params;
  return thunkAction(store ? params : {}, storeResult);
}, metaCreator);

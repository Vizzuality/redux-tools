import { createActionThunk } from 'redux-thunk-actions';

export default (name, thunkAction, metaCreator) => createActionThunk(name, (...args) => {
  if (args.length >= 2) return thunkAction(args[0])(args[1].dispatch, args[1].getState);
  return thunkAction(null)(args[0].dispatch, args[0].getState);
}, metaCreator);

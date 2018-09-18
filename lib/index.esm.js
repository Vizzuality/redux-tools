import { handleActions, combineActions, createAction, createActions, createCurriedAction, handleAction } from 'redux-actions';
export { combineActions, createAction, createActions, createCurriedAction, handleAction, handleActions } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';
export { createActionThunk } from 'redux-thunk-actions';

function handleModule(moduleFile) {
  var reducers = moduleFile.reducers,
      initialState = moduleFile.initialState;

  var missingPart = '';
  if (!initialState) missingPart = 'initial state';
  if (!reducers) {
    missingPart += missingPart ? 'nor ' : '';
    missingPart += 'default reducers';
  }
  if (missingPart) {
    console.warn('You are attempting to connect a module that doesn\'t export any ' + missingPart + '.');
  }
  return handleActions(reducers.default || reducers, initialState || {});
}

var createThunkAction = (function (name, thunkAction, metaCreator) {
  return createActionThunk(name, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length >= 2) return thunkAction(args[0])(args[1].dispatch, args[1].getState);
    return thunkAction(null)(args[0].dispatch, args[0].getState);
  }, metaCreator);
});

export { handleModule, createThunkAction };

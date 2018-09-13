import { handleActions, combineActions, createAction, createActions, createCurriedAction, handleAction } from 'redux-actions';
export { combineActions, createAction, createActions, createCurriedAction, handleAction, handleActions } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';

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

var createActionThunk$1 = (function (name, thunkAction, metaCreator) {
  return createActionThunk(name, function (params, store) {
    var storeResult = store;
    if (!store) storeResult = params;
    return thunkAction(store ? params : {}, storeResult);
  }, metaCreator);
});

var createThunkAction = (function (name, thunkAction, metaCreator) {
  return createActionThunk(name, function (params, store) {
    var storeResult = store;
    if (!store) storeResult = params;
    return thunkAction(store ? params : {})(storeResult.dispatch, storeResult.getState);
  }, metaCreator);
});

export { handleModule, createActionThunk$1 as createActionThunk, createThunkAction };

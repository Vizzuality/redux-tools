'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reduxActions = require('redux-actions');
var reduxThunkActions = require('redux-thunk-actions');

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
  return reduxActions.handleActions(reducers.default || reducers, initialState || {});
}

var createActionThunk = (function (name, thunkAction, metaCreator) {
  return reduxThunkActions.createActionThunk(name, function (params, store) {
    var storeResult = store;
    if (!store) storeResult = params;
    return thunkAction(store ? params : {}, storeResult);
  }, metaCreator);
});

var createThunkAction = (function (name, thunkAction, metaCreator) {
  return reduxThunkActions.createActionThunk(name, function (params, store) {
    var storeResult = store;
    if (!store) storeResult = params;
    return thunkAction(store ? params : {})(storeResult.dispatch, storeResult.getState);
  }, metaCreator);
});

exports.combineActions = reduxActions.combineActions;
exports.createAction = reduxActions.createAction;
exports.createActions = reduxActions.createActions;
exports.createCurriedAction = reduxActions.createCurriedAction;
exports.handleAction = reduxActions.handleAction;
exports.handleActions = reduxActions.handleActions;
exports.handleModule = handleModule;
exports.createActionThunk = createActionThunk;
exports.createThunkAction = createThunkAction;

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
  return reduxThunkActions.createActionThunk(name, function () {
    if (arguments.length >= 2) return thunkAction(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
    return thunkAction(null, arguments.length <= 0 ? undefined : arguments[0]);
  }, metaCreator);
});

var createThunkAction = (function (name, thunkAction, metaCreator) {
  return reduxThunkActions.createActionThunk(name, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length >= 2) return thunkAction(args[0])(args[1].dispatch, args[1].getState);
    return thunkAction(null)(args[0].dispatch, args[0].getState);
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

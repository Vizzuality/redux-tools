import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';
import isNull from 'lodash/isNull';
import invariant from 'invariant';
import isPlainObject from 'lodash/isPlainObject';
import reduceReducers from 'reduce-reducers';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import includes from 'lodash/includes';

var uuidv1 = require('uuid/v1');

function createAction(name) {
  var payloadCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  var metaCreator = arguments[2];

  invariant(isFunction(payloadCreator) || isNull(payloadCreator), 'Expected payloadCreator to be a function, undefined or null');

  var finalPayloadCreator = isNull(payloadCreator) || payloadCreator === identity ? identity : function (head) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return head instanceof Error ? head : payloadCreator.apply(undefined, [head].concat(args));
  };

  var hasMeta = isFunction(metaCreator);
  var typeSymbol = uuidv1() + name;

  var actionCreator = function actionCreator() {
    var payload = finalPayloadCreator.apply(undefined, arguments);
    var action = {
      type: name,
      key: typeSymbol
    };

    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    if (hasMeta) {
      action.meta = metaCreator.apply(undefined, arguments);
    }

    return action;
  };

  actionCreator.toString = function () {
    return typeSymbol;
  };

  return actionCreator;
}

var createThunkAction = (function (name, thunkAction, metaCreator) {
  var action = createAction(name, null, metaCreator);
  if (!thunkAction) return action;
  var returnAction = function returnAction(payload) {
    return function (dispatch, getState) {
      dispatch(action(payload));
      return thunkAction(payload)(dispatch, getState);
    };
  };

  returnAction.toString = action.toString;
  return returnAction;
});

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function handleAction(symbol) {
  var reducer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  var defaultState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var types = [symbol];
  invariant(!isUndefined(defaultState), 'defaultState for reducer handling ' + types.map(function (t) {
    return t.toString();
  }).join(', ') + ' should be defined');
  invariant(isFunction(reducer) || isPlainObject(reducer), 'Expected reducer to be a function or object with next and throw reducers');

  var _ref = isFunction(reducer) ? [reducer, reducer] : [reducer.next, reducer.throw].map(function (aReducer) {
    return isNil(aReducer) ? identity : aReducer;
  }),
      _ref2 = slicedToArray(_ref, 2),
      nextReducer = _ref2[0],
      throwReducer = _ref2[1];

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];
    var actionType = action.key;

    if (!actionType || !includes(types, actionType)) {
      return state;
    }

    return (action.error === true ? throwReducer : nextReducer)(state, action);
  };
}

function ownKeys(object) {
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    return Reflect.ownKeys(object);
  }

  var keys = Object.getOwnPropertyNames(object);

  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(object));
  }

  return keys;
}

function handleActions(handlers) {
  var defaultState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  invariant(isPlainObject(handlers), 'Expected handlers to be an plain object.');
  var reducers = ownKeys(handlers).reduce(function (stack, symbol) {
    return stack.concat([handleAction(symbol, handlers[symbol], defaultState)]);
  }, []);

  var reducer = reduceReducers.apply(undefined, toConsumableArray(reducers));
  return function (state, action) {
    return reducer(state || defaultState, action);
  };
}

function handleModule(moduleFile) {
  var reducers = moduleFile.reducers,
      initialState = moduleFile.initialState;

  var missingPart = '';
  if (!initialState) missingPart = 'initial state';
  if (!reducers || reducers && !reducers.default) {
    missingPart += missingPart ? 'nor ' : '';
    missingPart += 'reducers';
  }
  if (missingPart) {
    console.warn('You are attempting to connect a module that doesn export any ' + missingPart + '.');
  }
  return handleActions(reducers.default || reducers, initialState || {});
}

// import 'babel-plugin-external-helpers';

export { createAction, handleActions, createThunkAction, handleModule };

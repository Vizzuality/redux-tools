import isPlainObject from 'lodash/isPlainObject';
import reduceReducers from 'reduce-reducers';
import invariant from 'invariant';
import handleAction from './handleAction';
import ownKeys from './ownKeys';
import { flattenReducerMap } from './flattenUtils';

export default function handleActions(handlers, defaultState, { namespace } = {}) {
  invariant(
    isPlainObject(handlers),
    'Expected handlers to be an plain object.'
  );
  const flattenedReducerMap = flattenReducerMap(handlers, namespace);
  const reducers = ownKeys(flattenedReducerMap)
    .reduce((stack, type) =>
      stack.concat(
        [handleAction(
          type,
          flattenedReducerMap[type],
          defaultState
        )])
    , []);

  const reducer = reduceReducers(...reducers);
  return (state = defaultState, action) => reducer(state, action);
}

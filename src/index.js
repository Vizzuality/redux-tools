import {
  combineActions,
  createAction,
  createActions,
  createCurriedAction,
  handleAction,
  handleActions
} from 'redux-actions';
import handleModule from './handleModule';
import createActionThunk from './createActionThunk';
import createThunkAction from './createThunkAction';

export {
  combineActions,
  createAction,
  createActions,
  createCurriedAction,
  handleAction,
  handleActions,
  handleModule,
  createActionThunk,
  createThunkAction // Fallback support for old namespaces
};

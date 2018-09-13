import {
  combineActions,
  createAction,
  createActions,
  createCurriedAction,
  handleAction,
  handleActions
} from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';
import handleModule from './handleModule';
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

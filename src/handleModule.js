import { handleActions } from 'redux-actions';

export default function handleModule(moduleFile) {
  const { reducers, initialState } = moduleFile;
  let missingPart = '';
  if (!initialState) missingPart = 'initial state';
  if (!reducers) {
    missingPart += missingPart ? 'nor ' : '';
    missingPart += 'default reducers';
  }
  if (missingPart) {
    console.warn(`You are attempting to connect a module that doesn't export any ${missingPart}.`);
  }
  return handleActions(reducers.default || reducers, initialState || {});
}

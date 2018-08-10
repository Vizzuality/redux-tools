import handleActions from './handleActions';

export default function handleModule(moduleFile) {
  const { reducers, initialState } = moduleFile;
  let missingPart = '';
  if (!initialState) missingPart = 'initial state';
  if (reducers && !reducers.default) {
    missingPart += missingPart ? 'nor ' : '';
    missingPart += 'default reducers';
  }
  if (missingPart) {
    console.warn(`You are attempting to connect a module that doesn export any ${missingPart}.`);
  }
  return handleActions(reducers.default || reducers, initialState || {});
}

// Logger middleware
const logger = store => next => action => {
  // Group console messages by action.type
  console.group(action.type);
  console.log('The action:', action);
  const returnValue = next(action);
  console.log('The new state: ', store.getState());
  console.groupEnd();
  return returnValue;
};

export default logger;
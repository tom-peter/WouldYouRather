import thunk from 'redux-thunk';
import logger from './logger';
import { applyMiddleware } from 'redux';

// invoke applyMiddleware with the following middlewares
export default applyMiddleware(
	thunk, 
	logger
);

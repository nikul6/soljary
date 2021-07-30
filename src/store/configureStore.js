import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';

const configureStore = () => {
    return createStore(reducers, applyMiddleware(logger));
    
}

export default configureStore;
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import thunk from 'redux-thunk';

const createLogger = ({ getState }) => {
    return (next) => {
        return (action) => {
            const logger = window.console;
            const prevState = getState();
            const returnValue = next(action);
            const nextState = getState();
            logger.log(`PREV_STATE::`, prevState);
            logger.log(`ACTION::${action.type}`);
            logger.log(`NEXT_STATE::`, nextState);
            return returnValue;
        };
    };
};

const store = createStore(appReducer, applyMiddleware(createLogger, thunk));

export default store;

import { combineReducers } from 'redux';
import loginReducer from './components/login/reducer';
import chatReducer from './components/chat-screen/reducer';
import chatStateSReducer from './components/chat-screen/chat-store/reducer';

const reducer = {
    loginReducer,
    chatReducer,
    chatStateSReducer
};
export const rootReducer = combineReducers(reducer);
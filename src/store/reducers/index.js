import { combineReducers } from 'redux';
import { userReducer } from './userReducer' 
import { tripReducer } from './tripReducer' 

export default combineReducers ({
    user: userReducer,
    trip: tripReducer
})
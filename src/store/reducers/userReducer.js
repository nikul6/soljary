import * as actionTypes from '../ActionTypes';

const initialState = {
    loading: false,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    errors: {},
}

export const userReducer = (state = initialState, action) => {
    let errors = JSON.parse(JSON.stringify(state.errors));
    switch (action.type) {
        case actionTypes.FIRST_NAME:
            if (errors.first_name) {
                delete errors.first_name;
            }
            return { ...state, first_name: action.payload, errors: errors };
        case actionTypes.LAST_NAME:
            if (errors.last_name) {
                delete errors.last_name;
            }
            return { ...state, last_name: action.payload, errors: errors };
        case actionTypes.EMAIL:
            if (errors.email) {
                delete errors.email;
            }
            return { ...state, email: action.payload, errors: errors };
        case actionTypes.PASSWORD:
            if (errors.password) {
                delete errors.password;
            }
            return { ...state, password: action.payload, errors: errors };
        case actionTypes.LOGIN_ATTEMPT:
            return { ...state, loading: true };
        case actionTypes.AUTH_FAILED:
            return { ...state, errors: action.payload, loading: false };
        case actionTypes.EMAIL_AUTH_SUCCESS: {
            return {
                ...state,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email: action.payload.email,
                password: action.payload.password,
                loading: false,
            }
        }
        case actionTypes.FORGOT_PASSWORD_ATTEMPT:
            return { ...state, loading: true };
        case actionTypes.FORGOT_PASSWORD_FAILED:
            return { ...state, errors: action.payload, loading: false };
        case actionTypes.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                email: action.payload.email,
                loading: false
            };
        default:
            return state
    }

}
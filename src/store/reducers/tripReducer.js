import * as actionTypes from '../ActionTypes';

const initialState = {
    loading: false,
    trip_name: '',
    trip_person: '',
    start_date: null,
    end_date: null,
    tripInfo: [],
    errors: {},
    spend_name: '',
    spend_money: '',
    tripSpendInfo: [],
    appStoreInfo: [],
}

export const tripReducer = (state = initialState, action) => {
    let errors = JSON.parse(JSON.stringify(state.errors));
    switch (action.type) {
        case actionTypes.TRIP_NAME:
            if (errors.trip_name) {
                delete errors.trip_name;
            }
            return { ...state, trip_name: action.payload, errors: errors };
        case actionTypes.TRIP_PERSON:
            if (errors.trip_person) {
                delete errors.trip_person;
            }
            return { ...state, trip_person: action.payload, errors: errors };
        case actionTypes.TRIP_START_DATE:
            return { ...state, start_date: action.payload };
        case actionTypes.TRIP_END_DATE:
            return { ...state, end_date: action.payload };
        case actionTypes.TRIP_ATTEMPT:
            return { ...state, loading: true };
        case actionTypes.TRIP_FAILED:
            return { ...state, errors: action.payload, loading: false };
        case actionTypes.TRIP_SUCCESS: {
            return {
                ...state,
                trip_name: "",
                trip_person: "",
                start_date: null,
                end_date: null,
                loading: false,
            }

        }
        case actionTypes.START_TRIP_INFO:
            return { ...state, loading: true }
        case actionTypes.FETCH_TRIP_INFO:
            return { ...state, tripInfo: action.payload, loading: false }
        case actionTypes.FINISH_TRIP_INFO:
            return { ...state, loading: false }
        case actionTypes.DELETE_TRIP_START:
            return { ...state, loading: true }
        case actionTypes.TRIP_SPEND_START:
            return { ...state, loading: true }
        case actionTypes.TRIP_SPEND_FAILED:
            return { ...state, loading: false, errors: action.payload }
        case actionTypes.TRIP_SPEND_SUCCESS:
            return {
                ...state,
                spend_name: action.payload.spend_name,
                spend_money: action.payload.spend_money,
                loading: false
            }
        case actionTypes.SPEND_NAME:
            if (errors.spend_name) {
                delete errors.spend_name;
            }
            return { ...state, spend_name: action.payload, errors: errors };
        case actionTypes.SPEND_MONEY:
            if (errors.spend_money) {
                delete errors.spend_money;
            }
            return { ...state, spend_money: action.payload, errors: errors };
        case actionTypes.START_TRIPSPEND_INFO:
            return { ...state, loading: true }
        case actionTypes.FETCH_TRIPSPEND_INFO:
            return { ...state, tripSpendInfo: action.payload, loading: false }
        case actionTypes.FINISH_TRIPSPEND_INFO:
            return { ...state, loading: false }
            case actionTypes.START_APPSTORE_INFO:
            return { ...state, loading: true }
        case actionTypes.FETCH_APPSTORE_INFO:
            return { ...state, appStoreInfo: action.payload, loading: false }
        case actionTypes.FINISH_APPSTORE_INFO:
            return { ...state, loading: false }
        default:
            return state
    }

}
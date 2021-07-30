import {
    TRIP_NAME,
    TRIP_PERSON,
    TRIP_START_DATE,
    TRIP_END_DATE,
    TRIP_ATTEMPT,
    TRIP_FAILED,
    TRIP_SUCCESS,
    START_TRIP_INFO,
    FETCH_TRIP_INFO,
    FINISH_TRIP_INFO,
    DELETE_TRIP_START,
    DELETE_TRIP_SUCCESS,
    SPEND_NAME,
    SPEND_MONEY,
    TRIP_SPEND_START,
    TRIP_SPEND_FAILED,
    TRIP_SPEND_SUCCESS,
    START_TRIPSPEND_INFO,
    FETCH_TRIPSPEND_INFO,
    FINISH_TRIPSPEND_INFO,
    START_APPSTORE_INFO,
    FETCH_APPSTORE_INFO,
    FINISH_APPSTORE_INFO
} from '../ActionTypes';
import firebase from "firebase";
import _ from "lodash";

export const typeTripName = trip_name => {
    return {
        type: TRIP_NAME,  
        payload: trip_name
    }
};    

export const typeTripPerson = trip_person => {
    return {
        type: TRIP_PERSON,
        payload: trip_person
    }
};

export const selectStartDate = start_date => {
    return {
        type: TRIP_START_DATE,
        payload: start_date
    }
};

export const selectEndDate = end_date => {
    return {
        type: TRIP_END_DATE,
        payload: end_date
    }
};

export const typeSpendName = spend_name => {
    return {
        type: SPEND_NAME,  
        payload: spend_name
    }
};

export const typeSpendMoney = spend_money => {
    return {
        type: SPEND_MONEY,  
        payload: spend_money
    }
};

export const addTrip = async (trip_name, trip_person, start_date, end_date, userId, dispatch, navigation) => {
    dispatch({
        type: TRIP_ATTEMPT
    });
    let errors = {}
    if (_.isEmpty(trip_name)) {
        errors['trip_name'] = ['Kindly fill the trip name']
    } else if (_.isEmpty(trip_person)) {
        errors['trip_person'] = ['Kindly fill the trip person']
    } else {
        try{
            await firebase
              .database()
              .ref(`/addTrip/${userId}`)
              .push({trip_name, trip_person, start_date, end_date }); 
              dispatch({ type: TRIP_SUCCESS, payload: {trip_name, trip_person} });
          }catch(err){
              dispatch({
                type: TRIP_FAILED,
                payload: err
            });
          }
    }
    dispatch({
        type: TRIP_FAILED,
        payload: errors
    });
}

export const fetchTripInfo = async (userId, dispatch) => {
    dispatch({ type: START_TRIP_INFO });
    await firebase
      .database()
      .ref(`/addTrip/${userId}`)
      .on("value", snapshot => {
        var index = 0;
        const tripInfo = _.map(snapshot.val(), value => {
          var key = Object.keys(snapshot.val())[index];
          value.tripId = key;
          index = index + 1;
          return value;
        });
        dispatch({ type: FETCH_TRIP_INFO, payload: tripInfo });
        dispatch({ type: FINISH_TRIP_INFO });
        console.log('tripInfo :: ', tripInfo);

      })
  };

  export const deleteTrip = async (userId, tripId, dispatch) => {
      console.log("trip id ********************", tripId)
    dispatch({ type: DELETE_TRIP_START });
    await firebase
    .database()
    .ref(`/addTrip/${userId}/${tripId}/`)
    .remove()
    dispatch({ type: DELETE_TRIP_SUCCESS });
  };

  export const addSpend = async (spend_name, spend_money, tripId, dispatch, navigation) => {
      console.log("dataaa ->", tripId)
    dispatch({
        type: TRIP_SPEND_START
    });
    let errors = {}
    if (_.isEmpty(spend_name)) {
        errors['spend_name'] = ['Kindly fill the spend name']
    } else if (_.isEmpty(spend_money)) {
        errors['spend_money'] = ['Kindly fill the spend money']
    } else {
        try{
            await firebase
              .database()
              .ref(`/addSpend/${tripId}`)
              .push({spend_name, spend_money}); 
              dispatch({ type: TRIP_SPEND_SUCCESS, payload: {spend_name, spend_money} });
              alert("Successssskfgjhfkhj")
          }catch(err){
              dispatch({
                type: TRIP_SPEND_FAILED,
                payload: err
            });
          }
    }
    dispatch({
        type: TRIP_SPEND_FAILED,
        payload: errors
    });
}  

export const fetchTripSpendInfo = async (tripId, dispatch) => {
    dispatch({ type: START_TRIPSPEND_INFO });
    await firebase
      .database()
      .ref(`/addSpend/${tripId}`)
      .on("value", snapshot => {
        var index = 0;
        const tripSpendInfo = _.map(snapshot.val(), value => {
          var key = Object.keys(snapshot.val())[index];
          value.tripSpendId = key;
          index = index + 1;
          return value;
        });
        dispatch({ type: FETCH_TRIPSPEND_INFO, payload: tripSpendInfo });
        dispatch({ type: FINISH_TRIPSPEND_INFO });
        console.log('tripspendInfo :: ', tripSpendInfo);

      })
  };

  export const fetchAppStoreInfo = async (dispatch) => {
    dispatch({ type: START_APPSTORE_INFO });
    await firebase
      .database()
      .ref("/appStore")
      .on("value", snapshot => {
        var index = 0;
        const appStoreInfo = _.map(snapshot.val(), value => {
          index = index + 1;
          return value;
        });
        dispatch({ type: FETCH_APPSTORE_INFO, payload: appStoreInfo });
        console.log('appStoreInfo :: ', appStoreInfo);

      })
  };
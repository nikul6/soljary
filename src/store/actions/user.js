import {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PASSWORD,
    LOGIN_ATTEMPT,
    AUTH_FAILED,
    EMAIL_AUTH_SUCCESS,
    FORGOT_PASSWORD_ATTEMPT,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_SUCCESS
} from '../ActionTypes';
import firebase from "firebase";
import _ from "lodash";
import AsyncStorage from '@react-native-community/async-storage';

export const typeFirstName = first_name => {
    return {
        type: FIRST_NAME,
        payload: first_name
    }
};

export const typeLastName = last_name => {
    return {
        type: LAST_NAME,
        payload: last_name
    }
};

export const typeEmail = email => {
    return {
        type: EMAIL,
        payload: email
    }
};

export const typePassword = password => {
    return {
        type: PASSWORD,
        payload: password
    }
};

export const registerProfile = async (first_name, last_name, email, password, dispatch, navigation) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    dispatch({
        type: LOGIN_ATTEMPT
    });
    var isEmailExist = false;
    await firebase
        .database()
        .ref("/users")
        .once("value", snapshot => {
            var inputEmail = email;
            if (snapshot.exists()) {
                _.map(snapshot.val(), ({ email }) => {
                    if (inputEmail === email)
                        isEmailExist = true;
                });
            }
        });
    let errors = {}
    if (_.isEmpty(first_name)) {
        errors['first_name'] = ['Kindly fill the first name']
    } else if (_.isEmpty(last_name)) {
        errors['last_name'] = ['Kindly fill the last name']
    } else if (_.isEmpty(email)) {
        errors['email'] = ['Kindly fill the email address']
    } else if (!reg.test(email)) {
        errors['email'] = ['Kindly enter a valid email address.']
    } else if (_.isEmpty(password)) {
        errors['password'] = ['kindly fill the password']
    } else if (password.length < 6) {
        errors['password'] = ['kindly fill the more than 6 or more characters ']
    }
    else if (isEmailExist) {
        alert("exitsss")
    } else {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)

        await firebase.auth().onAuthStateChanged(async user => {
            user &&
                (await firebase
                    .database()
                    .ref(`/users/${user.uid}`)
                    .set({
                        first_name,
                        last_name,
                        email,
                        createdAt: (new Date).getTime(),
                        userId: user.uid
                    }));
            user && (
                await firebase.database().ref(`users/${user.uid}`).once('value').then(userData => {
                    var userInfo = userData.val();
                    userInfo.userId = userData.key;

                    dispatch({
                        type: EMAIL_AUTH_SUCCESS,
                        payload: userInfo
                    })
                    AsyncStorage.setItem('user', JSON.stringify(userInfo))
                        .then(() => {
                            navigation.navigate('Dashboard')
                        });
                    console.log("success")
                })
            );
        });
    }
    dispatch({
        type: AUTH_FAILED,
        payload: errors
    });
}

export const login = async (email, password, dispatch, navigation) => {
    console.log("name ->", email)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let errors = {}
    if (_.isEmpty(email)) {
        errors['email'] = ['Kindly fill the email address']
    } else if (!reg.test(email)) {
        errors['email'] = ['Kindly enter a valid email address.']
    } else if (_.isEmpty(password)) {
        errors['password'] = ['kindly fill the password']
    } else {
        try {
            dispatch({
                type: LOGIN_ATTEMPT
            });
            console.log("successssss")
            const res = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
            await firebase
                .database()
                .ref(`/users/${res.user.uid}`)
                .update({ updatedAt: (new Date).getTime(), });

            await firebase.database().ref(`users/${res.user.uid}`).once('value').then(userData => {navigate

                var userInfo = userData.val();
                userInfo.userId = userData.key;
                console.log('login userInfo :: ', userInfo);
                dispatch({ type: EMAIL_AUTH_SUCCESS, payload: userInfo });
                AsyncStorage.setItem('user', JSON.stringify(userInfo))
                    .then(() => {
                        navigation.navigate('TabNavigation')
                    });
            });
        } catch (error) {
            console.log("errorrr ->", error)
            dispatch({
                type: AUTH_FAILED,
                payload: error
            });
            alert("Invalid")
        }
    }
    dispatch({
        type: AUTH_FAILED,
        payload: errors
    });
}

export const forgotPassword = async (email, dispatch, navigation) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    dispatch({
        type: FORGOT_PASSWORD_ATTEMPT
    });
    var isEmailExist = true;
    await firebase
        .database()
        .ref("/users")
        .once("value", snapshot => {
            var inputEmail = email;
            if (snapshot.exists()) {
                _.map(snapshot.val(), ({ email }) => {
                    if (inputEmail === email)
                        isEmailExist = false;
                });
            }
        });
    let errors = {}
    if (_.isEmpty(email)) {
        errors['email'] = ['Kindly fill the email address']
    } else if (!reg.test(email)) {
        errors['email'] = ['Kindly enter a valid email address.']
    } else if (isEmailExist) {
        alert("Your account is not available in our system")
    } else {
        try {
            console.log("successssssssssssssssss")
            await firebase.auth().sendPasswordResetEmail(email)
                .then(function (user) {
                    alert('Please check your email')
                }).catch(function (e) {
                    console.log(e)
                })
            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: email });
            navigation.navigate('Login')
        } catch (error) {
            dispatch({
                type: FORGOT_PASSWORD_FAILED,
                payload: error
            });
        }
    }
    console.log("enter ")
    dispatch({
        type: FORGOT_PASSWORD_FAILED,
        payload: errors
    });
}
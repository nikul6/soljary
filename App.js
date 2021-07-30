/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import Router from './src/components/Router';
import firebase from "firebase";

const store = configureStore();

export default class App extends Component {
  async componentDidMount() {
    const config = {
      apiKey: "AIzaSyAItVi9wlqsHuGiHSB0QaHPsz1qFdoZ85o",
      authDomain: "soljary-5c367.firebaseapp.com",
      databaseURL: "https://soljary-5c367.firebaseio.com",
      projectId: "soljary-5c367",
      storageBucket: "soljary-5c367.appspot.com",
      messagingSenderId: "65146302987",
      appId: "1:65146302987:web:fbf85d591b9a98c3564d0e",
      measurementId: "G-KRPJ3BCJP5"
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <Router />
        </Provider>
      </View>
    )
  }
}

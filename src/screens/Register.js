import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { CustomHeader, CommonButton, BackButton } from "../components";
import { Fonts } from '../common/Fonts'
import Layout from '../common/Layout'
import { Button, Icon } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';
import {
    typeFirstName,
    typeLastName,
    typeEmail,
    typePassword,
    registerProfile
} from '../store/actions/user';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
const { height, width } = Dimensions.get("window");

class Register extends Component {

    centerComponent = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: Layout.window.width * 0.040, fontFamily: Fonts.MontserratBold, }}>Register</Text>
        </View>
    );

    render() {
        const {
            navigation: { navigate, goBack }
        } = this.props;
        return (
            <CustomHeader
                leftComponent={<BackButton color={'#000'} navigate={goBack} />}
                centerComponent={this.centerComponent()}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={inputContainerStyle}>
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor="#9B9A9B"
                            underlineColorAndroid="transparent"
                            style={inputStyle}
                            value={this.props.first_name}
                            onChangeText={(first_name) => this.props.typeFirstName(first_name)}
                        />
                        <Icon name="plane" size={20} color="#FFC526" type="font-awesome" />
                    </View>
                    {this.props.errors.first_name ? (<Text style={{ color: 'red', marginTop: 5, marginBottom: 0 }}>{this.props.errors.first_name}</Text>) : null}
                    <View style={inputContainerStyle}>
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="#9B9A9B"
                            underlineColorAndroid="transparent"
                            style={inputStyle}
                            value={this.props.last_name}
                            onChangeText={(last_name) => this.props.typeLastName(last_name)}
                        />
                        <Icon name="plane" size={20} color="#FFC526" type="font-awesome" />
                    </View>
                    {this.props.errors.last_name ? (<Text style={{ color: 'red' }}>{this.props.errors.last_name}</Text>) : null}
                    <View style={inputContainerStyle}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#9B9A9B"
                            underlineColorAndroid="transparent"
                            style={inputStyle}
                            value={this.props.email}
                            onChangeText={(email) => this.props.typeEmail(email)}
                        />
                        <Icon name="plane" size={20} color="#FFC526" type="font-awesome" />
                    </View>
                    {this.props.errors.email ? (<Text style={{ color: 'red' }}>{this.props.errors.email}</Text>) : null}
                    <View style={inputContainerStyle}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#9B9A9B"
                            underlineColorAndroid="transparent"
                            style={inputStyle}
                            secureTextEntry={true}
                            value={this.props.password}
                            onChangeText={(password) => this.props.typePassword(password)}
                        />
                        <Icon name="plane" size={20} color="#FFC526" type="font-awesome" />
                    </View>
                    {this.props.errors.password ? (<Text style={{ color: 'red' }}>{this.props.errors.password}</Text>) : null}
                    <Button
                        buttonStyle={btnStyle}
                        title={"Sign Up"}
                        onPress={() => {
                            this.props.registerProfile(this.props.first_name, this.props.last_name, this.props.email, this.props.password, this.props.navigation)
                        }}
                    />
                </View>
                <Loader loading={this.props.loading} />
            </CustomHeader>
        )
    }
}

const inputContainerStyle = {
    flexDirection: 'row',
    width: width * 0.90,
    height: height * 0.05,
    borderBottomWidth: 0.5,
    marginTop: height * 0.02,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#E2E2E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#fff'
}

const inputStyle = {
    flex: 1,
    fontSize: 15,
    color: "#9B9A9B",
    marginRight: 10
};

const btnStyle = {
    borderRadius: 5,
    width: width * 0.90,
    backgroundColor: '#FFC526',
    marginTop: 20,
};

const mapStateToProps = state => {
    return {
        first_name: state.user.first_name,
        last_name: state.user.last_name,
        email: state.user.email,
        password: state.user.password,
        loading: state.user.loading,
        errors: state.user.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        typeFirstName: (first_name) => {
            dispatch(typeFirstName(first_name));
        },
        typeLastName: (last_name) => {
            dispatch(typeLastName(last_name));
        },
        typeEmail: (email) => {
            dispatch(typeEmail(email));
        },
        typePassword: (passwprd) => {
            dispatch(typePassword(passwprd));
        },
        registerProfile: (first_name, last_name, email, password, navigation) => registerProfile(first_name, last_name, email, password, dispatch, navigation)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
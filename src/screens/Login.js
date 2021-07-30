import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import { CustomHeader, CommonButton } from "../components";
import { Fonts } from '../common/Fonts'
import Layout from '../common/Layout'
import { Button, Icon } from "react-native-elements";
import {
    typeEmail,
    typePassword,
    login
} from '../store/actions/user';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
const { height, width } = Dimensions.get("window");

class Login extends Component {

    centerComponent = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: Layout.window.width * 0.040, fontFamily: Fonts.MontserratBold, }}>Log In</Text>
        </View>
    );

    render() {
        return (
            <CustomHeader
                centerComponent={this.centerComponent()}
            >
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <View style={inputContainerStyle}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#9B9A9B"
                                underlineColorAndroid="transparent"
                                style={inputStyle}
                                value={this.props.email}
                                onChangeText={(email) => this.props.typeEmail(email)}
                            />
                        </View>
                        {this.props.errors.email ? (<Text style={{ color: 'red', marginTop: 5, marginBottom: 0 }}>{this.props.errors.email}</Text>) : null}
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
                        </View>
                        {this.props.errors.password ? (<Text style={{ color: 'red' }}>{this.props.errors.password}</Text>) : null}
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                        <Text style={{ textAlign: 'right', padding: 5, margin: 20, marginBottom: 0, marginTop: 0, fontFamily: Fonts.MontserratSemiBold, fontSize: Layout.window.width * 0.037, }}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            buttonStyle={btnStyle}
                            title={"Log In"}
                            titleStyle={{ fontFamily: Fonts.MontserratSemiBold, color: '#000', fontSize: Layout.window.width * 0.038 }}
                            //   onPress={onPress}
                            onPress={() => {
                                this.props.login(this.props.email, this.props.password, this.props.navigation)
                            }}
                        />
                    </View>
                </ScrollView>
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: Layout.window.width * 0.040, fontFamily: Fonts.Montserrat }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{ fontSize: Layout.window.width * 0.042, fontFamily: Fonts.MontserratBold }}>REGISTER</Text>
                    </TouchableOpacity>
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
    color: "#000",
    marginRight: 10,
    fontFamily: Fonts.Montserrat
};

const btnStyle = {
    borderRadius: 5,
    width: width * 0.90,
    backgroundColor: '#FFC526',
    marginTop: 20,
};

const mapStateToProps = state => {
    return {
        email: state.user.email,
        password: state.user.password,
        loading: state.user.loading,
        errors: state.user.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        typeEmail: (email) => {
            dispatch(typeEmail(email));
        },
        typePassword: (password) => {
            dispatch(typePassword(password));
        },
        login: (email, password, navigation) => login(email, password, dispatch, navigation)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
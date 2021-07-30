import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { CustomHeader, CommonButton, BackButton } from "../components";
import { Fonts } from '../common/Fonts'
import Layout from '../common/Layout'
import { Button, Icon } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';
import {
    typeEmail,
    forgotPassword
} from '../store/actions/user';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
const { height, width } = Dimensions.get("window");

class ForgotPassword extends Component {

    centerComponent = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: Layout.window.width * 0.040, fontFamily: Fonts.MontserratBold, }}>Forgot Password</Text>
        </View>
    );

    render() {
        const {
            navigation: { navigate, goBack }
          } = this.props;
        return (
            <CustomHeader
                leftComponent={<BackButton color={'#000'} navigate={goBack}/>}
                centerComponent={this.centerComponent()}
            >
                <View style={{margin:10, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{textAlign:'center', fontFamily: Fonts.MontserratSemiBold, fontSize: Layout.window.width * 0.038,}}>An email with the reset link will be{'\n'}sent to you</Text>
                </View>
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
                        <Icon name="plane" size={20} color="#FFC526" type="font-awesome" />
                    </View>
                    {this.props.errors.email ? (<Text style={{ color: 'red', marginTop: 5, marginBottom: 0 }}>{this.props.errors.email}</Text>) : null}
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Button
                        buttonStyle={btnStyle}
                        title={"Forgot"}
                        onPress={() => {
                            this.props.forgotPassword(this.props.email, this.props.navigation)
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
        loading: state.user.loading,
        errors: state.user.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        typeEmail: (email) => {
            dispatch(typeEmail(email));
        },
        forgotPassword: (email, navigation) => forgotPassword(email, dispatch, navigation)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
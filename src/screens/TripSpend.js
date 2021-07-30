import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { CustomHeader, BackButton } from "../components";
import { connect } from 'react-redux';
import Layout from '../common/Layout'
import { Fonts } from '../common/Fonts'
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Button } from 'react-native-elements'
import {
    typeSpendName,
    typeSpendMoney,
    addSpend
} from '../store/actions/trip';
import _ from "lodash";
import Loader from '../components/Loader';
const { height, width } = Dimensions.get("window");

class TripSpend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            data: {}
        };
    }

    componentDidMount() {
        this.getUserData();
    }

    async getUserData() {
        await AsyncStorage.getItem('user').then((user) => {
            var userData = JSON.parse(user);
            this.setState({ userId: userData.userId })
        });
    }

    centerComponent = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: Layout.window.width * 0.040, fontFamily: Fonts.MontserratBold, }}>{this.props.route.params.data.trip_name} Spend</Text>
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
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ marginTop: height * 0.02 }}>
                            <Text style={titleStyle}>Spend Name</Text>
                            <View style={inputContainerStyle}>
                                <TextInput
                                    placeholder="Spend Name"
                                    placeholderTextColor="#9B9A9B"
                                    underlineColorAndroid="transparent"
                                    style={inputStyle}
                                    value={this.props.spend_name}
                                    onChangeText={(spend_name) => this.props.typeSpendName(spend_name)}
                                />
                            </View>
                            {this.props.errors.spend_name ? (<Text style={{ color: 'red', marginTop: 5, marginBottom: 0 }}>{this.props.errors.spend_name}</Text>) : null}
                        </View>
                        <View style={{ marginTop: height * 0.02 }}>
                            <Text style={titleStyle}>Spend Money</Text>
                            <View style={inputContainerStyle}>
                                <TextInput
                                    placeholder="₹"
                                    placeholderTextColor="#9B9A9B"
                                    underlineColorAndroid="transparent"
                                    keyboardType='numeric'
                                    style={inputStyle}
                                    value={this.props.spend_money}
                                    onChangeText={(spend_money) => this.props.typeSpendMoney(spend_money)}
                                />
                            </View>
                            {this.props.errors.spend_money ? (<Text style={{ color: 'red', marginTop: 5, marginBottom: 0 }}>{this.props.errors.spend_money}</Text>) : null}
                        </View>
                        <Button
                            buttonStyle={btnStyle}
                            title={"Add Spend"}
                            titleStyle={{ fontFamily: Fonts.MontserratSemiBold, fontSize: Layout.window.width * 0.038, color: '#000' }}
                            onPress={() => {
                                this.props.addSpend(this.props.spend_name, this.props.spend_money, this.props.route.params.data.tripId)
                            }}
                        />
                    </View>
                </ScrollView>
                <Loader loading={this.props.loading} />
            </CustomHeader>
        )
    }
}

const mainContainerStyle = {
    margin: 10, borderRadius: 10, flexDirection: 'row', backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 0
}

const subContainerStyle = {
    flexDirection: 'row', alignItems: 'center', borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
}

const iconFilledStyle = {
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    overflow: 'hidden',
}

const titletTextStyle = {
    fontFamily: Fonts.MontserratBold, fontSize: Layout.window.width * 0.037, marginLeft: 5
}

const subTextStyle = {
    fontFamily: Fonts.MontserratSemiBold, fontSize: Layout.window.width * 0.036, marginLeft: 5, overflow: 'hidden', flex: 1
}

const noDataFoundStyle = {
    textAlign: 'center', marginTop: 10, fontFamily: Fonts.MontserratSemiBold, color: 'gray'
}

const titleStyle = {
    fontFamily: Fonts.MontserratSemiBold, fontSize: Layout.window.width * 0.037
};

const inputContainerStyle = {
    width: width * 0.90,
    height: height * 0.05,
    borderBottomWidth: 0.5,
    marginTop: height * 0.01,
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
        spend_name: state.trip.spend_name,
        spend_money: state.trip.spend_money,
        loading: state.trip.loading,
        errors: state.trip.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        typeSpendName: (spend_name) => {
            dispatch(typeSpendName(spend_name));
        },
        typeSpendMoney: (spend_money) => {
            dispatch(typeSpendMoney(spend_money));
        },
        addSpend: (spend_name, spend_money, tripId, navigation) => addSpend(spend_name, spend_money, tripId, dispatch, navigation)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripSpend);
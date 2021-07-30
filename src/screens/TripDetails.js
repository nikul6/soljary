import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { CustomHeader, BackButton } from "../components";
import { connect } from 'react-redux';
import Layout from '../common/Layout'
import { Fonts } from '../common/Fonts'
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Divider } from 'react-native-elements'
import {
    fetchTripSpendInfo,
} from '../store/actions/trip';
import _ from "lodash";
import Loader from '../components/Loader';

class TripDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            totalMoney: 0
        };
    }

    componentDidMount() {
        this.props.fetchTripSpendInfo(this.props.route.params.data.tripId);
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
            <Text style={{ color: '#000', fontSize: Layout.window.width * 0.040, fontFamily: Fonts.MontserratBold, }}>Trip Details</Text>
        </View>
    );

    rendeTotal = () => {
        for (let index = 0; index < this.props.tripSpendInfo.length; index++) {
            this.state.totalMoney += Number(this.props.tripSpendInfo[index].spend_money);
            console.log("sum ", this.state.totalMoney)
        }
    }

    renderSpend = () => {
        return _.map(this.props.tripSpendInfo, (data, storykey) => {
            this.state.totalMoney = this.state.totalMoney + Number(data.spend_money)
            console.log("money number->->", this.state.totalMoney)
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, paddingBottom: 0, alignItems: 'center' }} key={storykey}>
                    <Text style={[dataStyle, { textAlign: 'left' }]}>{storykey + 1}</Text>
                    <Text style={[dataStyle, { textAlign: 'center' }]}>{data.spend_name}</Text>
                    <Text style={[dataStyle, { textAlign: 'right', marginRight: 5 }]}>₹{data.spend_money}</Text>
                    <Icon name="remove" size={25} color="#FFC526" type="font-awesome" />
                </View>
            )
        })
    }

    render() {
        const {
            navigation: { navigate, goBack }
        } = this.props;
        return (
            <CustomHeader
                leftComponent={<BackButton color={'#000'} navigate={goBack} />}
                centerComponent={this.centerComponent()}
            >
                <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
                    {/* <Text>{this.props.route.params.data.start_date}</Text> */}
                    <Text style={textStyle}>Trip Name : <Text style={{ fontSize: Layout.window.width * 0.040, fontFamily: Fonts.MontserratSemiBold }}>{this.props.route.params.data.trip_name}</Text></Text>
                    <Text style={textStyle}>Person : <Text style={{ fontSize: Layout.window.width * 0.040, fontFamily: Fonts.MontserratSemiBold }}>{this.props.route.params.data.trip_person}</Text></Text>
                </View>
                <Text style={spendStyle}>Spends</Text>
                <View style={{ backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={headerStyle}>Sr No</Text>
                    <Text style={headerStyle}>Name</Text>
                    <Text style={[headerStyle, { marginRight: 25 }]}>Money</Text>
                </View>
                {this.renderSpend()}
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

const textStyle = {
    fontFamily: Fonts.Montserrat, fontSize: Layout.window.width * 0.037
}

const spendStyle = {
    textAlign: 'center', padding: 10, fontFamily: Fonts.MontserratBold, fontSize: Layout.window.width * 0.037, backgroundColor: '#fff', backgroundColor: '#FFC526'
}

const headerStyle = {
    textAlign: 'center', fontFamily: Fonts.MontserratBold, fontSize: Layout.window.width * 0.037
}

const dataStyle = {
    flex: 1, fontFamily: Fonts.MontserratSemiBold, fontSize: Layout.window.width * 0.037
}

const totalStyle = {
    textAlign: 'center', padding: 10, fontFamily: Fonts.MontserratBold, fontSize: Layout.window.width * 0.037
}

const subTextStyle = {
    fontFamily: Fonts.MontserratSemiBold, fontSize: Layout.window.width * 0.036, marginLeft: 5, overflow: 'hidden', flex: 1
}

const noDataFoundStyle = {
    textAlign: 'center', marginTop: 10, fontFamily: Fonts.MontserratSemiBold, color: 'gray'
}

const mapStateToProps = state => {
    return {
        tripSpendInfo: state.trip.tripSpendInfo,
        loading: state.trip.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTripSpendInfo: (tripId) => fetchTripSpendInfo(tripId, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails);
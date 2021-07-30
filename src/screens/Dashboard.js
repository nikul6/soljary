import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { CustomHeader } from "../components";
import { connect } from 'react-redux';
import Layout from '../common/Layout'
import { Fonts } from '../common/Fonts'
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements'
import {
    fetchTripInfo,
    deleteTrip
} from '../store/actions/trip';
import _ from "lodash";
import Loader from '../components/Loader';
  
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : ""
        };
    }

    componentDidMount() {
        this.getUserData();
    }

    async getUserData() {
        await AsyncStorage.getItem('user').then((user) => {
            var userData = JSON.parse(user);
            this.setState({userId: userData.userId})
            this.props.fetchTripInfo(userData.userId);
        });
    }

    centerComponent = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: Layout.window.width * 0.040, fontFamily: Fonts.MontserratBold, }}>Dashboard</Text>
        </View>
    );

    renderTrip = () => {
        return _.map(this.props.tripInfo, (data, storykey) => {
            return (
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('TripDetails', { data })} key={storykey}>
                <View style={mainContainerStyle}>
                    <View style={{ flex: 8, margin: 10 }}>
                        <View style={subContainerStyle}>
                            <Icon name="plane" size={20} color="#FFC526" type="font-awesome" />
                            <Text style={titletTextStyle}>Trip Name :</Text>
                            <Text style={subTextStyle}>{data.trip_name}</Text>
                        </View>
                        <View style={subContainerStyle}>
                            <Icon name="user-tie" size={20} color="#FFC526" type="font-awesome-5" />
                            <Text style={titletTextStyle}>Trip Person :</Text>
                            <Text style={subTextStyle}>{data.trip_person}</Text>
                        </View>
                        <View style={subContainerStyle}>
                            <Icon name="calendar" size={20} color="#FFC526" type="font-awesome-5" />
                            <Text style={titletTextStyle}>Starting Date :</Text>
                            <Text style={subTextStyle}>{data.start_date}</Text>
                        </View>
                        <View style={subContainerStyle}>
                            <Icon name="calendar" size={20} color="#FFC526" type="font-awesome-5" />
                            <Text style={titletTextStyle}>Ending Date :</Text>
                            <Text style={subTextStyle}>{data.end_date}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2 }}>
                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('TripSpend', { data })}>
                            <View style={iconFilledStyle}>
                                <Icon reverse name='add' type='material' color='#FFC526' size={20} iconStyle={iconFilledStyle} />
                            </View>
                            </TouchableOpacity>
                            <View style={iconFilledStyle}>
                                <Icon reverse name='edit' type='material' color='#FFC526' size={20} iconStyle={iconFilledStyle} />
                            </View>
                            <TouchableOpacity onPress={()=> this.props.deleteTrip(this.state.userId, data.tripId)}>
                            <View style={iconFilledStyle}>
                                <Icon reverse name='delete' type='material' color='#FFC526' size={20} iconStyle={iconFilledStyle} />
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
            )
        });
    }

    render() {
        return (
            <CustomHeader
                centerComponent={this.centerComponent()}
            >
                <ScrollView>
                    {this.props.tripInfo.length !== 0 ? this.renderTrip() :
                        <Text style={noDataFoundStyle}>You do not add any Trip</Text>
                    }
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
    marginBottom:0
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

const mapStateToProps = state => {
    return {
        tripInfo: state.trip.tripInfo,
        loading: state.trip.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTripInfo: (userId) => fetchTripInfo(userId, dispatch),
        deleteTrip:(userId, tripId) => deleteTrip(userId, tripId, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
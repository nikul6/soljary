import React, { Component } from 'react';
import { View, Text, Dimensions, TextInput } from 'react-native';
import { CustomHeader, CommonButton } from "../components";
import { connect } from 'react-redux';
import Layout from '../common/Layout'
import { Fonts } from '../common/Fonts'
import { Button } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';
import {
    typeTripName,
    typeTripPerson,
    selectStartDate,
    selectEndDate,
    addTrip,
} from '../store/actions/trip';
import DatePicker from 'react-native-datepicker';
import Loader from '../components/Loader';
const { height, width } = Dimensions.get("window");

class AddTrip extends Component {
    state = {
        first_name: "",
        date: null,
        userId: ""
    }

    componentDidMount() {
        this.getUserData();
    }

    async getUserData() {
        await AsyncStorage.getItem('user').then((user) => {
            var userData = JSON.parse(user);
            console.log("userInfio , ", userData);
            this.setState({ userId: userData.userId });
            this.setState({ first_name: userData.first_name });
        });
    }

    centerComponent = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: Layout.window.width * 0.040, fontFamily: Fonts.MontserratBold, }}>Add Trip</Text>
        </View>
    );

    render() {
        return (
            <CustomHeader
                centerComponent={this.centerComponent()}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ marginTop: height * 0.02 }}>
                        <Text style={titleStyle}>Trip Name</Text>
                        <View style={inputContainerStyle}>
                            <TextInput
                                placeholder="Trip Name"
                                placeholderTextColor="#9B9A9B"
                                underlineColorAndroid="transparent"
                                style={inputStyle}
                                value={this.props.trip_name}
                                onChangeText={(trip_name) => this.props.typeTripName(trip_name)}
                            />
                        </View>
                        {this.props.errors.trip_name ? (<Text style={{ color: 'red', marginTop: 5, marginBottom: 0 }}>{this.props.errors.trip_name}</Text>) : null}
                    </View>
                    <View style={{ marginTop: height * 0.02 }}>
                        <Text style={titleStyle}>How many person</Text>
                        <View style={inputContainerStyle}>
                            <TextInput
                                placeholder="How many person ex. 5"
                                placeholderTextColor="#9B9A9B"
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'
                                style={inputStyle}
                                value={this.props.trip_person}
                                onChangeText={(trip_person) => this.props.typeTripPerson(trip_person)}
                            />
                        </View>
                        {this.props.errors.trip_person ? (<Text style={{ color: 'red', marginTop: 5, marginBottom: 0 }}>{this.props.errors.trip_person}</Text>) : null}
                    </View>
                    <View style={{ marginTop: height * 0.02 }}>
                        <Text style={titleStyle}>Trip Starting date</Text>
                        <View style={datePickerStyle}>
                            <DatePicker
                                date={this.props.start_date}
                                mode="date"
                                placeholder="Select date"
                                format="DD-MM-YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 0,
                                        marginLeft: -40
                                    },
                                    placeholderText: {
                                        color: "#9B9A9B",
                                        fontFamily: Fonts.Montserrat
                                    },
                                    dateText: {
                                        fontSize: Layout.window.width * 0.040,
                                        color: "#000",
                                        fontFamily: Fonts.Montserrat
                                    }
                                }}
                                onDateChange={(date) => { this.props.selectStartDate(date) }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: height * 0.02 }}>
                        <Text style={titleStyle}>Trip Ending date</Text>
                        <View style={datePickerStyle}>
                            <DatePicker
                                date={this.props.end_date}
                                mode="date"
                                placeholder="Select date"
                                format="DD-MM-YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 0,
                                        marginLeft: -40
                                    },
                                    placeholderText: {
                                        color: "#9B9A9B",
                                        fontFamily: Fonts.Montserrat
                                    },
                                    dateText: {
                                        fontSize: Layout.window.width * 0.040,
                                        color: "#000",
                                        fontFamily: Fonts.Montserrat
                                    }
                                }}
                                onDateChange={(date) => { this.props.selectEndDate(date) }}
                            />
                        </View>
                    </View>
                    <Button
                        buttonStyle={btnStyle}
                        title={"Add Trip"}
                        titleStyle={{ fontFamily: Fonts.MontserratSemiBold, fontSize: Layout.window.width * 0.038, color: '#000' }}
                        onPress={() => {
                            this.props.addTrip(this.props.trip_name, this.props.trip_person, this.props.start_date, this.props.end_date, this.state.userId)
                        }}
                    />
                </View>
                <Loader loading={this.props.loading} />
            </CustomHeader>
        )
    }
}

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

const titleStyle = {
    fontFamily: Fonts.MontserratSemiBold, fontSize: Layout.window.width * 0.037
};

const datePickerStyle = {
    width: width * 0.90,
    height: height * 0.05,
    borderBottomWidth: 0.5,
    marginTop: height * 0.01,
    borderRadius: 5,
    shadowColor: '#E2E2E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#fff'
}

const mapStateToProps = state => {
    return {
        trip_name: state.trip.trip_name,
        trip_person: state.trip.trip_person,
        start_date: state.trip.start_date,
        end_date: state.trip.end_date,
        loading: state.trip.loading,
        errors: state.trip.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        typeTripName: (trip_name) => {
            dispatch(typeTripName(trip_name));
        },
        typeTripPerson: (trip_person) => {
            dispatch(typeTripPerson(trip_person));
        },
        selectStartDate: (start_date) => {
            dispatch(selectStartDate(start_date));
        },
        selectEndDate: (end_date) => {
            dispatch(selectEndDate(end_date));
        },
        addTrip: (trip_name, trip_person, start_date, end_date, userId) => addTrip(trip_name, trip_person, start_date, end_date, userId, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTrip);
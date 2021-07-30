import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { CustomHeader, BackButton } from "../components";
import { connect } from 'react-redux';
import Layout from '../common/Layout'
import { Fonts } from '../common/Fonts'
import { Icon, Rating, Button } from 'react-native-elements'
import {
    fetchAppStoreInfo,
} from '../store/actions/trip';
import _ from "lodash";
import Loader from '../components/Loader';

class AppStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: ""
        };
    }

    componentDidMount() {
        this.props.fetchAppStoreInfo()
    }

    centerComponent = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: Layout.window.width * 0.040, fontFamily: Fonts.MontserratBold, }}>App Store</Text>
        </View>
    );

    renderAppStore = () => {
        return _.map(this.props.appStoreInfo, (data, storykey) => {
            console.log("data ", data.appUrl)
            return (
                <View style={mainContainerStyle} key={storykey}>
                    <View style={{ flex: 1.4 }}>
                        <Image source={{ uri: data.appIcon }} style={{ height: 80, width: 80 }} />
                    </View>
                    <View style={{ justifyContent: 'center', flex: 3 }}>
                        <Text style={{ fontSize: Layout.window.width * 0.037, fontFamily: Fonts.MontserratSemiBold, color: '#000' }}>{data.appName}</Text>
                        <Text style={{ fontSize: Layout.window.width * 0.034, fontFamily: Fonts.Montserrat, color: 'green' }}>Download on Google Play</Text>
                        <Text style={{ fontSize: Layout.window.width * 0.034, fontFamily: Fonts.Montserrat, color: 'gray' }}>{data.appDesc}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="star" size={15} color="#000" type="font-awesome" />
                            <Icon name="star" size={15} color="#000" type="font-awesome" />
                            <Icon name="star" size={15} color="#000" type="font-awesome" />
                            <Icon name="star" size={15} color="#000" type="font-awesome" />
                            <Icon name="star" size={15} color="#000" type="font-awesome" />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            buttonStyle={btnStyle}
                            title={"INSTALL"}
                            titleStyle={{ fontFamily: Fonts.MontserratSemiBold, color: '#fff', fontSize: Layout.window.width * 0.030 }}
                            onPress={() => { Linking.openURL(`market://details?${data.appUrl}`) }}
                        />
                    </View>
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
                {this.renderAppStore()}
                <Loader loading={this.props.loading} />
            </CustomHeader>
        )
    }
}

const mainContainerStyle = {
    backgroundColor: '#fff', margin: 5, flexDirection: 'row', alignItems: 'center', padding: 5, borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
}

const btnStyle = {
    borderRadius: 5,
    backgroundColor: 'green',
};

const mapStateToProps = state => {
    return {
        appStoreInfo: state.trip.appStoreInfo,
        loading: state.trip.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAppStoreInfo: () => fetchAppStoreInfo(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppStore);
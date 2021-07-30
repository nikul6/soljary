import React from 'react'
import { StatusBar, Text, TouchableOpacity, Dimensions, BackHandler, Alert, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../common/Colors'
import { Fonts } from '../common/Fonts'
import { Icon } from 'react-native-elements'

//Screen Declaration
import Register from '../screens/Register'
import Login from '../screens/Login'
import Dashboard from '../screens/Dashboard'
import ForgotPassword from '../screens/ForgotPassword'
import AddTrip from '../screens/AddTrip'
import TripDetails from '../screens/TripDetails'
import TripSpend from '../screens/TripSpend'
import AppStore from '../screens/AppStore'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Dashboard') {
                        return focused ? <Icon type="font-awesome" name="home" color="#000" /> : <Icon type="font-awesome" name="home" color="#fff" />
                    } else if (route.name === 'AddTrip') {
                        return focused ? <Icon type="font-awesome-5" name="plane-departure" color="#000" /> : <Icon type="font-awesome-5" name="plane-departure" color="#fff" />
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: '#000',
                inactiveTintColor: '#fff',
                labelStyle: { fontSize: Dimensions.get('window').width * 0.035, fontFamily: Fonts.MontserratSemiBold },
                labelPosition: "below-icon",
                showLabel: true,
                showIcon: true,
                tabBarPosition: 'bottom',
                iconStyle: {
                    width: 30,
                    height: 30
                },
                style: {
                    backgroundColor: 'rgb(245,245,245)',
                    borderBottomWidth: 1,
                    borderBottomColor: 'green',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: Colors.AppHeaderColor
                },
                lazy: true,
                indicatorStyle: 'green',
            }}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="AddTrip" component={AddTrip} />
        </Tab.Navigator>
    );
}

function ScreenNavigation() {
    return (
        <Stack.Navigator initialRouteName="Login" headerMode="none">
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="TripDetails" component={TripDetails} />
            <Stack.Screen name="TripSpend" component={TripSpend} />
            <Stack.Screen name="AppStore" component={AppStore} />
            <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
    );
}


export default function Router() {
    return (
        <NavigationContainer>
            <ScreenNavigation />
        </NavigationContainer>
    );
}
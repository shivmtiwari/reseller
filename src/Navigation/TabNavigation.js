import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


import Feather from 'react-native-vector-icons/Feather';


import Index from '../Screens/HomeScreen/Index'
import Account from '../Screens/Account'
import CreateAd from '../Screens/CreateAd';
import ItemDetails from '../Screens/ItemDetails';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name="home"
                component={Index}
                options={{ headerShown: false }}
                
                    
            />
            <Stack.Screen
            
                name="ItemDetails"
                component={ItemDetails}
                options={({ route }) => ({
                    title: " ",
                    headerShadowVisible: false
                })}
            />
        </Stack.Navigator>
    );
};

const Tab = createBottomTabNavigator();


const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'home2') {
                        iconName = "home"

                    } else if (route.name == 'user') {
                        iconName = 'user'
                    }
                    else if (route.name == 'createad') {
                        iconName = 'plus-circle'
                    }

                    // You can return any component that you like here!
                    return (
                        <View style={{ marginBottom: -15 }}>
                            <Feather style={{ marginTop: 0 }} name={iconName} size={32} color={color} />
                        </View>
                    )
                },
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarActiveTintColor: '#8C52FF',
                tabBarInactiveTintColor: 'gray',

            })
            }>

            <Tab.Screen name="home2" component={HomeStack} options={({ route }) => ({
                tabBarStyle: {
                    display: getTabBarVisibility(route),
                },
                title: ""
            })} />
            <Tab.Screen name="createad" component={CreateAd} options={{ title: "" }} />
            <Tab.Screen name="user" component={Account} options={{ title: "" }} />
        </Tab.Navigator>

    )

}

const getTabBarVisibility = (route) => {
    // console.log(route);
    // const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    // console.log(routeName);
    const routeName = getFocusedRouteNameFromRoute(route);


    if (routeName == 'ItemDetails') {
        return 'none';
    }
    return 'flex';
};

export default TabNavigation

const styles = StyleSheet.create({})
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Settings from '../screens/Settings';
import HomeScreen from '../screens/HomeScreen';
import { color } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

const Navigator = () => {
    return (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions = {{
                keyboardHidesTabBar: true,
                tabBarShowLabel: false,
                tabBarStyle : {
                   // color: 'white',
                    backgroundColor: 'white'
                    
                },
                
                headerStyle: {
                 //   backgroundColor: 'black'
                },
                //headerShown: false,
               
                headerTitleStyle: {
                    fontSize: 26,
                  //  color: 'white'
                   
                },
                headerTitleAlign: 'center',
               
              
            }}
            
        >
            <Tab.Screen name = "manage subscriptions" component = {HomeScreen}
            options = {{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Icon name = 'home' size = {30}></Icon>
                    </View>
                )
            }}
            />

            <Tab.Screen name = "settings" component = {Settings} 
            options = {{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Icon name = 'settings' size = {30}></Icon>
                    </View>
                )
            }}
            />
        </Tab.Navigator>
    </NavigationContainer>
    );
}

export default Navigator;
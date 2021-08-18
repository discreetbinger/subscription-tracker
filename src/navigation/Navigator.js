import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Settings from '../screens/Settings';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const Navigator = () => {
    return (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions = {{
                tabBarShowLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90
                }
            }}
        >
            <Tab.Screen name = "Home" component = {HomeScreen}
            options = {{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View>
                        <Text>home</Text>
                    </View>
                )
            }}
            />

            <Tab.Screen name = "Settings" component = {Settings} 
            options = {{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View>
                        <Text>settings</Text>
                    </View>
                )
            }}
            />
        </Tab.Navigator>
    </NavigationContainer>
    );
}

export default Navigator;
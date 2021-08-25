import React from 'react';
import { View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

// the navigation function for the bottom tab.
const Navigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    keyboardHidesTabBar: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 26,
                    }
                }}
            >
                <Tab.Screen name="Subscriptions" component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View>
                                <Icon name='home' style={focused ? styles.focusedIcon : styles.unfocusedIcon} />
                            </View>
                        )
                    }}
                />
                <Tab.Screen name="Settings" component={Settings}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View>
                                <Icon name='settings' style={focused ? styles.focusedIcon : styles.unfocusedIcon} />
                            </View>
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    focusedIcon: {
        fontSize: 30,
        color: '#202020'
    },
    unfocusedIcon: {
        fontSize: 30,
        color: 'black'
    }
});

export default Navigator;
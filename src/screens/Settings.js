import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';

const logout = () => {
    Auth.signOut();
}

// store the username of current user.
let userName;
Auth.currentAuthenticatedUser({
    bypassCache: true  // this call will send a request to Cognito to get the latest user data.
}).then(user => userName = user.username)
    .catch(err => console.log(err));

// settings page
const Settings = () => {
    return (
        <View style={styles.settingsPage}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    User: {userName}
                </Text>
                <Icon name='logout' style={styles.logoutIcon} onPress={() => logout()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    settingsPage: {
        backgroundColor: '#121212',
    },
    container: {
        top: 30,
        alignSelf: 'center'
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    logoutIcon: {
        top: 100,
        flex: 1,
        fontSize: 30,
        textAlign: 'center',
        color: 'white'
    }
});

export default Settings;
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Auth } from 'aws-amplify';
import Header from '../components/Header';

const logout = () => {
    Auth.signOut();
}

let userName;
// may be a beter way to get username. use getItem with graphql?
Auth.currentAuthenticatedUser({
    bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data.
}).then(user => userName = user.username)
.catch(err => console.log(err));

const Settings = () => {
    return (
        <View>
            <Header title = 'settings'/>
            <Text>
                Hello {userName}
            </Text>
            <Pressable onPress = {logout}>
                <Text>
                    logout
                </Text>
            </Pressable>
        </View>
    );
}

export default Settings;
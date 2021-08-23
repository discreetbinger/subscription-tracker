import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Auth } from 'aws-amplify';

const logout = () => {
    Auth.signOut();
}

const ret = () => {

    
}

let userName;
// may be a beter way to get username. use getItem with graphql?
Auth.currentAuthenticatedUser({
    bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data.
}).then(user => userName = user.username)
.catch(err => console.log(err));

const Settings = () => {
    return (
      
            <View style = {styles.viewman}>
            <View style = {styles.brrr}>
            <Text style = {styles.title}>
                User: {userName}
            </Text>
           
                <Icon name = 'logout' style = {styles.logout} onPress = {() => logout()}/>
              
            </View>
            </View>
    );
}

const styles = StyleSheet.create ({
    brrr: {
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        
        top: 30,
        color: 'white'
    

    },
    title: {
        fontSize: 20,color: 'white'
    },
    logout: {
        fontSize: 30,
     //   position: 'absolute',
        flex: 1,
        top: 100,
        textAlign: 'center',color: 'white'
    },
    viewman: {
      //  justifyContent: 'center',
      backgroundColor: '#121212',
       // alignSelf: 'flex-end'
    }
});

export default Settings;
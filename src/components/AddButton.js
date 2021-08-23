import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const AddButton = ({addButton}) => {
    return (
                    <Icon style = {styles.btn} name = 'plus-circle' size = {100} onPress = {() => addButton()}/>  
    );
}

const styles = StyleSheet.create ({
    btn: {
        //backgroundColor: '#c2bad8',
        //width: 60,
       // alignItems: 'center',
        position: 'absolute',
        //marginBottom: 20,
        alignSelf: 'flex-end',
        bottom: 40,
        right: 10,
        color: 'darkslateblue'
       // backgroundColor: 'transparent'
    }
});

export default AddButton;
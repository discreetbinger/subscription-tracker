import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const AddButton = ({addButton}) => {
    return (
        <View>
            <TouchableOpacity style = {styles.btn} onPress = {() => addButton()}>
                <Text style = {styles.btnText}>
                    <Icon name = 'plus' size = {20} />
                    {''} add subscription
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create ({
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default AddButton;
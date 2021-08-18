import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const AddModal = ({addModal}) => {

    const [name, setName] = useState();
    const [date, setDate] = useState();

    const onChangeName = (textValue) => setName(textValue);
    const onChangeDate = (textValue) => setDate(textValue);

    return (
        <View>
            <Icon name = 'remove' size = {20} color = 'firebrick' onPress = {() => addModal('', '', false)}/>
            <TextInput placeholder = 'Name' placeholderTextColor = 'black' style = {styles.input} onChangeText = {onChangeName}/>
            <TextInput placeholder = 'Renewal date (DD/MM)' placeholderTextColor = 'black' style = {styles.input} onChangeText = {onChangeDate}/>
            <TouchableOpacity style = {styles.btn} onPress = {() => addModal(name, date, true)}>
                <Text style = {styles.btnText}>
                    <Icon name = 'plus' size = {20} />
                    {''} add subscription
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create ({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16,
        color: 'white',
        backgroundColor: '#202020'
    },
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

export default AddModal;
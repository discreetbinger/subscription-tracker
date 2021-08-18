import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ChangeModal = ({changeModal, deleteModal, item}) => {

    const [name, setName] = useState();
    const [date, setDate] = useState();

    useEffect(() => {
        setName(item.name);
    setDate(item.date);
    }, []);

    const onChangeName = (textValue) => setName(textValue);
    const onChangeDate = (textValue) => setDate(textValue);

    return (
        <View>
            {/*this closes modal*/}
            <Icon name = 'remove' size = {20} color = 'firebrick' onPress = {() => changeModal('', '', false)}/> 
            <TextInput value = {name} placeholder = 'Name' placeholderTextColor = 'black' style = {styles.input} onChangeText = {onChangeName}/>
            <TextInput value = {date} placeholder = 'Renewal date (DD/MM)' placeholderTextColor = 'black' style = {styles.input} onChangeText = {onChangeDate}/>
            <TouchableOpacity style = {styles.btn} onPress = {() => changeModal(name, date, true)}>
                <Text style = {styles.btnText}>
                    <Icon name = 'plus' size = {20} />
                    {''} confirm change
                </Text>
            </TouchableOpacity>
            {/*this deleted item*/}
            {console.log(item.id)}
            <Icon name = 'remove' size = {20} color = 'firebrick' onPress = {() => deleteModal()}/> 
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

export default ChangeModal;
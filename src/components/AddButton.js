import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const AddButton = ({ addButton }) => {
    return (
        <Icon style={styles.btn} name='plus-circle' size={100} onPress={() => addButton()} />
    );
}

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 40,
        right: 10,
        color: 'white'
    }
});

export default AddButton;
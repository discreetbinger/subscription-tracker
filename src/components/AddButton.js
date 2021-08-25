import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// the add button on the home screen.
const AddButton = ({ addButton }) => {
    return (
        <Icon name='plus-circle' style={styles.btn} onPress={() => addButton()} />
    );
}

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        bottom: 40,
        right: 10,
        alignSelf: 'flex-end',
        fontSize: 100,
        color: 'white'
    }
});

export default AddButton;
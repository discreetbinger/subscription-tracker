import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// change OR delete Item
const ListItem = ({item, updateItem}) => {
  return (
    <TouchableOpacity style = {styles.listItem} onPress = {() => updateItem(item)}>
        <View style = {styles.listItemView}>
            <Text style = {styles.listItemText}>
                {item.name}
            </Text>
            <Text style = {styles.listItemText}>
                {item.date}
            </Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create ({
    listItem: {
        padding: 30,
        backgroundColor: '#202020',   //'#f8f8f8',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemText: {
        color: 'white',
        fontSize: 18
    }
});

export default ListItem;
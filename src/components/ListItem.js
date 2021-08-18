import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

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
        padding: 40,
        backgroundColor: '#202020',   //'#f8f8f8',
        borderRadius: 10,
       // borderBottomWidth: 1,
       // borderColor: '#eee',
        marginHorizontal: 20,
        marginVertical: 20
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listItemText: {
        color: 'white',
        fontSize: 18
    }
});

export default ListItem;
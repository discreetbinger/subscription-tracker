import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Services } from '../utils/Data';

const getSymbol = (curr) => {
    if (curr == 'GBP') {
        return '£'
    } else if (curr == 'EUR') {
        return '€'
    } else {
        return '$'
    }
}

const generateRandomColour = () => {
    return '#' + Math.random().toString(16).substr(-6);
}

// change OR delete Item
const ListItem = ({ item, updateItem }) => {

    const [services, setServices] = useState(Services());
    const [colour, setColour] = useState(services.filter(a => a.name == item.name));

    let color = colour.map(a => a.colour).toString();

    if (!color) {
        color = generateRandomColour();
    }

    return (
        <TouchableOpacity style={[styles.listItem, { borderBottomWidth: 1, borderBottomColor: color }]} onPress={() => updateItem(item)}>
            <View style={styles.listItemView}>
                <Text style={[styles.listItemText, styles.l]}>
                    {item.name}
                </Text>
                <View style={styles.k}>
                    <Text style={styles.listItemText}>
                        {item.date}
                    </Text>
                    <Text style={styles.listItemText}>
                        {getSymbol(item.currency)}

                        {item.price}


                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        backgroundColor: '#202020',   //'#f8f8f8',
        marginHorizontal: 30,
        marginVertical: 10,
        borderRadius: 5,
        // borderBottomWidth: 1,
        //borderBottomColor: lad
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    listItemText: {
        color: 'white',
        fontSize: 18,
    },
    l: {
        //  maxWidth: 80,
        flex: 1,
        flexWrap: 'wrap',
        // color: '#FF0000'
    },
    k: {
        // flexDirection: 'row',
        // flex: 2,

        // flexDirection: 'row',

        alignItems: 'center',
        flexWrap: 'wrap',
        //  maxWidth: 60
    }
});

export default ListItem;
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Services, Currencies } from '../utilities/Data';
import { generateRandomColour } from '../utilities/Other';

// the structure of an item/subscription to be listed on the home page.
const ListItem = ({ item, editItem }) => {

    const [services, setServices] = useState(Services());
    const [colour, setColour] = useState(services.filter(a => a.name == item.name).map(a => a.colour).toString());
    const [currencies, setCurrencies] = useState(Currencies());
    const [currency, setCurrency] = useState(currencies.filter(a => a.value == item.currency).map(a => a.symbol).toString());

    // assign random colour if the item/service doesn't have one attached to it.
    if (!colour) {
        setColour(generateRandomColour());
    }

    return (
        <TouchableOpacity style={[styles.container, { borderBottomWidth: 1, borderBottomColor: colour }]} onPress={() => editItem(item)}>
            <View style={styles.listItemView}>
                <Text style={[styles.listItemText, styles.itemName]}>
                    {item.name}
                </Text>
                <View style={styles.datePriceContainer}>
                    <Text style={styles.listItemText}>
                        {item.date}
                    </Text>
                    <Text style={styles.listItemText}>
                        {currency}
                        {item.price}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginVertical: 10,
        borderRadius: 5,
        padding: 15,
        backgroundColor: '#202020'
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    listItemText: {
        fontSize: 18,
        color: 'white'
    },
    itemName: {
        flex: 1,
        flexWrap: 'wrap'
    },
    datePriceContainer: {
        flexWrap: 'wrap',
        alignItems: 'center',
        fontSize: 18,
        color: 'white'
    }
});

export default ListItem;
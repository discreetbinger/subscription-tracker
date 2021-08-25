import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Services, Currencies } from '../utilities/Data';
import { getMatches } from '../utilities/Services';
import { formatDate } from '../utilities/Date';

// modal for editing or deleting a subscription.
const EditModal = ({ changeModal, deleteModal, item }) => {

    const [name, setName] = useState(item.name);
    const [services, setServices] = useState(Services());
    const [suggestions, setSuggestions] = useState([]);
    const [date, setDate] = useState(item.date);
    const [price, setPrice] = useState(String(item.price));
    const [currency, setCurrency] = useState(item.currency);
    const [currencies, setCurrencies] = useState(Currencies());
    const [dropdownMenu, setDropdownMenu] = useState();

    // gets all the matched subscription names.
    const onChangeName = (text) => {
        let matches = getMatches(text, services).map(a => a.name);
        setName(text);
        setSuggestions(matches);
    }

    // resets the suggestions when user selects one.
    const onSuggestHandler = (text) => {
        setName(text);
        setSuggestions([]);
    }

    const onChangeDate = (text) => {
        setDate(formatDate(text));
    }

    const onChangePrice = (text) => {
        setPrice(parseFloat(text));
    }

    const onChangeCurrency = (text) => {
        setCurrency(text);
    }

    return (
        <View style={styles.container}>
            {/*this closes modal*/}
            <Icon name='close-circle-outline' style={styles.closeBtn} onPress={() => changeModal(false)} />
            <TextInput style={styles.input} value={name} placeholder='Name' placeholderTextColor='black' onChangeText={onChangeName} />
            <View style={styles.suggestions}>
                <ScrollView keyboardShouldPersistTaps='always'>
                    {suggestions && suggestions.map((suggestion, i) =>
                        <Text style={styles.suggestionsText} key={i} onPress={() => onSuggestHandler(suggestion)}>
                            {suggestion}
                        </Text>
                    )}
                </ScrollView>
            </View>
            <TextInput keyboardType="number-pad" style={styles.input} value={date} placeholder='Renewal date (DD/MM)' placeholderTextColor='black' onChangeText={onChangeDate} />
            <View style={styles.priceCurr}>
                <TextInput keyboardType="number-pad" value={price} style={[styles.input, styles.price]} placeholder='Price' placeholderTextColor='black' onChangeText={onChangePrice} />
                <DropDownPicker dropDownContainerStyle={styles.dropdownMenu} style={[styles.input, styles.curr]} placeholder="Curr" onPress={() => Keyboard.dismiss()}
                    open={dropdownMenu} value={currency} items={currencies} setOpen={setDropdownMenu} setValue={onChangeCurrency} setItems={setCurrencies} />
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => changeModal(name, date, price, currency, true)}>
                    <Icon name='check-circle-outline' style={styles.addBtn} />
                </TouchableOpacity>
                {/*this deletes item*/}
                <TouchableOpacity style={styles.btn} onPress={() => deleteModal()}>
                    <Icon name='delete-circle-outline' style={styles.removeBtn} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 50
    },
    closeBtn: {
        alignSelf: 'flex-end',
        paddingVertical: 15,
        fontSize: 30,
        color: 'firebrick'
    },
    input: {
        margin: 5,
        borderRadius: 5,
        height: 60,
        padding: 9,
        backgroundColor: 'white',
        fontSize: 16,
        color: 'black'
    },
    suggestions: {
        bottom: 9,
        margin: 5,
        maxHeight: 137,
        backgroundColor: 'white'
    },
    suggestionsText: {
        borderBottomWidth: 1,
        borderColor: 'black',
        padding: 7
    },
    priceCurr: {
        flexDirection: 'row',
        marginTop: 9
    },
    price: {
        width: 100
    },
    curr: {
        width: 100
    },
    dropdownMenu: {
        margin: 5,
        borderRadius: 5,
        width: 100,
        padding: 9
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 9
    },
    btn: {
        margin: 5,
        marginHorizontal: 15,
        borderRadius: 5,
        color: 'transparent'
    },
    addBtn: {
        fontSize: 57,
        color: 'green'
    },
    removeBtn: {
        fontSize: 57,
        color: 'red'
    }
});

export default EditModal;
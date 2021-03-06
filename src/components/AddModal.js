import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Services, Currencies } from '../utilities/Data';
import { getMatches } from '../utilities/Services';
import { formatDate } from '../utilities/Date';

// modal for adding a subscription.
const AddModal = ({ addModal }) => {

    const [name, setName] = useState();
    const [services, setServices] = useState(Services());
    const [suggestions, setSuggestions] = useState([]);
    const [date, setDate] = useState();
    const [price, setPrice] = useState();
    const [currency, setCurrency] = useState();
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
            <Icon name='close-circle-outline' style={styles.closeBtn} onPress={() => addModal(false)} />
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
                <TextInput keyboardType="number-pad" style={[styles.input, styles.price]} placeholder='Price' placeholderTextColor='black' onChangeText={onChangePrice} />
                <DropDownPicker dropDownContainerStyle={styles.dropdownMenu} style={[styles.input, styles.curr]} placeholder="Curr" onPress={() => Keyboard.dismiss()}
                    open={dropdownMenu} value={currency} items={currencies} setOpen={setDropdownMenu} setValue={onChangeCurrency} setItems={setCurrencies} />
                <TouchableOpacity style={styles.btn} onPress={() => addModal(name, date, price, currency, true)}>
                    <Icon name='plus-circle-outline' style={styles.addBtn} />
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
    btn: {
        alignSelf: 'center',
        margin: 5,
        marginLeft: 'auto',
        borderRadius: 5,
        color: 'transparent'
    },
    addBtn: {
        fontSize: 57,
        color: 'green'
    }
});

export default AddModal;
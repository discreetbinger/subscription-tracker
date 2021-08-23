import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {DateFormatter} from '../utils/DateFormatter';
import { Services, Currencies } from '../utils/Data';
import { getMatches } from '../utils/Services';

const AddModal = ({addModal}) => {

    const [name, setName] = useState();
    const [date, setDate] = useState();
    const [price, setPrice] = useState();

    const [dropDownMenu, setDropDownMenu] = useState();
    const [currency, setCurrency] = useState();
    const [currencies, setCurrencies] = useState(Currencies());

    const onChangeDate = (textValue) => { 
        setDate(DateFormatter(textValue));
    }

    const [services, setServices] = useState(Services());
   
    const [suggestions, setSuggestions] = useState([]);

    const onChangeName = (text) => {
        let matches = getMatches(text, services);
        let pl = matches.map(a => a.name)
        console.log(pl)
        setSuggestions(pl)
        
        setName(text);
    }

    const onSuggestHandler = (text) => {
        setName(text);
        setSuggestions([]);
    }

    const onChangePrice = (textValue) => {
        setPrice(parseFloat(textValue));
    }

    const onChangeCurrency = (textValue) => {
        setCurrency(textValue);
    }

    return (
        <View style = {styles.container}>
            <Icon name = 'close-circle-outline' style = {styles.closeBtn} onPress = {() => addModal(false)}/>
            <TextInput placeholder = 'Name' placeholderTextColor = 'black' style = {styles.input} value = {name} onChangeText = {onChangeName}/>
            
            
            <View style = {styles.suggestions}>
            <ScrollView keyboardShouldPersistTaps = 'always'>
            {suggestions && suggestions.map((suggestion, i) => 
            
            <Text style = {styles.suggestionsText} key = {i} onPress={() => onSuggestHandler(suggestion)}>
                {suggestion}
            </Text>
          
            )}
             </ScrollView>
            </View>
            
            <TextInput keyboardType="number-pad" placeholder = 'Renewal date (DD/MM)' placeholderTextColor = 'black' style = {styles.input} value = {date} onChangeText = {onChangeDate}/>

            <View style = {styles.priceCurr}>
            <TextInput keyboardType="number-pad" placeholder = 'Price' placeholderTextColor = 'black' style = {[styles.input, styles.price]} onChangeText = {onChangePrice}/>

            <DropDownPicker dropDownContainerStyle = {styles.dropDown} onPress = {() => Keyboard.dismiss()} placeholder = "Curr" style = {[styles.input, styles.curr]}
            open = {dropDownMenu} value = {currency} items = {currencies} setOpen = {setDropDownMenu} setValue = {onChangeCurrency} setItems = {setCurrencies} />
            
            <TouchableOpacity style = {styles.btn} onPress = {() => addModal(name, date, price, currency, true)}>
            <Icon name = 'plus-circle-outline' style = {styles.addBtn} />
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    dropDown: {
        width: 100,
        padding: 9,
        margin: 5,
        borderRadius: 5
    },
    price: {
        width: 100,   
    },
    curr: {
        width: 100,
    },
    priceCurr: {
        flexDirection: 'row',
        marginTop: 9,
    },
    container: {
        marginHorizontal: 50,
    },
    closeBtn: {
        fontSize: 30,
        color: 'firebrick',
        alignSelf: 'flex-end',
       paddingVertical: 15,
    },
    input: {
        height: 60,
        fontSize: 16,
        color: 'black',
        backgroundColor: 'white',
        padding: 9,
        margin: 5,
        borderRadius: 5,
    },
    btn: {
        borderRadius: 5,
        alignSelf: 'center',
        marginLeft: 'auto',
        margin: 5,
        color: 'transparent'
    },
    addBtn: {
        color: 'green',
        fontSize: 57,
    },
    suggestions: {
        backgroundColor: 'white',
        margin: 5,
        bottom: 9,
        maxHeight: 137,
    },
    suggestionsText: {
        borderColor: 'black',
        borderBottomWidth: 1,
        padding: 7,
    },
});

export default AddModal;
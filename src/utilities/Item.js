import { Alert } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { createItem, deleteItem, updateItem } from '../graphql/mutations';
import { v4 as uuid } from 'uuid';
import { checkName } from '../utilities/Services';
import { checkDate } from '../utilities/Date';

// functions for adding, changing and deleting subscriptions.

// adds a new subscription.
export const add = async (items, setItems, name, date, price, currency, modalIsOpen, setAddModalOpen) => {
    try {
        if (modalIsOpen) {
            if (name && date && price && currency) {
                if (checkName(name, items)) {
                    if (checkDate(date)) {
                        const newItem = { id: uuid(), name: name, date: date, price: price, currency: currency }
                        setItems(prevItems => {
                            return [...prevItems, newItem]
                        });
                        await API.graphql(graphqlOperation(createItem, { input: newItem }))
                    } else {
                        Alert.alert('Error', 'Make sure date is valid')
                        return;
                    }
                } else {
                    Alert.alert('Error', 'You already have this subscription')
                    return;
                }
            } else {
                Alert.alert('Error', 'Please fill all the fields');
                return;
            }
        }
        setAddModalOpen(false);
    } catch (e) {
        console.log(e);
    }
}

// changes the subscription.
export const change = async (items, setItems, itemToEdit, name, date, price, currency, modalIsOpen, setEditModalOpen) => {
    try {
        if (modalIsOpen) {
            if (name && date && price && currency) {
                if (checkDate(date)) {
                    const changedItem = { id: itemToEdit.id, name: name, date: date, price: price, currency: currency }
                    setItems(prevItems => {
                        prevItems[prevItems.findIndex(item => item.id == itemToEdit.id)] = changedItem;
                        return prevItems;
                    });
                    await API.graphql(graphqlOperation(updateItem, { input: changedItem }))
                } else {
                    Alert.alert('Error', 'Make sure date is valid')
                    return;
                }
            } else {
                Alert.alert('Error', 'Please fill all the fields');
                return;
            }
        }
        setEditModalOpen(false);
    } catch (e) {
        console.log(e);
    }
}

// deletes the subscription.
export const del = async (setItems, itemToEdit, setEditModalOpen) => {
    try {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != itemToEdit.id);
        });
        await API.graphql(graphqlOperation(deleteItem, { input: { id: itemToEdit.id } }));
        setEditModalOpen(false);
    } catch (e) {
        console.log(e);
    }
}
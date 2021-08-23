import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Modal } from 'react-native';
import { v4 as uuid } from 'uuid';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';
import AddModal from '../components/AddModal';
import ChangeModal from '../components/ChangeModal';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from '../graphql/queries';
import { createItem, deleteItem, updateItem } from '../graphql/mutations';
import { Dimensions } from 'react-native';
const HomeScreen = () => {

  const [items, setItems] = useState([]);

  // gets list of subs/items from database
  useEffect(() => {
    const fetchItems = async () => {
      try {

        const itemsResult = await API.graphql(
          graphqlOperation(listItems)
        )

        console.log(itemsResult)
        // sort in order of creation because hashmaps dont have order.
        setItems(itemsResult.data.listItems.items.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1));
        console.log(items)

      } catch (e) {
        console.log(e);
      }
    }

    fetchItems();

  }, [])

  // checks if services already exists
  const checkName = (text) => {
    if (items.find(item => item.name == text)) {
      return false;
    }
    return true;
    //  prevItems[prevItems.findIndex(item => item.id == theItem.id)] = updatedItem;
  }

  const checkDate = (text) => {
    if (text.length == 5 && text.includes('/')) {

      const day = parseInt(text.substring(0, 2));
      const month = parseInt(text.substring(3));
      const thirtyone = [1, 3, 5, 7, 8, 10, 12];
      const thirty = [4, 6, 9, 11];

      if (month >= 1 && month <= 12) {

        if (thirtyone.includes(month)) {

          if (day >= 0 && day <= 31) {
            return true;
          }
        } else if (thirty.includes(month)) {
          if (day >= 0 && day <= 30) {
            return true;
          }
        } else {
          if (day >= 0 && day <= 28) {
            return true;
          }
        }
      }
    }

    return false;
  }

  const addItem = async (text, text2, text3, text4, bool) => {
    try {

      if (bool) {

        if (text && text2 && text3 && text4) {

          if (checkName(text)) {

            if (checkDate(text2)) {

              const newItem = { id: uuid(), name: text, date: text2, price: text3, currency: text4 }

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
      console.log(e)
    }
  }

  const changeItem = async (text, text2, text3, text4, bool) => {
    try {

      if (bool) {

        if (text && text2 && text3 && text4) {

          if (checkDate(text2)) {

            const updatedItem = { id: theItem.id, name: text, date: text2, price: text3, currency: text4 }

            setItems(prevItems => {
              prevItems[prevItems.findIndex(item => item.id == theItem.id)] = updatedItem;
              return prevItems;
            });

            await API.graphql(graphqlOperation(updateItem, { input: updatedItem }))

          } else {
            Alert.alert('Error', 'Make sure date is valid')
            return;
          }

        } else {
          Alert.alert('Error', 'Please fill all the fields');
          return;
        }
      }
      setChangeModalOpen(false);

    } catch (e) {
      console.log(e)
    }
  }

  // merge delete and edit?
  const deleteItemm = async () => {
    try {

      setItems(prevItems => {
        return prevItems.filter(item => item.id != theItem.id);
      });

      await API.graphql(graphqlOperation(deleteItem, { input: { id: theItem.id } }))

      setChangeModalOpen(false);

    } catch (e) {
      console.log(e)
    }
  }

  const [addModalOpen, setAddModalOpen] = useState(false);
  const addButton = () => {
    setAddModalOpen(true);
  }

  const [theItem, setTheItem] = useState(false);
  const [changeModalOpen, setChangeModalOpen] = useState(false);
  const editItem = (item) => {
    setChangeModalOpen(true);
    setTheItem(item);
  }

  return (
    <View style={styles.container}>

      <Modal visible={addModalOpen} animationType={'fade'} transparent={true} onRequestClose={() => setAddModalOpen(false)}>
        <View style={styles.modal}>
          <AddModal addModal={addItem} />
        </View>
      </Modal>

      <Modal visible={changeModalOpen} animationType={'fade'} transparent={true} onRequestClose={() => setChangeModalOpen(false)}>
        <View style={styles.modal}>
          <ChangeModal changeModal={changeItem} deleteModal={deleteItemm} item={theItem} />
        </View>
      </Modal>

      <FlatList style = {styles.gr}
        data={items}
        renderItem={({ item }) =>
          <ListItem item={item}
            updateItem={editItem}
          />}
      />
      <AddButton addButton={addButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  gr: {
    marginVertical: 10
    //bottom: 'auto'
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',

  },
  modal: {
    flex: 0,
    backgroundColor: '#202020',
    //backgroundColor: '#121212',
    margin: 0,
    height: Dimensions.get('window').height - 75 - 60,
    top: 60
  },
});

export default HomeScreen;
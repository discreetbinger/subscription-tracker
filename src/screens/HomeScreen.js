import React, {useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Modal } from 'react-native';
import { v4 as uuid } from 'uuid';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AddModal from '../components/AddModal';
import ChangeModal from '../components/ChangeModal';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from '../graphql/queries';
import { createItem, deleteItem, updateItem } from '../graphql/mutations';

const HomeScreen = () => {

  const [items, setItems] = useState([]);

  // gets list of subs/items from database
  useEffect ( () => {
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

  const addItem = async (text, text2, bool) => {
    try {

      if (bool) {

        if (text && text2) {
          console.log(text)
          const newItem = {id: uuid(), name: text, date: text2}
    
          setItems(prevItems => {
            return [...prevItems, newItem]
          });

          await API.graphql(graphqlOperation(createItem, {input: newItem}))

        } else {
          Alert.alert('Error', 'empty string');
          return;
        }
      }
      setAddModalOpen(false);

    } catch (e) {
      console.log(e)
    }
  }
  
  const changeItem = async (text, text2, bool) => {
    try {

      if (bool) {

        if (text && text2) {

          const updatedItem = {id: theItem.id, name: text, date: text2}
    
          setItems(prevItems => {
            prevItems[prevItems.findIndex(item => item.id == theItem.id)] = updatedItem;
            return prevItems;
          });

          await API.graphql(graphqlOperation(updateItem, {input: updatedItem}))

        } else {
          Alert.alert('Error', 'empty string');
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

      await API.graphql(graphqlOperation(deleteItem, {input: {id: theItem.id}}))

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
        <View style = {styles.container}>

          <Modal visible = {addModalOpen} animationType = {'fade'} transparent = {true} onRequestClose = {() => setAddModalOpen(false)}>
            <View style = {styles.modal}>
              <AddModal addModal = {addItem}/>
            </View>
          </Modal>
          
          <Modal visible = {changeModalOpen} animationType = {'fade'} transparent = {true} onRequestClose = {() => setChangeModalOpen(false)}>
            <View style = {styles.modal}>
              <ChangeModal changeModal = {changeItem} deleteModal = {deleteItemm} item = {theItem}/>
            </View>
          </Modal>

          <Header title = 'subscriptions'/>
          <AddButton addButton = {addButton}/>
          <FlatList
            data = {items}
            renderItem = {({item}) => 
            <ListItem item = {item} 
            updateItem = {editItem}  
            />}
          /> 
        </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  modal: {
    flex: 1,
    backgroundColor: '#202020',
    margin: 20,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
});

export default HomeScreen;
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Modal, Dimensions } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from '../graphql/queries';
import { add, change, del } from '../utilities/Item';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

// main page where the subscriptions are listed.
const HomeScreen = () => {

  const [items, setItems] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // gets the items from database.
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsResult = await API.graphql(
          graphqlOperation(listItems)
        );
        // sort in order of creation because hashmaps dont have order.
        setItems(itemsResult.data.listItems.items.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1));
      } catch (e) {
        console.log(e);
      }
    }
    fetchItems();
  }, []);

  const addButton = () => {
    setAddModalOpen(true);
  }

  const editItem = (item) => {
    setItemToEdit(item);
    setEditModalOpen(true);
  }

  const addItem = (name, date, price, currency, modalIsOpen) => {
    add(items, setItems, name, date, price, currency, modalIsOpen, setAddModalOpen);
  }

  const changeItem = (name, date, price, currency, modalIsOpen) => {
    change(items, setItems, itemToEdit, name, date, price, currency, modalIsOpen, setEditModalOpen);
  }

  const deleteItem = () => {
    del(setItems, itemToEdit, setEditModalOpen);
  }

  return (
    <View style={styles.container}>
      <Modal visible={addModalOpen} animationType={'fade'} transparent={true} onRequestClose={() => setAddModalOpen(false)}>
        <View style={styles.modal}>
          <AddModal addModal={addItem} />
        </View>
      </Modal>
      <Modal visible={editModalOpen} animationType={'fade'} transparent={true} onRequestClose={() => setEditModalOpen(false)}>
        <View style={styles.modal}>
          <EditModal changeModal={changeItem} deleteModal={deleteItem} item={itemToEdit} />
        </View>
      </Modal>
      <FlatList style={styles.list}
        data={items}
        renderItem={({ item }) =>
          <ListItem item={item}
            editItem={editItem}
          />}
      />
      <AddButton addButton={addButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  modal: {
    top: 60,
    flex: 0,
    margin: 0,
    height: Dimensions.get('window').height - 75 - 60,
    backgroundColor: '#202020'
  },
  list: {
    marginVertical: 10
  }
});

export default HomeScreen;
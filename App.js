import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { Header } from "react-native-elements";
import {  SearchBar} from 'react-native-elements';
//import {CheckBox} from 'native-base';
import {
  Alert,
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import CustomButton from "./components/ButtonComponent";

import { todoItems } from "./constants/dummyToDoList";

export default function App() {
  const [getText, setText] = useState("");
  const [getList, setList] = useState(todoItems);
  const [editingItem, setEditingItem] = useState(0);

  const addItem = () => {
    //console.log(getText);

    //here to add in a list take from the text field and save it in a list
    //with a random number ....
    setList([...getList, { key: Math.random().toString(), data: getText }]);
    setText("");
    //after write the keyboard will be remove from the
    //screen
    Keyboard.dismiss();
  };

  const removeItem = (itemKey) => {
    Alert.alert(
      `Delete "${getList.find((item) => item.key == itemKey).data}" ?`,
      "",
      [
        {
          text: "No",

          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () =>
            setList((list) => getList.filter((item) => item.key != itemKey)),
        },
      ]
    );
  };

  const editItem = (item) => {
    setText(item.data);
    setEditingItem(item.key);
  };

  const updateItem = () => {
    setList((list) =>
      getList.map((item) =>
        item.key === editingItem ? { key: item.key, data: getText } : item
      )
    );
    setText("");
    setEditingItem(0);
  };

  const scrollView = (
    <ScrollView style={styles.scrollview}>
      {getList.map((item, index) => (
        <TouchableOpacity
          key={item.key}
          activeOpacity={0}
          onPress={() => editItem(item)}
        >
          <View style={styles.scrollviewItem}>
            <Text style={styles.scrollviewText}>
              {index + 1}) {item.data}
            </Text>
            <TouchableOpacity onPress={() => removeItem(item.key)}>
              <View style={styles.crosstextcontainer}>
                <Text style={styles.crosstext}>X</Text>
              
            </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const emptyScrollView = (
    <View style={{ paddingTop: 30 }}>
      <Text style={{ fontStyle: "italic", fontSize: 20, color: "grey" }}>
        No ToDo Items!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "To Do List", style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
      <Text style={styles.title}></Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Item"
          onChangeText={(text) => setText(text)}
          value={getText}
        />

        <CustomButton
          text={editingItem === 0 ? "ADD" : "UPDATE"}
          textSize={16}
          textColor="white"
          onPressEvent={editingItem === 0 ? addItem : updateItem}
          disabled={getText.length <= 0}
        />

    
     
      </View>
      {getList.length <= 0 ? emptyScrollView : scrollView}
    </View>
  );
}

const styles = StyleSheet.create({
  crosstextcontainer: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 6,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  
  },
  crosstext: {
    fontSize: 25,
    color: "red",
    fontWeight: "bold",
  },
  scrollviewText: {
    fontSize: 26,
    color: "blue",
  },
  scrollview: {
    paddingTop: 50,
    width: "100%",
  },
  scrollviewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(176, 230, 255)",
    alignSelf: "center",
    padding: 5,
    margin: 10,
    width: "90%",
    borderRadius: 10,
  },
  title: {
    fontSize: 64,
    color: "lightgrey",
  },
  container: {
    flex: 1,
    backgroundColor: "#61cbff",
    alignItems: "center",
    paddingTop: 30,
  },
  inputContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    borderColor: "#69b6ff",
    shadowColor: "#69b6ff",
    borderWidth: 1,
    borderBottomWidth: 3,
    width: "68%",
    // borderRadius: 50,
    fontSize: 20,
    padding: 10,
    backgroundColor: "white",
  
  },
  header: {},
  checkcontainer: {},
});

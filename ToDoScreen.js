import React from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, StatusBar, FlatList, Image, ScrollView, Button } from "react-native"
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
// import { useDispatch, useSelector } from "react-redux"
// import { fetchTodo, updateTodo } from "./todoSlice"
import { useRecoilState } from "recoil"
import { todoAtom } from "./todoAtom" 
import { fetchTodo, updateTodo } from "./api"

const ToDoScreen = ({ navigation }) => {

  const [todo, setTodo] = useRecoilState(todoAtom)
  const [idUpdate, setIdUpdate] = React.useState('')
  const [textUpdate, setTextUpdate] = React.useState('')
  // const dispatch = useDispatch()
  // const { items } = useSelector((state) => state.todo)

  // React.useEffect(() => {
  //   dispatch(fetchTodo())
  // }, [dispatch])
  
  React.useEffect(() => {
    const loadTodo = async () => {
      const todoData = await fetchTodo();
      setTodo(todoData)
    }

    loadTodo()
  }, [setTodo])

  const addToDo = () => {
    navigation.navigate("AddJob")
  }

  const handleUpdateTodo = () => {
    dispatch(updateTodo({ id: idUpdate, updateTodo: { todo_name: textUpdate } }))
  }

  const renderItem = (item) => {
    return <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, backgroundColor: "#d2d5d8", padding: 10, borderRadius: 20}}>
      <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
        <AntDesign name="checksquareo" size={24} color="#369f5b" />
        <Text style={{marginLeft: 20}}>{item.todo_name}</Text>
      </View>
      <View>
        <Pressable onPress={() => setIdUpdate(item.todo_id)}>
          <AntDesign name="edit" size={24} color="#e06f70" />
        </Pressable>
      </View>
    </View>
  }

  return <SafeAreaView style={style.container}>
    <View style={style.item}>
      <View style={{display: "flex", flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#9da2ac", borderRadius: 5, marginTop: 20}}>
        <Fontisto style={{marginLeft: 10}} name="search" size={18} color="black" />
        <TextInput style={{marginLeft: 10, width: "100%", height: "100%", padding: 8}} placeholder="Search"/>
      </View>
    </View>
    <View style={[style.item, style.todo]}>
      <ScrollView style={{height: 400, width: "100%"}}>
      <FlatList
        data={todo}
        keyExtractor={item => item.todo_id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
      </ScrollView>
      <View style={{marginTop: 20, backgroundColor: "#00bdd6", borderRadius: "50%"}}>
        <Pressable onPress={() => addToDo()}>
          <Text style={{color: "white", fontSize: 30, padding: 10, paddingLeft: 20, paddingRight: 20}}>+</Text>
        </Pressable>
      </View>
    </View>
        <View style={{ marginTop: 20 }}>
          <Text>Update Todo for {idUpdate}:</Text>
          <TextInput
            placeholder="Updated Title"
            onChangeText={(text) => setTextUpdate(text)}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <Button title="Submit Update" onPress={() => handleUpdateTodo()} />
        </View>
  </SafeAreaView>
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
  },
  item: {
    width: "90%"
  },
  todo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 96
  }
})

export default ToDoScreen;
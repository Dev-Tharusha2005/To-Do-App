import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: null,
    completed: false,
  });
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 1, name: 'Work', icon: 'briefcase-outline', color: '#4A90E2' },
    { id: 2, name: 'Personal', icon: 'home-outline', color: '#E67E22' },
    { id: 3, name: 'Study', icon: 'book-outline', color: '#9B59B6' },
    { id: 4, name: 'Health', icon: 'fitness-outline', color: '#27AE60' },
    { id: 5, name: 'Goals', icon: 'trophy-outline', color: '#F1C40F' },
  ];

  const {
    container,
    header,
    searchInput,
    themeToggle,
    categoryContainer,
    categoryBox,
    categoryText,
    taskBox,
    taskActionContainer,
    completButton,
    deleteButton,
    taskName,
    taskDescription,
    fab,
    modalBackground,
    modalContainer,
    modalTitle,
    input,
    modalButton,
  } = styles;

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, selectedCategory, searchQuery]);

  const saveTasksToStorage = async (taskList) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(taskList));
    } catch (e) {
      console.log('Error saving tasks', e);
    }
  };

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem('tasks');
      if (data) setTasks(JSON.parse(data));
    } catch (e) {
      console.log('Error loading tasks', e);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];
    if (selectedCategory) {
      filtered = filtered.filter(
        (task) => task.category.id === selectedCategory.id
      );
    }
    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredTasks(filtered);
  };

  const saveTask = () => {
    if (!newTask.title || !newTask.description || !newTask.category) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    let updatedTasks = [...tasks];
    if (currentTaskIndex !== null) {
      updatedTasks[currentTaskIndex] = newTask;
    } else {
      updatedTasks.push(newTask);
    }

    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    setNewTask({ title: '', description: '', category: null, completed: false });
    setCurrentTaskIndex(null);
    setModalVisible(false);
  };

  const editTask = (index) => {
    setCurrentTaskIndex(index);
    setNewTask(tasks[index]);
    setModalVisible(true);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  return (
    <View style={[container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      {/* Header */}
      <View style={header}>
        <TextInput
          placeholder="Search Task"
          placeholderTextColor={isDark ? '#aaa' : '#555'}
          style={[
            searchInput,
            {
              backgroundColor: isDark ? '#333' : '#fff',
              color: isDark ? '#fff' : '#000',
            },
          ]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={[
            themeToggle,
            { backgroundColor: '#5F33E1' },
          ]}
          onPress={toggleTheme}
        >
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            color={'#ffffffff'}
            size={28}
          />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Categories */}
        <ScrollView
          horizontal
          contentContainerStyle={categoryContainer}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={[
              categoryBox,
              { backgroundColor: selectedCategory ? '#999' : '#5F33E1' },
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={categoryText}>All</Text>
          </TouchableOpacity>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                categoryBox,
                {
                  backgroundColor: cat.color,
                  opacity: selectedCategory?.id === cat.id ? 1 : 0.6,
                },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Ionicons name={cat.icon} size={24} color="white" />
              <Text style={categoryText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tasks */}
        <View style={{ marginTop: 10, rowGap: 15 }}>
          {filteredTasks.length === 0 ? (
            <Text
              style={{
                textAlign: 'center',
                color: isDark ? '#aaa' : '#555',
                marginTop: 30,
              }}
            >
              No tasks found. Add one using the + button!
            </Text>
          ) : (
            filteredTasks.map((task, index) => (
              <View
                key={index}
                style={[
                  taskBox,
                  { backgroundColor: isDark ? '#222' : '#EEE9FF' },
                ]}
              >
                <Text
                  style={[
                    taskName,
                    {
                      color: isDark ? '#fff' : '#24252C',
                      textDecorationLine: task.completed
                        ? 'line-through'
                        : 'none',
                    },
                  ]}
                >
                  🏷️ {task.title}
                </Text>
                <Text
                  style={[
                    taskDescription,
                    {
                      color: isDark ? '#ccc' : '#000',
                      textDecorationLine: task.completed
                        ? 'line-through'
                        : 'none',
                    },
                  ]}
                >
                  {task.description}
                </Text>
                <Text style={{ color: task.category.color, fontWeight: 'bold' }}>
                  {task.category.name}
                </Text>

                <View style={taskActionContainer}>
                  <TouchableOpacity
                    style={completButton}
                    onPress={() => toggleCompleted(index)}
                  >
                    <Text style={{ color: '#fff' }}>
                      {task.completed ? 'Undo' : 'Completed'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={deleteButton}
                    onPress={() => deleteTask(index)}
                  >
                    <Text style={{ color: '#fff' }}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[modalButton, { backgroundColor: '#5F33E1', width: 90 }]}
                    onPress={() => editTask(index)}
                  >
                    <Text style={{ color: '#fff' }}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={fab}
        onPress={() => {
          setModalVisible(true);
          setCurrentTaskIndex(null);
          setNewTask({ title: '', description: '', category: null, completed: false });
        }}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Add/Edit Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalBackground}>
          <View
            style={[
              modalContainer,
              { backgroundColor: isDark ? '#333' : '#fff' },
            ]}
          >
            <Text style={[modalTitle, { color: isDark ? '#fff' : '#000' }]}>
              {currentTaskIndex !== null ? 'Update Task' : 'Add Task'}
            </Text>
            <TextInput
              placeholder="Title"
              placeholderTextColor={isDark ? '#aaa' : '#555'}
              style={[
                input,
                {
                  backgroundColor: isDark ? '#222' : '#EEE9FF',
                  color: isDark ? '#fff' : '#000',
                },
              ]}
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor={isDark ? '#aaa' : '#555'}
              style={[
                input,
                {
                  backgroundColor: isDark ? '#222' : '#EEE9FF',
                  color: isDark ? '#fff' : '#000',
                  height: 80,
                },
              ]}
              multiline
              value={newTask.description}
              onChangeText={(text) =>
                setNewTask({ ...newTask, description: text })
              }
            />

            <Text
              style={{ color: isDark ? '#fff' : '#000', marginBottom: 5 }}
            >
              Select Category:
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    categoryBox,
                    {
                      backgroundColor: item.color,
                      marginRight: 10,
                      opacity: newTask.category?.id === item.id ? 1 : 0.6,
                    },
                  ]}
                  onPress={() => setNewTask({ ...newTask, category: item })}
                >
                  <Ionicons name={item.icon} size={24} color="white" />
                  <Text style={categoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={[modalButton, { backgroundColor: '#5F33E1' }]}
                onPress={saveTask}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  {currentTaskIndex !== null ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalButton, { backgroundColor: '#f11616' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  header: { width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  searchInput: { flex: 1, height: 45, paddingHorizontal: 15, borderRadius: 10, borderWidth: 1, borderColor: '#5F33E1', fontSize: 15 },
  themeToggle: { width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  categoryContainer: { paddingVertical: 10, columnGap: 10, paddingHorizontal: 5 },
  categoryBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, width: 115, borderRadius: 10, paddingHorizontal: 10 },
  categoryText: { color: 'white', fontWeight: 'bold', marginLeft: 6, fontSize: 16 },
  taskBox: { width: '100%', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 12, rowGap: 10 },
  taskActionContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 5 },
  completButton: { height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#45da17', flexDirection: 'row', paddingHorizontal: 10 },
  deleteButton: { height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#f11616', paddingHorizontal: 10 },
  taskName: { fontWeight: 'bold', fontSize: 18 },
  taskDescription: { fontSize: 14 },
  fab: { position: 'absolute', bottom: 50, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#5F33E1', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: '90%', borderRadius: 15, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: { width: '100%', height: 50, borderRadius: 10, paddingHorizontal: 10, marginBottom: 10 },
  modalButton: { flex: 1, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
});





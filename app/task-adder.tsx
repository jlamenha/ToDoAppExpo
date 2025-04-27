import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform, LayoutAnimation } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTasks } from '@/contexts/TaskContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const AddTaskScreen = () => {
  const { addTask } = useTasks();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate instanceof Date ? dueDate : new Date(),
      completed: false,
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    addTask(newTask);

    setTimeout(() => {
      router.back();
    }, 100);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'ios' && event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }

    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <LinearGradient colors={['#71c49c', '#F0EAD6']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Add a New Task</Text>

        {/* Title Input */}
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
          style={styles.input}
        />

        {/* Description Input */}
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#999"
          style={styles.input}
        />

        {/* Due Date Input */}
        {Platform.OS === 'web' ? (
          <input
            type="date"
            value={dueDate.toISOString().split('T')[0]}
            onChange={(e) => setDueDate(new Date(e.target.value))}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
              width: '100%',
            }}
          />
        ) : (
          <>
            <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
              <Text style={styles.dateText}>Due Date: {dueDate.toDateString()}</Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            )}
          </>
        )}

        {/* Add Task Button */}
        <Pressable style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    backgroundColor: '#71c49c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AddTaskScreen;
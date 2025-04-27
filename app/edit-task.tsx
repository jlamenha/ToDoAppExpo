import { View, Text, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '@/contexts/TaskContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';
import { LayoutAnimation } from 'react-native';

export default function EditTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };
  const { tasks, updateTask, deleteTask } = useTasks();

  const task = tasks.find((t) => t.id === id);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  

  const handleSave = () => {
    if (!task) return;
    updateTask(task.id, {
      title,
      description,
      dueDate,
    });
    setTimeout(() => {
      router.back();
    }, 100); 
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <LinearGradient colors={['#71c49c', '#F0EAD6']} style={styles.gradientContainer}>
      <View style={styles.container}>
        {task ? (
          <>
            <Text style={styles.header}>Edit Task</Text>

            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
            <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
              <Text style={styles.dateText}>Due Date: {dueDate.toDateString()}</Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}

            <Pressable style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => {
                Alert.alert(
                  "Delete Task",
                  "Are you sure you want to delete this task?",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        deleteTask(task.id);
                        setTimeout(() => {
                          router.back();
                        }, 100);
                      }
                    }
                  ]
                );
              }}
            >
              <Text style={styles.deleteButtonText}>Delete Task</Text>
            </Pressable>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Task not found.</Text>
            <Pressable
              onPress={() => router.back()}
              style={{ marginTop: 20, padding: 10, backgroundColor: 'white', borderRadius: 8 }}
            >
              <Text style={{ color: '#71c49c', fontWeight: 'bold' }}>Go Back</Text>
            </Pressable>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  dateInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#71c49c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#71c49c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ff4d4d', // 🔴 red outline
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#ff4d4d', // 🔴 red text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

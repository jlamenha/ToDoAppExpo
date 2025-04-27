import { useSort } from '@/contexts/SortContext';
import { Text, View, StyleSheet,FlatList, TouchableOpacity, Pressable  } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useTasks } from '../../contexts/TaskContext'; 
import { Ionicons } from "@expo/vector-icons";
import { useFilter } from '@/contexts/FilterContext';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const { tasks, toggleTaskCompletion } = useTasks();
  const { filter } = useFilter();
  const { sortOrder } = useSort();
  const router = useRouter();
  
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    const timeA = new Date(a.dueDate).getTime();
    const timeB = new Date(b.dueDate).getTime();
  
    return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
  });

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [sortOrder]);

  return (
    <LinearGradient colors={['#71c49c', '#F0EAD6']} style={styles.gradientContainer}>
      <View style={{ flex: 1, padding: 20 }}>
        {filteredTasks.length === 0 ? (
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>No tasks!</Text>
        ) : (
          <FlatList
            data={sortedTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
              {/* Top Row: Title + Edit Icon */}
              <View style={styles.taskHeader}>
                <TouchableOpacity
                  style={styles.taskTitleContainer}
                  onPress={() => toggleTaskCompletion(item.id)}
                >
                  <Ionicons
                    name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={24}
                    color={item.completed ? "#71c49c" : "#ccc"}
                  />
                  <Text style={[
                    styles.taskTitle,
                    item.completed && styles.completedTaskTitle
                  ]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>

                {/* Edit Button */}
                <Pressable onPress={() => router.push({ pathname: '/edit-task', params: { id: item.id } })}>
                  <Ionicons name="create-outline" size={24} color="#71c49c" />
                </Pressable>
              </View>

              {/* Task details */}
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskDueDate}>Due: {new Date(item.dueDate).toDateString()}</Text>
            </View>
            )}
          />
        )}
      </View>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  gradientContainer: { flex: 1 },
  contentContainer: { flex: 1, padding: 20 },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  completedTaskTitle: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    marginLeft: 32,
  },
  taskDueDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    marginLeft: 32,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

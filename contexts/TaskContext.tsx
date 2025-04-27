import React, { createContext, useState, useContext, ReactNode } from 'react';
import Task  from '../types/Task';
import { LayoutAnimation } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { View, Text } from 'react-native'; 

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: string) => void;
  updateTask: (id: string, updatedFields: { title?: string; description?: string; dueDate?: Date }) => void;
  deleteTask: (id: string) => void;
  deleteCompletedTasks: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks', error);
      } finally {
        setLoading(false); // always stop loading, no matter what
      }
    };
  
    loadTasks();
  }, []);

  useEffect(() => {
    if (loading) return; // Don't save until initial loading is done
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks', error);
      }
    };

    
    saveTasks();
  }, [tasks]);

  const addTask = (task: Task) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(prev => [...prev, task]);
  };


  const toggleTaskCompletion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (id: string, updatedFields: { title?: string; description?: string; dueDate?: Date }) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const deleteCompletedTasks = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const deleteTask = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }
  
  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, updateTask, deleteTask, deleteCompletedTasks }}>
      {children}
    </TaskContext.Provider>
    );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};


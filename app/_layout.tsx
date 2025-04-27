import { Stack } from "expo-router";
import { Provider as PaperProvider } from 'react-native-paper';
import { TaskProvider } from "@/contexts/TaskContext";
import { FilterProvider } from "@/contexts/FilterContext";
import { LayoutAnimation } from 'react-native';
import { SortProvider } from "@/contexts/SortContext";
import 'react-native-get-random-values';

export default function RootLayout() {
  return (
  <TaskProvider>
    <FilterProvider>
    <SortProvider>
    <PaperProvider>
  <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: "#71c49c"
      },
      headerTintColor: "#71c49c"
    }}>
    <Stack.Screen name="(tabs)" options={{headerShown:false}} />
    <Stack.Screen name="+not-found" options={{title: "Page not found"}}/>
    <Stack.Screen 
          name="task-adder" 
          options={{ 
            presentation: 'modal',
            title: 'Add Task',
            headerStyle: {
              backgroundColor: "#71c49c",
            },
            headerTintColor: "white"
          }} 
        />
    <Stack.Screen
    name="edit-task"
    options={{
      presentation: 'modal',
      title: 'Edit Task',
      headerStyle: { backgroundColor: '#71c49c' },
      headerTintColor: 'white',
    }}
/>
    
  </Stack>
    </PaperProvider>
    </SortProvider>
    </FilterProvider>
  </TaskProvider>
  )
}

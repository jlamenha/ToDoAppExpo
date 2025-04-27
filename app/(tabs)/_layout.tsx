import React, { useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Pressable } from "react-native";
import { Menu } from 'react-native-paper';
import { useFilter } from '@/contexts/FilterContext';
import { useSort } from '@/contexts/SortContext';
import { useTasks } from '@/contexts/TaskContext';
import { LayoutAnimation } from 'react-native';


export default function RootLayout() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const { filter, setFilter } = useFilter();
  const { sortOrder, setSortOrder } = useSort();
  const { deleteCompletedTasks } = useTasks();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);


  return (
  <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#71c49c",
      headerStyle: {
        backgroundColor: "#71c49c",
        borderBottomWidth: 0,
      },
      headerTintColor: "#71c49c",
      tabBarStyle:{
        backgroundColor: "#F0EAD6",
        borderTopWidth: 0
      },
      headerTitleStyle: {
        fontSize: 18,
        color: "white"
      },
      headerTitleAlign: 'center'
    }}>
    <Tabs.Screen name="index" 
      options={{ 
          title: "Tasks" , 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ), 
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>

              <Pressable onPress={deleteCompletedTasks}>
                <Ionicons name="trash-bin-outline" size={24} color="white" />
              </Pressable>

              <Pressable
                onPress={() => {
                  LayoutAnimation.configureNext({
                    duration: 300,
                    update: {
                      type: LayoutAnimation.Types.easeInEaseOut,
                      property: LayoutAnimation.Properties.scaleXY, // 👈 smooth scaling
                    },
                  });
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
                style={{ marginHorizontal: 8 }}>
                <Ionicons
                  name={sortOrder === 'asc' ? 'arrow-down' : 'arrow-up'}
                  size={24}
                  color="white"
                />
              </Pressable>
              <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <Pressable onPress={openMenu} style={{ marginHorizontal: 8 }}>
                    <Ionicons name="filter" size={24} color="white" />
                  </Pressable>
                }
              >
                <Menu.Item
                  onPress={() => { setFilter('all'); closeMenu(); }}
                  title="All"
                  leadingIcon={filter === 'all' ? 'check' : undefined}
                />
                <Menu.Item
                  onPress={() => { setFilter('completed'); closeMenu(); }}
                  title="Completed"
                  leadingIcon={filter === 'completed' ? 'check' : undefined}
                />
                <Menu.Item
                  onPress={() => { setFilter('incomplete'); closeMenu(); }}
                  title="Incomplete"
                  leadingIcon={filter === 'incomplete' ? 'check' : undefined}
                />
              </Menu>

              <Pressable onPress={() => router.push("/task-adder")}>
                <Ionicons name="add" size={24} color="white" />
              </Pressable>
            </View>
          )
          
          }} />
    <Tabs.Screen name="statistics" 
      options={{ 
        title: "Statistics" ,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'analytics-sharp' : 'analytics-outline'} color={color} size={24} />
        ), 
        }} />
    
    
  </Tabs>
  )
}

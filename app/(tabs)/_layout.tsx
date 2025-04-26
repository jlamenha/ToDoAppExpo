import React from "react";
import { Tabs, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
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
            <Ionicons 
              name="add"
              size={24}
              color="white"
              style={{ marginRight: 15 }}
              onPress={() => alert("Button Presed!")} 
              />
          )
          
          }} />
    <Tabs.Screen name="statistics" 
      options={{ 
        title: "Statistics" ,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'analytics-sharp' : 'analytics-outline'} color={color} size={24} />
        ), 
        }} />
    <Tabs.Screen name="task-adder" 
      options={{ 
        title: "Add a Task!",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'add-sharp' : 'add-outline'} color={color} size={24} />
        ),
        }} />
    
    
  </Tabs>
  )
}

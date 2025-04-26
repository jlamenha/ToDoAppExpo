import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    
  <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: "#71c49c"
      },
      headerTintColor: "#71c49c"
    }}>
    <Stack.Screen name="(tabs)" options={{headerShown:false}} />
    <Stack.Screen name="+not-found" options={{title: "Page not found"}}/>
    
  </Stack>
  )
}

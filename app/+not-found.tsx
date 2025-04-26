import { Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

export default function NotFoundPage() {
  return (
    
    <LinearGradient
        colors={['#71c49c', '#F0EAD6']}
        style={styles.gradientContainer}
        >
    <Stack.Screen options={{
      title: "Oops! Not found",
      headerTitleStyle: {
        fontSize: 18,
        color: "white"
      },
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: '#71c49c',
        borderBottomWidth: 0,
      } as any,
    }} />
    <View style={styles.container}>
      <Text style={styles.text}>Sorry, we couldn't find this page.</Text>
      <Link href={"/"} style={styles.link}>Return to Home</Link>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer:{
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    fontSize: 25,
    textDecorationLine: 'underline',
    color: "white"
  },
  text: {
    fontSize: 25,
    color: "white"
  }

});
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";


export default function NotFoundPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sorry, we couldn't find this page.</Text>
      <Link href={"/"} style={styles.link}>Return to Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  text: {
    fontSize: 25,
  }

});
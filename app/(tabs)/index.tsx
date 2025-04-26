import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  return (
    <LinearGradient
    colors={['#71c49c', '#F0EAD6']}
    style={styles.gradientContainer}
    >
    <View
      style={styles.contentContainer}
    >
      <Text style={styles.text}>Edit app/(tabs)/index.tsx to edit this screen.</Text>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer:{
    flex: 1,
  },
  contentContainer:{ 
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  }
})

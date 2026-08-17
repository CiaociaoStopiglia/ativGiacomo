import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao app!</Text>
      <Text style={styles.subtitle}>
        Sua primeira interface em React Native
      </Text>
      <Text style={styles.tripletitle}>
        obrigado!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    marginTop: 8,
  },
  tripletitle: {
    fontSize: 14,
    color: "#fa0000",
    marginTop: 8,
  },
});
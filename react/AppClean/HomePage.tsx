import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const HomePage: React.FC = () => (
  <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app!</Text>
    <Button mode="contained" onPress={() => console.log("Pressed")}>
      Press Me
    </Button>
    <StatusBar style="auto" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;

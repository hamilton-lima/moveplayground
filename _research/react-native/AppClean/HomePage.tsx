import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Play: undefined;
};

const HomePage: React.FC = () => (
  <View style={styles.container}>
    <Text variant="headlineLarge">Move, Play, Control</Text>
    <Text>
      In Move Playground, your body is the controller. Your movements shape the
      game in real-time. Ready to jump in?
    </Text>
    <Button mode="contained" onPress={() => console.log("Pressed")}>
      PLAY
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

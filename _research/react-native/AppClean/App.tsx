import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from "react-native-paper";
import HomePage from "./HomePage";

export default function App() {
  return (
    <PaperProvider>
      <HomePage />
    </PaperProvider>
  );
}


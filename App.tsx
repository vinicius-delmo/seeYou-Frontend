import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import RethinkersList from './src/views/RethinkersList';

export default function App() {
  return (
    <View style={styles.container}>
      <RethinkersList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
  },
});

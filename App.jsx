import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppBar from './scr/components/AppBar';
import MemoList from './scr/components/MemoList';
import CircleButton from './scr/components/CircleButton';

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <MemoList />
      <CircleButton>+</CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});

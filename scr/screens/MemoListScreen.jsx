import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, getDocs, query, orderBy,
} from 'firebase/firestore';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(async () => {
    const { currentUser } = getAuth();
    const db = getFirestore();
    let unsubscribe = () => {};
    if (currentUser) {
      try {
        const q = query(collection(db, `users/${currentUser.uid}/memos`), orderBy('updated_at', 'desc'));
        const snapshot = await getDocs(q);
        unsubscribe = snapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
        });
      } catch (error) {
        console.log(error);
        Alert.alert('Error!', error);
      }
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MemoList />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});

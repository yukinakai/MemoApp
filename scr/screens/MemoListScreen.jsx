import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, query, orderBy, onSnapshot,
} from 'firebase/firestore';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);

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
        const q = query(collection(db, `users/${currentUser.uid}/memos`), orderBy('updatedAt', 'desc'));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const userMemos = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
            const data = doc.data();
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setMemos(userMemos);
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
      <MemoList memos={memos} />
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

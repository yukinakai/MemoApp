import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Alert, Text,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, query, orderBy, onSnapshot,
} from 'firebase/firestore';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { translateErrors } from '../utils';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    const { currentUser } = getAuth();
    let unsubscribe = () => {};
    if (currentUser) {
      setLoading(true);
      try {
        const db = getFirestore();
        const q = query(collection(db, `users/${currentUser.uid}/memos`), orderBy('updatedAt', 'desc'));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const userMemos = [];
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, doc.data());
            const data = doc.data();
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setMemos(userMemos);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      }
    }
    return unsubscribe;
  }, []);

  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isloading={isloading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
          <Button
            style={emptyStyles.button}
            label="作成する"
            onPress={() => { navigation.navigate('MemoCreate'); }}
          />
        </View>
      </View>
    );
  }

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

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
  },
});

import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { shape, string } from 'prop-types';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, doc, onSnapshot,
} from 'firebase/firestore';

import CircleButton from '../components/CircleButton';
import { dateToString, translateErrors } from '../utils';

export default function MemoDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  const [memo, setMemo] = useState(null);

  useEffect(async () => {
    const { currentUser } = getAuth();
    let unsubscribe = () => {};
    if (currentUser) {
      try {
        const db = getFirestore();
        unsubscribe = onSnapshot(doc(db, `users/${currentUser.uid}/memos`, id), (docSnap) => {
          const data = docSnap.data();
          setMemo({
            id: docSnap.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(),
          });
        });
      } catch (error) {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      }
    }
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
        <Text style={styles.memoDate}>{memo && dateToString(memo.updatedAt)}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>{memo && memo.bodyText}</Text>
      </ScrollView>
      <CircleButton
        style={{ top: 60, buttom: 'auto' }}
        name="pencil"
        onPress={() => { navigation.navigate('MemoEdit', { id: memo.id, bodyText: memo.bodyText }); }}
      />
    </View>
  );
}

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memoHeader: {
    backgroundColor: '#467fd3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

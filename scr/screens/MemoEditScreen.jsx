import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, KeyboardAvoidingView, Alert,
} from 'react-native';
import { shape, string } from 'prop-types';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, doc, setDoc,
} from 'firebase/firestore';

import CircleButton from '../components/CircleButton';

export default function MemoEditScreen(props) {
  const { navigation, route } = props;
  const { id, bodyText } = route.params;
  const [body, setBody] = useState(bodyText);

  function handlePress() {
    const { currentUser } = getAuth();
    if (currentUser) {
      const db = getFirestore();
      const docRef = doc(db, `users/${currentUser.uid}/memos`, id);
      setDoc(docRef, {
        bodyText: body,
        updatedAt: new Date(),
      }, { merge: true }) // 指定していない値を元のデータで保持する
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Error!', error);
        });
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={80}
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBody(text); }}
        />
      </View>
      <CircleButton
        name="check"
        // eslint-disable-next-line react/jsx-no-bind
        onPress={handlePress}
      />
    </KeyboardAvoidingView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});

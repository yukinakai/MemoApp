import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, KeyboardAvoidingView, Alert,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import CircleButton from '../components/CircleButton';
import { translateErrors } from '../utils';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState('');

  function handlePress() {
    const { currentUser } = getAuth();
    const db = getFirestore();
    addDoc(collection(db, `users/${currentUser.uid}/memos`), {
      bodyText, // bodyText: bodyTextは省略できる
      updatedAt: new Date(),
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={80}
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBodyText(text); }}
          autoFocus
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

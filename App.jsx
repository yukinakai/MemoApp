import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { initializeApp, getApps } from 'firebase/app';

import MemoListScreen from './scr/screens/MemoListScreen';
import MemoDetailScreen from './scr/screens/MemoDetailScreen';
import MemoEditScreen from './scr/screens/MemoEditScreen';
import MemoCreateScreen from './scr/screens/MemoCreateScreen';
import LoginScreen from './scr/screens/LoginScreen';
import SignUpScreen from './scr/screens/SignUpScreen';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: 'AIzaSyBhPKVYqWhYha6DAdvZmIQznJA5Qqs1N3A',
  authDomain: 'memoapp-f1b1d.firebaseapp.com',
  projectId: 'memoapp-f1b1d',
  storageBucket: 'memoapp-f1b1d.appspot.com',
  messagingSenderId: '411605435325',
  appId: '1:411605435325:web:3b7893d2943cc82f1588d4',
  measurementId: 'G-CZTV59NB97',
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerStyle: { backgroundColor: '#467fd3' },
          headerTitleStyle: { color: '#ffffff' },
          headerTitle: 'Memo App',
          headerTintColor: '#ffffff',
          headerBackTitle: 'Back',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="MemoList" component={MemoListScreen} />
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

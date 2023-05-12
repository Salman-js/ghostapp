import React from 'react';
import 'react-native-gesture-handler';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import DrawerStack from './drawerStack';
import SignInScreen from './loginScreen';
import SignUpScreen from './signUpScreen';
import IntroScreen from './intro';
import EditProfileScreen from './editProfileScreen';

const Stack = createStackNavigator();
export default function AuthStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name='Intro'
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Sign In'
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Sign Up'
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Main'
        component={DrawerStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Edit Profile'
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

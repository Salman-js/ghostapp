import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import React, { useEffect, useState } from 'react';
import { Divider, IconButton, Surface } from '@react-native-material/core';
import {
  GoogleSocialButton,
  FacebookSocialButton,
} from 'react-native-social-buttons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Button, Input } from '@rneui/themed';
import Feather from '@expo/vector-icons/Feather';
import { useToast } from 'react-native-toast-notifications';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/authSlice';
import { addDoc, collection } from 'firebase/firestore';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const toast = useToast(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });
  async function onSubmit() {
    setLoading(true);
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      );
      await updateProfile(authUser.user, {
        displayName: signupData.name,
      });
      await addDoc(collection(db, 'users'), {
        userId: authUser.user.uid,
      });
      dispatch(setUser(user.user));
      setLoading(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.show('There is already an account with that email', {
          icon: <Feather name='alert-triangle' size={20} color='white' />,
          placement: 'top',
          type: 'warning',
          duration: 4000,
          style: { marginTop: 50 },
          textStyle: { padding: 0 },
        });
      } else if (error.code === 'auth/weak-password') {
        toast.show('Password is too weak', {
          icon: <Feather name='alert-triangle' size={20} color='white' />,
          placement: 'top',
          type: 'warning',
          duration: 4000,
          style: { marginTop: 50 },
          textStyle: { padding: 0 },
        });
      } else {
        toast.show('Unknown error. please, try again', {
          icon: <Feather name='alert-circle' size={20} color='white' />,
          placement: 'top',
          type: 'danger',
          duration: 4000,
          style: { marginTop: 50 },
          textStyle: { padding: 0 },
        });
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log('Authenticated');
        navigation.navigate('Main');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View className='h-full bg-[#271b2d] pt-14'>
      <ScrollView
        className='w-full p-4 pt-0'
        contentContainerStyle={tw.style(' flex items-center')}
      >
        <View className='w-full flex justify-start pb-3'>
          <IconButton
            icon={(props) => (
              <Icon name='chevron-left' {...props} size={30} color='#ece9e9' />
            )}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Surface
          style={tw.style(
            'w-full rounded-3xl p-3 py-6 mb-3 flex items-center justify-center',
            {
              backgroundColor: '#32283c',
            }
          )}
        >
          <Text className='text-2xl font-semibold text-slate-200'>
            Create your account
          </Text>
          <View className='w-full flex flex-col mt-10'>
            <Input
              placeholder='Name'
              lightTheme={false}
              inputStyle={tw.style('text-gray-200')}
              inputContainerStyle={tw.style('p-1 pl-3 rounded-xl', {
                borderBottomWidth: 0,
                backgroundColor: '#271b2d',
              })}
              value={signupData.name}
              onChangeText={(e) =>
                setSignupData({
                  ...signupData,
                  name: e,
                })
              }
              errorStyle={tw.style('hidden')}
              containerStyle={tw.style('')}
            />
            <Input
              placeholder='Email'
              lightTheme={false}
              inputStyle={tw.style('text-gray-200')}
              inputContainerStyle={tw.style('p-1 pl-3 rounded-xl', {
                borderBottomWidth: 0,
                backgroundColor: '#271b2d',
              })}
              value={signupData.email}
              onChangeText={(e) =>
                setSignupData({
                  ...signupData,
                  email: e,
                })
              }
              errorStyle={tw.style('hidden')}
              containerStyle={tw.style('mt-3')}
            />
            <Input
              placeholder='Password'
              secureTextEntry
              lightTheme={false}
              inputStyle={tw.style('text-gray-200')}
              inputContainerStyle={tw.style('p-1 pl-3 rounded-xl', {
                borderBottomWidth: 0,
                backgroundColor: '#271b2d',
              })}
              value={signupData.password}
              onChangeText={(e) =>
                setSignupData({
                  ...signupData,
                  password: e,
                })
              }
              errorStyle={tw.style('hidden')}
              containerStyle={tw.style('mt-3')}
            />
            <Button
              title='Sign up'
              loading={loading}
              buttonStyle={tw.style('rounded-full py-3 overflow-hidden', {
                backgroundColor: '#271b2d',
              })}
              disabledStyle={tw.style('', {
                backgroundColor: '#271b2d',
              })}
              disabled={
                !signupData.name.trim().length ||
                !signupData.email.trim().length >= 5 ||
                !signupData.password.trim().length
              }
              titleStyle={tw.style('font-bold text-xl')}
              containerStyle={tw.style('mt-3 mx-3 overflow-hidden')}
              onPress={onSubmit}
            />
            {/* <Button
              title='Sign up'
              buttonStyle={tw.style('rounded-full py-3 overflow-hidden', {
                backgroundColor: '#271b2d',
              })}
              disabledStyle={tw.style('', {
                backgroundColor: '#271b2d',
              })}
              titleStyle={tw.style('font-bold text-xl')}
              containerStyle={tw.style('mt-3 mx-3 overflow-hidden')}
              onPress={() => navigation.navigate('Messages')}
            /> */}
          </View>
        </Surface>
        <View className='w-full flex flex-row items-center justify-center'>
          <Divider style={tw.style('w-1/3')} color='#6c7c9a85' />
          <Text className='px-4 text-lg font-bold text-slate-200'>Or</Text>
          <Divider style={tw.style('w-1/3')} color='#6c7c9a85' />
        </View>
        <View className='w-full my-3 p-6 rounded-3xl bg-[#32283c]'>
          {/* <FacebookAuth />
        <GoogleAuth /> */}
          <GoogleSocialButton
            onPress={() => console.log('')}
            buttonViewStyle={tw.style('w-full h-12 rounded-full border-0', {
              backgroundColor: '#271b2d',
            })}
            logoStyle={tw.style('my-auto')}
            buttonText='Continue with Google'
            textStyle={tw.style('text-lg font-bold text-slate-200')}
          />
          <FacebookSocialButton
            onPress={() => console.log('')}
            buttonViewStyle={tw.style('w-full h-12 rounded-full border-0', {
              backgroundColor: '#271b2d',
            })}
            logoStyle={tw.style('my-auto')}
            buttonText='Continue with Facebook'
            textStyle={tw.style('text-lg font-bold text-slate-200')}
          />
        </View>
        <View className='w-full my-3 p-6 rounded-3xl bg-[#32283c] flex justify-center items-center'>
          <Text className='text-lg text-slate-300'>Don't have an account?</Text>
          <Button
            title='Login'
            loading={false}
            buttonStyle={tw.style('rounded-full py-3 overflow-hidden', {
              backgroundColor: '#271b2d',
            })}
            titleStyle={tw.style('font-bold text-xl')}
            containerStyle={tw.style('w-full mt-3 mx-3 overflow-hidden')}
            onPress={() => navigation.navigate('Sign In')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

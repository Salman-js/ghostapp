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
import { useToast } from 'react-native-toast-notifications';
import Feather from '@expo/vector-icons/Feather';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const SignInScreen = ({ navigation }) => {
  const toast = useToast(null);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  function onLogin() {
    setLoading(true);
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((user) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          toast.show('Invalid email or password', {
            icon: <Feather name='alert-circle' size={20} color='white' />,
            placement: 'top',
            type: 'danger',
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
      });
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
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
          <Text className='text-2xl font-semibold text-slate-200'>Welcome</Text>
          <Text className='text-lg text-slate-300'>Login to your account</Text>
          <View className='w-full flex flex-col mt-10'>
            <Input
              placeholder='Email'
              lightTheme={false}
              inputStyle={tw.style('text-gray-200')}
              inputContainerStyle={tw.style('p-1 pl-3 rounded-xl', {
                borderBottomWidth: 0,
                backgroundColor: '#271b2d',
              })}
              // rightIcon={
              //   (errors.user || errors.password) && (
              //     <Icon name='alert-circle' size={24} color='red' />
              //   )
              // }
              value={loginData.email}
              onChangeText={(e) =>
                setLoginData({
                  ...loginData,
                  email: e,
                })
              }
              errorStyle={tw.style('hidden')}
              containerStyle={tw.style('')}
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
              value={loginData.password}
              onChangeText={(e) =>
                setLoginData({
                  ...loginData,
                  password: e,
                })
              }
              errorStyle={tw.style('hidden')}
              containerStyle={tw.style('mt-3')}
            />
            <Button
              title='Login'
              loading={loading}
              buttonStyle={tw.style('rounded-full py-3 overflow-hidden', {
                backgroundColor: '#271b2d',
              })}
              titleStyle={tw.style('font-bold text-xl')}
              containerStyle={tw.style('mt-3 mx-3 overflow-hidden')}
              disabledStyle={tw.style('', {
                backgroundColor: '#271b2d',
              })}
              disabled={
                !loginData.email.trim().length ||
                !loginData.password.trim().length
              }
              onPress={onLogin}
            />

            {/* <Button
              title='Login'
              buttonStyle={tw.style('rounded-full py-3 overflow-hidden', {
                backgroundColor: '#271b2d',
              })}
              disabledStyle={tw.style('', {
                backgroundColor: '#271b2d',
              })}
              titleStyle={tw.style('font-bold text-xl')}
              containerStyle={tw.style('mt-3 mx-3 overflow-hidden')}
              onPress={() => navigation.navigate('Main')}
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
            title='Sign up'
            loading={false}
            buttonStyle={tw.style('rounded-full py-3 overflow-hidden', {
              backgroundColor: '#271b2d',
            })}
            titleStyle={tw.style('font-bold text-xl')}
            containerStyle={tw.style('w-full mt-3 mx-3 overflow-hidden')}
            onPress={() => navigation.navigate('Sign Up')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

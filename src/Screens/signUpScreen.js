import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Avatar,
  Divider,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import {
  GoogleSocialButton,
  FacebookSocialButton,
} from 'react-native-social-buttons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import PostItem from '../Components/postItem';
import { Button, Input } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../api/auth';
import { emptyErrors } from '../../slices/errorSlice';
import { useToast } from 'react-native-toast-notifications';
import { checkHandle } from '../api/user';
import { useMutation } from '@tanstack/react-query';

const SignUpScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const toast = useToast(null);
  const errors = useSelector((state) => state.errors);
  const [handleSuccess, setHandleSuccess] = useState(false);
  const [handleError, setHandleError] = useState(null);
  const [signupData, setSignupData] = useState({
    name: '',
    handle: '',
    password: '',
  });
  const checkHandleMutation = useMutation({
    mutationFn: checkHandle,
    onError: (err) => {
      if (err.response) {
        setHandleError(err.response.data);
      }
    },
    onSuccess: () => {
      setHandleError(null);
      setHandleSuccess(true);
    },
  });
  function onSubmit() {
    dispatch(register(signupData));
  }
  const onCheckHandle = (e) => {
    setSignupData({
      ...signupData,
      handle: e,
    });
    if (signupData.handle.trim().length >= 5) {
      checkHandleMutation.mutate(e);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      if (errors.checkhandle) {
        toast.show('Username is taken. Try another', {
          icon: <Icon name='alert-circle' size={20} color='white' />,
          placement: 'top',
          type: 'danger',
          duration: 4000,
          style: { marginTop: 50 },
          textStyle: { padding: 0 },
        });
      } else if (errors.connection || errors.unknown) {
        toast.show('Connection problem. Please try again', {
          icon: <Icon name='alert-circle' size={20} color='white' />,
          placement: 'bottom',
          type: 'danger',
          duration: 4000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
      console.log('Errors: ', errors);
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
  }, [errors]);
  useEffect(() => {
    if (user) {
      navigation.navigate('Main');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  }, [user]);
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
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
              placeholder='Username'
              lightTheme={false}
              inputStyle={tw.style('text-gray-200')}
              inputContainerStyle={tw.style('p-1 pl-3 rounded-xl', {
                borderBottomWidth: 0,
                backgroundColor: '#271b2d',
              })}
              rightIcon={
                checkHandleMutation.isLoading ? (
                  <ActivityIndicator />
                ) : handleError ||
                  errors.checkhandle ||
                  signupData.handle.trim().length < 5 ? (
                  <Icon name='alert-circle' size={24} color='#ea900a' />
                ) : (
                  <Icon name='check' size={24} color='#5982db' />
                )
              }
              value={signupData.handle}
              onChangeText={(e) => onCheckHandle(e)}
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
                !signupData.handle.trim().length >= 5 ||
                handleError ||
                !handleSuccess ||
                !signupData.password.trim().length
              }
              titleStyle={tw.style('font-bold text-xl')}
              containerStyle={tw.style('mt-3 mx-3 overflow-hidden')}
              onPress={onSubmit}
            />
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

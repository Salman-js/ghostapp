import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { Avatar, IconButton, Pressable } from '@react-native-material/core';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { Button, ListItem } from '@rneui/themed';
import ChatItem from '../Components/chatItem';
import { FAB, Surface } from 'react-native-paper';
import { useRefreshToken } from '../Components/Auth Components/useRefreshToken';
import { auth } from '../../firebase';

const HomeScreen = ({ navigation }) => {
  const { isRefreshing, refresh, refreshToken } = useRefreshToken();
  const scrollView = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const toast = useToast(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate('Intro');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Intro' }],
        });
      }
    });
  }, []);
  useEffect(() => {
    refresh();
  }, []);
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style('w-full flex flex-row justify-between p-4 pt-14', {
          backgroundColor: '#32283c',
        })}
        elevation={2}
      >
        <IconButton
          icon={(props) => <Feather name='menu' {...props} color='#ffffff' />}
          onPress={() => navigation.openDrawer()}
        />
        <Pressable
          onPress={() => {
            scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
          }}
          style={tw.style('my-auto')}
        >
          <Image
            source={require('../../assets/logo.png')}
            className='w-[40px] h-[40px]'
          />
        </Pressable>
        <IconButton
          icon={(props) => (
            <AntDesign name='search1' {...props} color='#ffffff' />
          )}
        />
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16 pt-0')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        bounces
        alwaysBounceVertical
      >
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </ScrollView>
      <View className='absolute bottom-3 right-3 p-4 flex items-center justify-center'>
        <FAB
          icon='feather'
          style={tw.style('text-white rounded-full', {
            backgroundColor: '#4b3c59',
          })}
          color='white'
          onPress={() => navigation.navigate('Contacts Slide')}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

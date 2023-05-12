import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import { FAB } from 'react-native-paper';
import Material from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

const HomeScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const toast = useToast(null);
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  // useEffect(() => {
  //   if (!user) {
  //     navigation.navigate('Intro');
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'Intro' }],
  //     });
  //   }
  // }, [user]);
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
        )}
        elevation={3}
      >
        <View className='overflow-hidden rounded-full'>
          <Pressable onPress={() => navigation.openDrawer()}>
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={38}
              style={tw.style('my-auto')}
            />
          </Pressable>
        </View>
        <Pressable
          onPress={() =>
            scrollView.current.scrollTo({ x: 5, y: 5, animated: true })
          }
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
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        bounces
        alwaysBounceVertical
      ></ScrollView>
    </View>
  );
};

export default HomeScreen;

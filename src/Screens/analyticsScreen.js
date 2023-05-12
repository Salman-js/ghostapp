import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import PostItem from '../Components/postItem';
import { useSelector } from 'react-redux';

const AnalyticsScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
        )}
        elevation={1}
      >
        <View className='overflow-hidden rounded-full'>
          <Pressable onPress={() => navigation.openDrawer()}>
            {user?.avatar ? (
              <Avatar
                image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
                size={38}
                style={tw.style('my-auto')}
              />
            ) : (
              <Avatar
                label={user?.name}
                size={38}
                style={tw.style('my-auto')}
              />
            )}
          </Pressable>
        </View>
        <Text className='text-2xl font-bold text-slate-200 my-auto ml-4'>
          Analytics
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
      ></ScrollView>
    </View>
  );
};

export default AnalyticsScreen;

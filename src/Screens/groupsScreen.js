import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import PostItem from '../Components/postItem';
import GroupItem from '../Components/groupItem';

const GroupsScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  return (
    <View className='h-full flex items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
        )}
        elevation={1}
      >
        <Text className='text-3xl font-bold text-slate-200 my-auto'>
          Groups
        </Text>
      </Surface>
      <View className='w-full'>
        <Text
          className='text-2xl font-bold text-gray-200 break-words p-4 pb-5'
          numberOfLines={2}
        >
          Groups you've joined
        </Text>
        <ScrollView
          className='w-full'
          showsHorizontalScrollIndicator={false}
          horizontal
          alwaysBounceHorizontal
          ref={scrollView}
        >
          <GroupItem />
          <GroupItem />
        </ScrollView>
      </View>
      <View className='w-full'>
        <Text
          className='text-2xl font-bold text-gray-200 break-words p-4 mt-2 pb-5'
          numberOfLines={2}
        >
          Suggested
        </Text>
        <ScrollView
          className='w-full'
          showsHorizontalScrollIndicator={false}
          horizontal
          alwaysBounceHorizontal
          ref={scrollView}
        >
          <GroupItem type='suggested' />
          <GroupItem type='suggested' />
        </ScrollView>
      </View>
    </View>
  );
};

export default GroupsScreen;

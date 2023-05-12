import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import Feather from '@expo/vector-icons/Feather';
import Material from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { RefreshControl } from 'react-native';

const BookmarksScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const toast = useToast(null);
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
        <Text className='text-2xl font-bold text-slate-200 my-auto'>
          Bookmarks
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isInitialLoading}
            onRefresh={() => {
              refetch();
            }}
          />
        }
      ></ScrollView>
    </View>
  );
};

export default BookmarksScreen;

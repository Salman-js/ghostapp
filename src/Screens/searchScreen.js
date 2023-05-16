import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { Avatar, IconButton, Pressable } from '@react-native-material/core';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { Button, ListItem, SearchBar } from '@rneui/themed';
import ChatItem from '../Components/chatItem';
import { FAB, Surface } from 'react-native-paper';
import { useRefreshToken } from '../Components/Auth Components/useRefreshToken';
import { auth } from '../../firebase';

const SearchScreen = ({ navigation }) => {
  const { isRefreshing, refresh, refreshToken } = useRefreshToken();
  const scrollView = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const [searchString, setSearchString] = useState('');
  const toast = useToast(null);
  useEffect(() => {
    console.log(user);
    if (!user) {
      navigation.navigate('Intro');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Intro' }],
      });
    }
  }, [user]);
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
          icon={(props) => (
            <Feather name='arrow-left' {...props} color='#ffffff' />
          )}
          onPress={() => navigation.goBack()}
        />
        <SearchBar
          placeholder='Search'
          platform='ios'
          containerStyle={tw.style('w-11/12 p-0 bg-transparent')}
          showCancel={false}
          lightTheme={false}
          autoFocus
          inputContainerStyle={tw.style('p-0 bg-transparent')}
          inputStyle={tw.style('text-gray-300 h-12')}
          cancelButtonProps={{ style: tw.style('text-gray-300 hidden') }}
          value={searchString}
          onChangeText={(e) => setSearchString(e)}
        />
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16 pt-0')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        bounces
        alwaysBounceVertical
      ></ScrollView>
    </View>
  );
};

export default SearchScreen;

import React, { useState } from 'react';
import tw from 'twrnc';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Surface, Pressable, Avatar } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
import { getProfile, logout } from '../../api/auth';
import { useQuery } from '@tanstack/react-query';

export default function CustomDrawer(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className='flex-1 bg-[#271b2d] pt-14'>
      <View className='w-full px-6'>
        <Pressable
          style={tw.style('w-full border-b border-gray-400 pb-4')}
          onPress={() => navigation.navigate('Profile')}
        >
          <Avatar
            image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
            size={38}
            style={tw.style('my-auto')}
          />
          <View className='w-full flex justify-start pt-3'>
            <Text className='font-bold text-lg text-white'>Salman M.</Text>
            <Text className='text-sm text-gray-400 text-left'>@theartist</Text>
          </View>
        </Pressable>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={tw.style('-mt-4', {
          backgroundColor: '#271b2d',
        })}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className='w-full'>
        <View className='flex-col items-center py-3 border-t border-gray-400 bg-[#271b2d] mx-3'>
          <Pressable
            style={tw`w-full flex-row p-4`}
            onPress={() => navigation.navigate('Landing')}
          >
            <AntDesign
              name='questioncircleo'
              size={28}
              style={tw``}
              {...props}
              color='#e4dddd'
            />
            <Text
              style={tw`text-xl text-gray-200 w-full ml-4 my-auto`}
              variant='body1'
            >
              FAQ
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

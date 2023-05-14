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
import { auth } from '../../../firebase';

export default function CustomDrawer(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className='flex-1 bg-[#271b2d]'>
      <View className='w-full px-6 bg-[#2d1f34] pt-14'>
        <Pressable
          style={tw.style('w-full pb-4')}
          onPress={() => navigation.navigate('Profile')}
        >
          <Avatar
            label={auth.currentUser?.displayName}
            size={38}
            style={tw.style('my-auto')}
          />
          <View className='w-full flex justify-start pt-3'>
            <Text className='font-bold text-lg text-white'>
              {auth.currentUser?.displayName}
            </Text>
            <Text className='text-sm text-gray-400 text-left'>
              {auth.currentUser?.email}
            </Text>
          </View>
        </Pressable>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={tw.style('-mt-10', {
          backgroundColor: '#271b2d',
        })}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}

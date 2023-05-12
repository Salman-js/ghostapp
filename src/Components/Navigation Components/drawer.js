import React, { useState } from 'react';
import tw from 'twrnc';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Surface, Pressable, Avatar } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  });
  return (
    <View className='flex-1 bg-[#271b2d] pt-14'>
      <View className='w-full px-6'>
        <Pressable
          style={tw.style('w-full border-b border-gray-400 pb-4')}
          onPress={() => navigation.navigate('Profile')}
        >
          {data?.avatar ? (
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={38}
              style={tw.style('my-auto')}
            />
          ) : (
            <Avatar label={user?.name} size={38} style={tw.style('my-auto')} />
          )}
          <View className='w-full flex justify-start pt-3'>
            <Text className='font-bold text-lg text-white'>{user?.name}</Text>
            <Text className='text-sm text-gray-400 text-left'>
              @{user?.handle}
            </Text>
            <View className='mt-4 flex flex-row space-x-3'>
              <Text className='text-sm text-gray-200 text-left'>
                {data?.followers} <Text className='font-bold'>Followers</Text>
              </Text>
              <Text className='text-sm text-gray-200 text-left'>
                {data?.following} <Text className='font-bold'>Following</Text>
              </Text>
            </View>
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
      <View className='w-full px-6'>
        <View className='flex-col items-center py-3 border-t border-gray-400 bg-[#271b2d]'>
          <Pressable
            style={tw`w-full flex-row p-4 pl-0`}
            onPress={() => navigation.navigate('Landing')}
          >
            <Icon
              name='settings-outline'
              size={28}
              style={tw``}
              {...props}
              color='#e4dddd'
            />
            <Text style={tw`text-gray-200 w-full ml-3 mt-1`} variant='body1'>
              Settings and privacy
            </Text>
          </Pressable>
          <Pressable
            style={tw`w-full flex-row p-4 pl-0`}
            onPress={() => setModalVisible(true)}
          >
            <Icon name='exit-outline' size={28} style={tw``} color='#f25959' />
            <Text style={tw`text-red-500 w-full ml-3 mt-1`} variant='body1'>
              Logout
            </Text>
          </Pressable>
        </View>

        <View className='flex-row justify-end border-t border-gray-500 bg-[#271b2d]'>
          <Pressable
            style={tw`px-4 py-2`}
            onPress={() => navigation.navigate('Main')}
          >
            <Icon
              name='share-social-sharp'
              size={24}
              style={tw``}
              {...props}
              color='#edcce0c6'
            />
          </Pressable>
        </View>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn='zoomIn'
        animationOut='zoomOut'
        animationInTiming={300}
        animationOutTiming={300}
        backdropOpacity={0.2}
      >
        <View className='w-4/5 rounded-xl m-auto p-6 flex bg-[#32283c]'>
          <Text className='text-xl font-bold text-slate-200'>Logout?</Text>
          <Text className='text-lg mt-3 text-slate-200'>
            Are you sure you want to logout?
          </Text>
          <View className='w-full flex-row justify-end items-end space-x-2 mt-4'>
            <Button
              mode='text'
              onPress={() => setModalVisible(false)}
              labelStyle={tw.style('text-slate-200')}
            >
              No
            </Button>
            <Button
              mode='text'
              onPress={() => {
                setModalVisible(false);
                dispatch(logout());
              }}
              labelStyle={tw.style('text-slate-200')}
            >
              Yes
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

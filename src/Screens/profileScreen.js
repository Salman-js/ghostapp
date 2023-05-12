import { View, Text, ScrollView, RefreshControl } from 'react-native';
import tw from 'twrnc';
import React, { useEffect, useRef } from 'react';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Material from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import PostItem from '../Components/postItem';
import { useToast } from 'react-native-toast-notifications';
import { getProfile } from '../api/auth';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getMyBookmarks, getMyLikes, getMyTawts } from '../api/tawts';
import { Button } from '@rneui/themed';
import ProfilePostItem from '../Components/Post Items/ProfilePostItem';

const ProfileScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const toast = useToast(null);
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, refetch, isInitialLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
    onError: (error) => {
      console.log('Request: ', error.request);
      console.log('Response: ', error.response);
      if (error.response) {
        if (error.response?.data.token) {
          toast.show('Session expired, Login required', {
            icon: <Feather name='alert-circle' size={20} color='white' />,
            placement: 'bottom',
            type: 'danger',
            duration: 4000,
            style: { marginBottom: 50 },
            textStyle: { padding: 0 },
          });
        }
        if (error.response.data.unknown) {
          toast.show('Server error. Please, try again', {
            icon: <Feather name='alert-circle' size={20} color='white' />,
            placement: 'bottom',
            type: 'danger',
            duration: 4000,
            style: { marginBottom: 50 },
            textStyle: { padding: 0 },
          });
        }
      } else if (error.request) {
        toast.show('Error connecting to the server', {
          icon: <Feather name='alert-circle' size={20} color='white' />,
          placement: 'bottom',
          type: 'danger',
          duration: 4000,
          style: { marginBottom: 50 },
          textStyle: { padding: 0 },
        });
      } else {
        toast.show('Unknown Error. Please, try again', {
          icon: <Feather name='alert-circle' size={20} color='white' />,
          placement: 'bottom',
          type: 'danger',
          duration: 4000,
          style: { marginBottom: 50 },
          textStyle: { padding: 0 },
        });
      }
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const tawtsQuery = useQuery({
    queryKey: ['tawts', 'my'],
    queryFn: () => getMyTawts(),
    onError: (error) => {
      console.log('Request: ', error.request);
      console.log('Response: ', error.response);
      if (error.response) {
        if (error.response?.data.token) {
          toast.show('Session expired, Login required', {
            icon: <Feather name='alert-circle' size={20} color='white' />,
            placement: 'bottom',
            type: 'danger',
            duration: 4000,
            style: { marginBottom: 50 },
            textStyle: { padding: 0 },
          });
        }
        if (error.response.data.unknown) {
          toast.show('Server error. Please, try again', {
            icon: <Feather name='alert-circle' size={20} color='white' />,
            placement: 'bottom',
            type: 'danger',
            duration: 4000,
            style: { marginBottom: 50 },
            textStyle: { padding: 0 },
          });
        }
      } else if (error.request) {
        toast.show('Error connecting to the server', {
          icon: <Feather name='alert-circle' size={20} color='white' />,
          placement: 'bottom',
          type: 'danger',
          duration: 4000,
          style: { marginBottom: 50 },
          textStyle: { padding: 0 },
        });
      } else {
        toast.show('Unknown Error. Please, try again', {
          icon: <Feather name='alert-circle' size={20} color='white' />,
          placement: 'bottom',
          type: 'danger',
          duration: 4000,
          style: { marginBottom: 50 },
          textStyle: { padding: 0 },
        });
      }
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const myLikesQuery = useQuery({
    queryKey: ['likes'],
    queryFn: () => getMyLikes(),
  });
  const myBookmarksQuery = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => getMyBookmarks(),
  });
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
        <Text className='text-2xl font-bold text-slate-200 my-auto'>
          Profile
        </Text>
        <IconButton
          icon={(props) => (
            <Icon name='dots-horizontal' {...props} color='#ece9e9' />
          )}
          style={tw.style('')}
        />
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pt-0 pb-16')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isInitialLoading}
            onRefresh={() => {
              refetch();
              tawtsQuery.refetch();
            }}
          />
        }
      >
        <Surface
          style={tw.style('rounded-3xl p-3 mb-2', {
            backgroundColor: '#32283c',
          })}
          elevation={3}
        >
          <View className='w-full flex flex-row justify-start space-x-4'>
            {user?.avatar ? (
              <Avatar
                image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
                size={60}
                style={tw.style('my-auto')}
              />
            ) : (
              <Avatar
                label={user?.name}
                size={60}
                style={tw.style('my-auto')}
              />
            )}
            <View className='flex flex-row space-x-2'>
              <View className='rounded-xl bg-slate-600 overflow-hidden flex justify-center items-center py-4 px-6'>
                <Text className='font-bold text-sm text-white'>
                  {tawtsQuery.data?.length}
                </Text>
                <Text className='font-light text-xs text-gray-300'>Tawts</Text>
              </View>
              <View className='rounded-xl bg-slate-600 overflow-hidden'>
                <Pressable
                  style={tw.style('flex justify-center items-center py-4 px-6')}
                  onPress={() =>
                    navigation.navigate('Users', {
                      type: 'followers',
                      item: { id: user.id },
                    })
                  }
                >
                  <Text className='font-bold text-sm text-white'>
                    {data.followers}
                  </Text>
                  <Text className='font-light text-xs text-gray-300'>
                    Followers
                  </Text>
                </Pressable>
              </View>
              <View className='rounded-xl bg-slate-600 overflow-hidden'>
                <Pressable
                  style={tw.style('flex justify-center items-center py-4 px-6')}
                  onPress={() =>
                    navigation.navigate('Users', {
                      type: 'following',
                      item: { id: user.id },
                    })
                  }
                >
                  <Text className='font-bold text-sm text-white'>
                    {data.following}
                  </Text>
                  <Text className='font-light text-xs text-gray-300'>
                    Following
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className='w-full flex justify-start pt-3'>
            <View className='w-full flex flex-row justify-between pr-2'>
              <View className='w-3/4'>
                <Text className='font-bold text-lg text-white'>
                  {user?.name}
                </Text>
                <Text className='text-sm text-gray-400 text-left'>
                  @{user?.handle}
                </Text>
              </View>
              <Button
                title='Edit profile'
                buttonStyle={tw.style(
                  'rounded-full border border-slate-200 py-1 bg-transparent'
                )}
                onPress={() =>
                  navigation.navigate('Edit Profile', {
                    profile: data,
                  })
                }
              />
            </View>
            {data.bio && (
              <Text className='text-sm text-gray-300 break-words text-left mt-3'>
                {data.bio}
              </Text>
            )}
            <View className='w-full flex flex-row justify-start space-x-10 mt-3'>
              {data.location && (
                <View className='flex flex-row space-x-1'>
                  <Ionicons
                    name='location-outline'
                    color='#6d829f'
                    size={15}
                    style={tw.style('my-auto')}
                  />
                  <Text className='text-sm text-gray-300 break-words text-left'>
                    {data.location}
                  </Text>
                </View>
              )}
              {data.website && (
                <View className='flex flex-row space-x-1'>
                  <AntDesign
                    name='link'
                    color='#6d829f'
                    size={15}
                    style={tw.style('my-auto')}
                  />
                  <Text className='text-sm text-blue-300 break-words text-left'>
                    {data.website}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Surface>
        {tawtsQuery.data?.length ? (
          tawtsQuery.data.map((tawt) => (
            <ProfilePostItem key={tawt.id} item={tawt} />
          ))
        ) : (
          <View className='m-auto flex items-center justify-center mt-12'>
            <Material name='bubble-chart' color='#ece9e9' size={80} />
            <Text className='text-xl text-slate-200 mt-2 text-center'>
              No tawts
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

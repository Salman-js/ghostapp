import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import PostItem from '../Components/postItem';
import { FAB } from 'react-native-paper';
import Material from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getMyBookmarks, getMyLikes, getTawts } from '../api/tawts';
import { RefreshControl } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { getMyFollowers, getMyFollowings } from '../api/user';

const HomeScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const toast = useToast(null);
  const myLikesQuery = useQuery({
    queryKey: ['likes'],
    queryFn: () => getMyLikes(),
  });
  const myBookmarksQuery = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => getMyBookmarks(),
  });
  const myFollowersQuery = useQuery({
    queryKey: ['followers'],
    queryFn: () => getMyFollowers(),
  });
  const myFollowingsQuery = useQuery({
    queryKey: ['followings'],
    queryFn: () => getMyFollowings(),
  });
  const tawtsQuery = useQuery({
    queryKey: ['tawts'],
    queryFn: () => getTawts(),
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
  });
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  useEffect(() => {
    if (!user) {
      navigation.navigate('Intro');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Intro' }],
      });
    }
  }, [user]);
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
        <Pressable
          onPress={() =>
            scrollView.current.scrollTo({ x: 5, y: 5, animated: true })
          }
          style={tw.style('my-auto')}
        >
          <Image
            source={require('../../assets/logo.png')}
            className='w-8 h-8'
          />
        </Pressable>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        bounces
        alwaysBounceVertical
        refreshControl={
          <RefreshControl
            refreshing={tawtsQuery.isInitialLoading}
            onRefresh={() => {
              tawtsQuery.refetch();
            }}
          />
        }
      >
        {tawtsQuery.data?.length ? (
          tawtsQuery.data.map((tawt) => <PostItem key={tawt.id} item={tawt} />)
        ) : (
          <View className='m-auto flex items-center justify-center mt-12'>
            <Material name='bubble-chart' color='#ece9e9' size={80} />
            <Text className='text-xl text-slate-200 mt-2 text-center'>
              No tawts
            </Text>
          </View>
        )}
      </ScrollView>
      <View className='absolute bottom-16 right-3 p-4 flex items-center justify-center'>
        <FAB
          icon='plus'
          style={tw.style('text-white rounded-full', {
            backgroundColor: '#4b3c59',
          })}
          onPress={() => navigation.navigate('New Post')}
          color='white'
        />
      </View>
    </View>
  );
};

export default HomeScreen;

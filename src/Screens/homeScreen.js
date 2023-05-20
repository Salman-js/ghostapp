import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { Avatar, IconButton, Pressable } from '@react-native-material/core';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import ChatItem from '../Components/chatItem';
import { FAB, Surface } from 'react-native-paper';
import { useRefreshToken } from '../Components/Auth Components/useRefreshToken';
import { auth, db } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { addDoc, collection, onSnapshot, where } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const { isRefreshing, refresh, refreshToken } = useRefreshToken();
  const scrollView = useRef(null);
  const route = useRoute();
  const name = route.params?.name;
  const { user } = useSelector((state) => state.auth);
  const toast = useToast(null);
  const [chats, setChats] = useState([]);
  const chatsCollection = collection(db, 'chats');
  useEffect(() => {
    if (!user) {
      navigation.navigate('Intro');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Intro' }],
      });
    }
  }, [user]);
  useEffect(() => {
    if (name) {
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          addDoc(collection(db, 'users'), {
            id: auth.currentUser.uid,
            name: name,
            email: auth.currentUser.email,
          });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, []);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      chatsCollection,
      where('participants', 'array-contains', user?.id),
      (snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );
    return unsubscribe;
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
          icon={(props) => <Feather name='menu' {...props} color='#ffffff' />}
          onPress={() => navigation.openDrawer()}
        />
        <Pressable
          onPress={() => {
            scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
          }}
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
          onPress={() => navigation.navigate('Search')}
        />
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16 pt-0')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        bounces
        alwaysBounceVertical
      >
        {chats.length ? (
          <>
            {chats.map((chat) => (
              <ChatItem item={chat} key={chat.id} />
            ))}
          </>
        ) : null}
      </ScrollView>
      <View className='absolute bottom-3 right-3 p-4 flex items-center justify-center'>
        <FAB
          icon='feather'
          style={tw.style('text-white rounded-full', {
            backgroundColor: '#4b3c59',
          })}
          color='white'
          onPress={() => navigation.navigate('Contacts Slide')}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

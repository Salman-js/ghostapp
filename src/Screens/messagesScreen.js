import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import tw from 'twrnc';
import { View } from 'react-native';
import { Avatar, IconButton, Surface } from '@react-native-material/core';
import { Input } from '@rneui/themed';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { newChat } from '../api/chats';
import { auth } from '../../firebase';

function MessagesScreen() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const sendMessageMutation = useMutation({
    mutationFn: newChat,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    sendMessageMutation.mutate({
      participants: [
        {
          userId: auth.currentUser?.uid,
          name: auth.currentUser?.displayName,
        },
        {
          userId: 3445677878,
          name: 'Salman',
        },
      ],
      messages,
    });
  }, []);

  return (
    <View className='h-full bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 pl-2 bg-transparent'
        )}
        elevation={3}
      >
        <View className='flex flex-row space-x-2 my-auto'>
          <IconButton
            icon={(props) => (
              <Feather name='arrow-left' {...props} color='#ffffff' />
            )}
            onPress={() => navigation.goBack()}
          />
          <Avatar
            image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
            size={43}
            style={tw.style('my-auto')}
          />
          <View className='my-auto'>
            <Text className='text-lg font-bold text-white'>Salman M.</Text>
            <Text className='text-xs text-gray-400'>Online</Text>
          </View>
        </View>
        <IconButton
          icon={(props) => (
            <Feather name='more-horizontal' {...props} color='#ffffff' />
          )}
        />
      </Surface>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        showUserAvatar={false}
        messagesContainerStyle={tw.style('w-full py-3', {
          backgroundColor: '#271b2d',
        })}
        scrollToBottom
        scrollToBottomComponent={() => (
          <AntDesign name='down' color='#181717' />
        )}
        isLoadingEarlier
        textInputStyle={tw.style(
          'border border-slate-300 rounded-full my-2 px-4'
        )}
      />
    </View>
  );
}

export default MessagesScreen;

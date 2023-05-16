import React, { useState, useCallback, useEffect } from 'react';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Message,
  MessageText,
  Send,
  Time,
} from 'react-native-gifted-chat';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import tw from 'twrnc';
import { View } from 'react-native';
import { Avatar, IconButton, Surface } from '@react-native-material/core';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { newChat } from '../api/chats';
import { auth } from '../../firebase';

function MessagesScreen() {
  const initMessages = [
    {
      body: 'Hi',
      sender: auth.currentUser?.uid,
      createdAt: new Date(),
    },
    {
      body: 'Selam',
      sender: 34534535646,
      createdAt: new Date(),
    },
  ];
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
    setMessages(
      initMessages.map((msg) => {
        return {
          text: msg.body,
          createdAt: msg.createdAt,
          user: {
            _id: msg.sender === auth.currentUser?.uid ? 1 : 2,
          },
        };
      })
    );
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // sendMessageMutation.mutate({
    //   participants: [
    //     {
    //       userId: auth.currentUser?.uid,
    //       name: auth.currentUser?.displayName,
    //     },
    //     {
    //       userId: 3445677878,
    //       name: 'Salman',
    //     },
    //   ],
    //   messages: {
    //     body: messages[0].createdAt,
    //     sender: auth.currentUser?.uid,
    //     createdAt: messages[0].createdAt,
    //   },
    // });
  }, []);

  return (
    <View className='h-full bg-[#271b2d] w-full'>
      <Surface
        style={tw.style('w-full flex flex-row justify-between p-4 pt-14 pl-2', {
          backgroundColor: '#32283c',
        })}
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
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: tw.style('bg-slate-700'),
            }}
            textStyle={{
              left: tw.style('text-white'),
            }}
            tickStyle={{
              left: tw.style('text-white'),
            }}
            renderTime={(props) => (
              <Time
                {...props}
                timeTextStyle={{
                  left: tw.style('text-white'),
                }}
              />
            )}
          />
        )}
        renderAvatar={null}
        renderSend={(props) => (
          <Send
            {...props}
            containerStyle={tw.style('mr-3 bg-blue-500 rounded-2xl', {
              marginBottom: 6,
            })}
            textStyle={tw.style('text-gray-800', {
              color: '#32283c',
            })}
          />
        )}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={tw.style('border-0', {
              backgroundColor: '#32283c',
              borderTopWidth: 0,
            })}
          />
        )}
        scrollToBottom
        scrollToBottomComponent={() => (
          <AntDesign name='down' color='#181717' />
        )}
        textInputStyle={tw.style(
          'my-2 px-5 border border-gray-600 rounded-2xl mr-3 text-slate-200'
        )}
      />
    </View>
  );
}

export default MessagesScreen;

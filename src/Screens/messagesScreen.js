import React, { useState, useCallback, useEffect } from 'react';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Time,
} from 'react-native-gifted-chat';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import tw from 'twrnc';
import { View } from 'react-native';
import { Avatar, IconButton, Surface } from '@react-native-material/core';
import { Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { newChat, newMessage } from '../api/chats';
import { useSelector } from 'react-redux';

function MessagesScreen() {
  const route = useRoute();
  const { item } = route.params;
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const newChatMutation = useMutation({
    mutationFn: newChat,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const newMessageMutation = useMutation({
    mutationFn: newMessage,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    setMessages(
      item.data.messages.map((msg, index) => {
        return {
          _id: new Date().getTime() + index,
          text: msg.body,
          createdAt: new Date(msg.createdAt),
          user: {
            _id: msg.sender === user?.uid ? 1 : 2,
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
    if (messages.length > 0) {
      newMessageMutation.mutate({
        body: messages[0].text,
        sender: user?.uid,
        createdAt: new Date().getTime(),
      });
    } else {
      newChatMutation.mutate({
        participants: [
          {
            userId: user?.uid,
            name: user?.displayName,
          },
          {
            userId: 3445677878,
            name: 'Salman',
          },
        ],
        messages: [
          {
            body: messages[0].text,
            sender: user?.uid,
            createdAt: new Date().getTime(),
          },
        ],
      });
    }
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
            label={
              item.data.participants.filter(
                (participant) => participant.userId !== user?.uid
              )[0].name
            }
            size={43}
            style={tw.style('my-auto')}
          />
          <View className='my-auto'>
            <Text className='text-lg font-bold text-white'>
              {
                item.data.participants.filter(
                  (participant) => participant.userId !== user?.uid
                )[0].name
              }
            </Text>
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
        placeholder='Message'
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
        renderSend={(props) => {
          const { text, onSend } = props;
          return (
            <>
              {text.trim() && onSend && (
                <IconButton
                  {...props}
                  icon={(props) => (
                    <Ionicons
                      name='paper-plane'
                      {...props}
                      color='#3a81f6'
                      style={tw.style('', {
                        transform: [{ rotate: '45deg' }],
                      })}
                      size={30}
                      onPress={() => {
                        onSend(
                          {
                            _id: new Date().getTime(),
                            text: text,
                            createdAt: new Date().getTime(),
                            user: { _id: 1 },
                          },
                          true
                        );
                      }}
                    />
                  )}
                  style={tw.style('mr-3')}
                  disabled={!props.text.trim().length}
                />
              )}
            </>
          );
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={tw.style('border-0', {
              backgroundColor: '#32283c',
              borderTopWidth: 0,
            })}
          />
        )}
        alwaysShowSend={false}
        scrollToBottom
        scrollToBottomComponent={() => (
          <AntDesign name='down' color='#181717' />
        )}
        textInputStyle={tw.style('my-2 px-5 rounded-2xl mr-3 text-slate-200')}
      />
    </View>
  );
}

export default MessagesScreen;

import { View, Text } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, ListItem } from '@rneui/themed';
import { Avatar } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';

const ChatItem = () => {
  const navigation = useNavigation();
  const [direction, setDirection] = useState('');
  return (
    <ListItem.Swipeable
      style={tw.style('bg-transparent pt-0')}
      containerStyle={tw.style('px-3 pb-0', {
        backgroundColor: '#271b2d',
      })}
      leftStyle={tw.style('')}
      rightStyle={tw.style('')}
      leftContent={(reset) => (
        <>
          {direction === 'left' && (
            <Button
              title='Info'
              icon={{ name: 'info', color: 'white' }}
              buttonStyle={tw.style('min-h-full')}
            />
          )}
        </>
      )}
      rightContent={(reset) => (
        <>
          {direction === 'right' && (
            <Button
              title='Delete'
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={tw.style('min-h-full bg-red-500')}
            />
          )}
        </>
      )}
      onPress={() => navigation.navigate('Messages')}
      onSwipeBegin={(direction) => setDirection(direction)}
    >
      <Avatar
        image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
        size={38}
        style={tw.style('my-auto -mt-0')}
      />
      <ListItem.Content style={tw.style('border-b-2 border-slate-900 pb-3')}>
        <View className='w-full flex flex-row justify-between pr-6'>
          <ListItem.Title style={tw.style('text-slate-200 font-bold')}>
            Hello Swiper
          </ListItem.Title>
          <View className='flex flex-row space-x-1'>
            <Text className='text-xs text-gray-500 my-auto'>09:32 AM</Text>
            <Ionicons name='checkmark-done-outline' color='#6b6868' size={18} />
          </View>
        </View>
        <ListItem.Subtitle style={tw.style('text-gray-400')} numberOfLines={1}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde dolore
          iste, repudiandae itaque exercitationem est omnis dolorum fugiat
          corrupti saepe! Repudiandae adipisci odio aut magnam.
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

export default ChatItem;

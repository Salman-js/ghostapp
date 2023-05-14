import { View, Text } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, ListItem } from '@rneui/themed';
import { Avatar } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';

const ContactItem = () => {
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
      rightContent={(reset) => (
        <>
          {direction === 'right' && (
            <Button
              title='Remove'
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
      <ListItem.Content style={tw.style('pb-2')}>
        <ListItem.Title style={tw.style('text-slate-200 font-bold')}>
          Salman
        </ListItem.Title>
        <ListItem.Subtitle style={tw.style('text-gray-400')} numberOfLines={1}>
          salman@gmail.com
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

export default ContactItem;

import { View, Text, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const GroupItem = ({ type }) => {
  return (
    <Surface
      style={tw.style('rounded-3xl overflow-hidden mr-3', {
        backgroundColor: '#32283c',
        width: 320,
      })}
      elevation={3}
    >
      <Pressable style={tw.style('w-full')}>
        <Image
          source={{
            uri: 'https://www.eta.co.uk/wp-content/uploads/2012/09/Cycling-by-water-resized-min.jpg',
          }}
          className='w-full h-16'
        />
        <Avatar
          image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
          size={50}
          style={tw.style('relative -mt-6 ml-4')}
        />
        <View className='w-full px-4 pb-4 mt-1'>
          <View className='flex flex-row justify-between'>
            <View
              style={tw.style('my-auto', {
                width: '60%',
              })}
            >
              <Text
                className='text-lg font-bold text-gray-200 break-words'
                numberOfLines={2}
              >
                Group Name
              </Text>
            </View>
            {type === 'suggested' && (
              <View className='border border-blue-400 overflow-hidden rounded-full my-auto'>
                <Pressable style={tw.style('w-full flex flex-row py-1 px-2')}>
                  <AntDesign
                    name='adduser'
                    color='#57aff3'
                    size={20}
                    style={tw.style('my-auto')}
                  />
                  <Text className='text-sm ml-2 text-blue-300 my-auto'>
                    Join group
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
          <Text className='text-sm text-gray-200 mt-1' numberOfLines={3}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
            quas voluptates, ut accusamus labore iure?
          </Text>
          <View className='flex flex-row pl-4 mt-2'>
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={33}
              style={tw.style('-ml-4')}
              imageStyle={tw.style('border-white', {
                borderWidth: 2,
              })}
            />
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={33}
              style={tw.style('-ml-4')}
              imageStyle={tw.style('border-white', {
                borderWidth: 2,
              })}
            />
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={33}
              style={tw.style('-ml-4')}
              imageStyle={tw.style('border-white', {
                borderWidth: 2,
              })}
            />
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={33}
              style={tw.style('-ml-4')}
              imageStyle={tw.style('border-white', {
                borderWidth: 2,
              })}
            />
            <Avatar
              label='+ 3'
              size={33}
              style={tw.style('-ml-4')}
              imageStyle={tw.style('border-white', {
                borderWidth: 2,
              })}
            />
          </View>
        </View>
      </Pressable>
    </Surface>
  );
};

export default GroupItem;

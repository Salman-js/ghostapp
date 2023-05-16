import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { RefreshControl } from 'react-native';
import { Popover } from 'native-base';
import { Button } from '@rneui/themed';
import { auth } from '../../firebase';

const SettingsScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const toast = useToast(null);
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
        <IconButton
          icon={(props) => (
            <AntDesign name='arrowleft' {...props} color='#ece9e9' />
          )}
          style={tw.style('')}
          onPress={() => navigation.goBack()}
        />
        <Popover
          trigger={(triggerProps) => {
            return (
              <TouchableOpacity {...triggerProps}>
                <IconButton
                  icon={(props) => (
                    <Feather
                      name='more-horizontal'
                      {...props}
                      color='#ffffff'
                    />
                  )}
                  disabled
                />
              </TouchableOpacity>
            );
          }}
          placement='bottom right'
        >
          <Popover.Content
            accessibilityLabel='Delete Customerd'
            w='40'
            style={tw.style('p-0', {
              backgroundColor: '#32283c',
            })}
            borderWidth={0}
          >
            <Popover.Body
              style={tw.style('p-0', {
                backgroundColor: '#32283c',
              })}
              borderWidth={0}
            >
              <Button
                buttonStyle={tw.style('py-3', {
                  backgroundColor: '#32283c',
                })}
                titleStyle={tw.style('text-lg text-red-500')}
                containerStyle={tw.style('bg-black')}
                onPress={() => {
                  auth.signOut();
                }}
              >
                <Feather
                  name='log-out'
                  color='#ee3030'
                  size={23}
                  style={tw.style('mr-3 my-auto')}
                />
                Logout
              </Button>
            </Popover.Body>
          </Popover.Content>
        </Popover>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
      ></ScrollView>
    </View>
  );
};

export default SettingsScreen;

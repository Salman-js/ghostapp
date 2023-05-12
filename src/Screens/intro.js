import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import { Button } from '@rneui/themed';
import { useSelector } from 'react-redux';

const IntroScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      navigation.navigate('Main');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  }, [user]);
  return (
    <View className='h-full flex justify-between items-center'>
      <ImageBackground
        source={require('../../assets/firstBg.png')}
        resizeMode='cover'
        className='h-full w-full flex items-center'
      >
        <LinearGradient
          colors={[
            '#271b2d22',
            '#271b2d22',
            '#271b2d5f',
            '#271b2d5f',
            '#271b2dbd',
            '#271b2d',
            '#271b2d',
          ]}
          style={tw.style('h-full flex justify-end items-center w-full pt-20')}
        >
          <View className='w-5/6 flex flex-col space-y-2 pb-8'>
            <Text className='text-3xl font-bold text-center text-slate-200'>
              Feel the void
            </Text>
            <Text className='text-xl text-center text-slate-300 mb-6'>
              Just Another Social Media App
            </Text>
            <Button
              title='Get started'
              loading={false}
              buttonStyle={tw.style('rounded-full py-3 overflow-hidden', {
                backgroundColor: '#32283c',
              })}
              titleStyle={tw.style('font-bold text-xl')}
              containerStyle={tw.style('mt-8 mx-3 overflow-hidden')}
              onPress={() => navigation.navigate('Sign In')}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default IntroScreen;

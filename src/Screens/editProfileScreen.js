import { View, Text, ScrollView } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import React, { useState } from 'react';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
  TextInput,
} from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@rneui/themed';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../api/user';
import { setUser } from '../../slices/authSlice';
import { useToast } from 'react-native-toast-notifications';
import { Image } from 'react-native';

const EditProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast(null);
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
  const { profile } = route.params;
  const [userData, setUserData] = useState({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    handle: user.handle,
  });
  const [profileData, setProfileData] = useState({
    bio: !profile.bio ? '' : profile.bio,
    location: !profile.location ? '' : profile.location,
    website: !profile.website ? '' : profile.website,
  });
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['profile'], { exact: true });
      queryClient.invalidateQueries(['tawts', 'my'], { exact: true });
      queryClient.invalidateQueries(['tawts'], { exact: true });
      navigation.goBack();
      toast.show('Profile updated', {
        icon: <Feather name='check-circle' size={20} color='white' />,
        placement: 'top',
        type: 'normal',
        duration: 4000,
        style: { marginTop: 50 },
        textStyle: { padding: 0 },
      });
      dispatch(setUser(userData));
    },
    onError: (error) => {
      if (error.response) {
        if (error.response.data.token) {
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
  function onUpdate() {
    const updatedData = {
      ...userData,
      ...profileData,
    };
    updateProfileMutation.mutate(updatedData);
  }
  return (
    <View className='h-full flex pt-14 bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-0 rounded-b-xl bg-transparent'
        )}
      >
        <View className='flex flex-row space-x-1'>
          <IconButton
            icon={(props) => (
              <Feather
                name='chevron-left'
                {...props}
                color='#ebe5e5'
                size={30}
              />
            )}
            onPress={() => navigation.goBack()}
          />
          <Text className='text-2xl font-semibold text-slate-200 my-auto ml-3'>
            Edit profile
          </Text>
        </View>
        <Button
          title='Done'
          buttonStyle={tw.style('rounded-full', {
            backgroundColor: '#271b2d',
          })}
          titleStyle={tw.style('text-lg font-bold')}
          containerStyle={tw.style('my-auto')}
          disabledStyle={tw.style('', {
            backgroundColor: '#271b2d',
          })}
          disabled={
            !userData.name.trim().length || updateProfileMutation.isLoading
          }
          onPress={onUpdate}
        />
      </Surface>
      <ScrollView
        className='w-full p-4'
        contentContainerStyle={tw.style('bg-transparent')}
        showsVerticalScrollIndicator={false}
      >
        <View className='overflow-hidden'>
          <Pressable style={tw.style('')}>
            {user?.avatar ? (
              <>
                <Avatar
                  image={{
                    uri: 'https://mui.com/static/images/avatar/1.jpg',
                  }}
                  icon={(props) => (
                    <Icon name='camera-plus-outline' {...props} />
                  )}
                  size={60}
                  style={tw.style('my-auto')}
                />
                <Avatar
                  icon={(props) => (
                    <Icon name='camera-plus-outline' {...props} />
                  )}
                  size={60}
                  style={tw.style('absolute my-auto', {
                    backgroundColor: '#89898942',
                  })}
                />
              </>
            ) : (
              <Avatar
                icon={(props) => <Icon name='camera-plus-outline' {...props} />}
                size={60}
                color='#ffffff8b'
                style={tw.style('my-auto')}
              />
            )}
          </Pressable>
        </View>
        <Input
          label='Name'
          value={userData.name}
          onChangeText={(e) =>
            setUserData({
              ...userData,
              name: e,
            })
          }
          inputStyle={tw.style('text-slate-200')}
          containerStyle={tw.style('mt-8')}
        />
        <Input
          label='Bio'
          multiline
          numberOfLines={3}
          value={profileData.bio}
          onChangeText={(e) =>
            setProfileData({
              ...profileData,
              bio: e,
            })
          }
          inputStyle={tw.style('text-slate-200', {
            textAlignVertical: 'top',
          })}
        />
        <Input
          label='Location'
          value={profileData.location}
          onChangeText={(e) =>
            setProfileData({
              ...profileData,
              location: e,
            })
          }
          inputStyle={tw.style('text-slate-200')}
        />
        <Input
          label='Website'
          value={profileData.website}
          onChangeText={(e) =>
            setProfileData({
              ...profileData,
              website: e,
            })
          }
          inputStyle={tw.style('text-slate-200')}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URI } from './constants';

// Update profile
export const updateProfile = async (updatedData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/user/update`, updatedData, config)
    .then((res) => res.data);
};

// get user profile
export const getUserProfile = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/profile/${id}`, config)
    .then((res) => res.data[0]);
};

// Check handle
export const checkHandle = async (e) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/check-handle/${e}`, config)
    .then((res) => res.data);
};

// Follow user
export const followUser = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/user/follow/${id}`, config)
    .then((res) => res.data);
};

// Follow user
export const unfollowUser = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/user/unfollow/${id}`, config)
    .then((res) => res.data);
};

// Get my followers
export const getMyFollowers = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/followers`, config)
    .then((res) => res.data);
};

// Get my followings
export const getMyFollowings = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/followings`, config)
    .then((res) => res.data);
};

// Get users's followers
export const getFollowers = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/followers/:id`, config)
    .then((res) => res.data);
};

// Get user's followings
export const getFollowings = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/followings/${id}`, config)
    .then((res) => res.data);
};

// Get users by search
export const getUsersBySearch = async (searchQuery) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/search/${searchQuery}`, config)
    .then((res) => res.data);
};

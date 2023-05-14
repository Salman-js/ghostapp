import React from 'react';
import tw from 'twrnc';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useWindowDimensions } from 'react-native';
import CustomDrawer from '../Components/Navigation Components/drawer';
import HomeScreen from './homeScreen';
import SettingsScreen from './settingsScreen';
import ContactsScreen from './contactsScreen';
import SavedScreen from './savedScreen';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
        drawerItemStyle: tw.style('rounded-lg px-3'),
        drawerLabelStyle: tw.style('-ml-4 text-blue-300 text-lg'),
        drawerInactiveTintColor: '#90b9f7',
        drawerStyle: tw.style('', {
          backgroundColor: '#271b2d',
        }),
      }}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          drawerLabel: '',
          drawerItemStyle: {
            display: 'none',
          },
        }}
        style={tw.style('h-0 bg-gray-600')}
      />
      <Drawer.Screen
        name='Contacts'
        component={ContactsScreen}
        options={{
          drawerIcon: (props) => <Feather name='user' size={24} {...props} />,
        }}
      />
      <Drawer.Screen
        name='Saved Messages'
        component={SavedScreen}
        options={{
          drawerIcon: (props) => (
            <Feather name='bookmark' size={24} {...props} />
          ),
        }}
      />
      <Drawer.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          drawerIcon: (props) => (
            <Feather name='settings' size={24} {...props} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

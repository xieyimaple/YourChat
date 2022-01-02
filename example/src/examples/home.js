import * as React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import message from './message';
import contacts from './contacts';
import find from './find';
import user from './user';

const Tab = createBottomTabNavigator();

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    }
  }
);

export default class extends React.PureComponent {
  static route = 'Home';
  static navigationOptions = { title: '主页' };

  state = {
  };

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={
          ({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name == '消息') {
                return (<Icon color={focused?'#44a0df':'#9b9b9b'} name='message1' size={25} />);
              }else if (route.name == '联系人') {
                return (<Icon color={focused?'#44a0df':'#9b9b9b'} name='contacts' size={25} />);
              }else if (route.name == '发现') {
                return (<Icon color={focused?'#44a0df':'#9b9b9b'} name='find' size={25} />);
              }else if (route.name == '我') {
                return (<Icon color={focused?'#44a0df':'#9b9b9b'} name='user' size={25} />);
              }
            }
          })
        }>
          <Tab.Screen name="消息" component={message} />
          <Tab.Screen name="联系人" component={contacts} />
          <Tab.Screen name="发现" component={find} />
          <Tab.Screen name="我" component={user} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

import * as React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

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
    footBar: [{
      itemName: 'message'
    },{
      itemName: 'contacts' 
    },{
      itemName: 'find'
    },{
      itemName: 'me'
    }]
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
          <Tab.Screen name="消息" component={HomeScreen} />
          <Tab.Screen name="联系人" component={SettingsScreen} />
          <Tab.Screen name="发现" component={SettingsScreen} />
          <Tab.Screen name="我" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed'
    }
  }
);



export default class extends React.PureComponent {
  static route = 'AddFriend';
  static navigationOptions = { title: '添加好友' };

  state = {
    checked: false
  }

  submit = () => {
    alert('submit')
  }
  

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        
      </ScrollView>
    );
  }
}

import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Input, CheckBox } from 'react-native-elements';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    inputContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 20,
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20
    }
  }
);



export default class extends React.PureComponent {
  static route = 'ResetPassword';
  static navigationOptions = { title: '修改密码' };

  state = {
  }

  submit = () => {
    alert('submit')
  }
  

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        <View style={style.inputContainer}>
          <ListItem>
            <Input
              label='旧密码'
              placeholder='请输入旧密码'
            />
          </ListItem>
          <ListItem>
            <Input
              label='新密码'
              placeholder='请输入新密码'
              secureTextEntry={true}
            />
          </ListItem>
          <ListItem>
            <Input
              label='确认新密码'
              placeholder='请再次输入新密码'
              errorStyle={{ color: 'red' }}
              errorMessage=''
              secureTextEntry={true}
            />
          </ListItem>
        </View>
        
        <Button
          title={'修改密码'}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={this.submit}
        />
      </ScrollView>
    );
  }
}

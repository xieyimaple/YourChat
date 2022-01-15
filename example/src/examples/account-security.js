import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    listItem: {
      backgroundColor: '#ffffff',
      flexDirection: 'row'
    },
    textBox: {
      width: '90%'
    },
    iconRight: {
    },
    resetPsw: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      marginTop: 10
    },
    logout: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 25
    },
    red: {
      color: '#ff0000'
    }
  }
);



export default class extends React.PureComponent {
  static route = "AccountSecurity";
  static navigationOptions = { title: "账号安全" };

  state = {

  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        <ListItem containerStyle={style.listItem}>
          <ListItem.Title style={style.textBox}>
            <Text>开启应用通知权限</Text>
          </ListItem.Title>
          <Icon style={style.iconRight} name='right' size={20} onPress={() => {alert('go to setting')}} />
        </ListItem>
        <ListItem containerStyle={style.listItem}>
          <ListItem.Title>
            <Text>清空聊天记录</Text>
          </ListItem.Title>
        </ListItem>
        <ListItem containerStyle={style.resetPsw}>
          <ListItem.Title>
            <Text>修改密码</Text>
          </ListItem.Title>
        </ListItem>
        <ListItem containerStyle={style.logout}>
          <ListItem.Title>
            <Text style={style.red}>退出登录</Text>
          </ListItem.Title>
        </ListItem>
      </ScrollView>
    );
  }
}

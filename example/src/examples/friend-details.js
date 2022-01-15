import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Avatar, ListItem, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    detail: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '20%',
      backgroundColor: '#ffffff',
    },
    username: {
      height: '6%',
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    setRemark: {
      marginTop: '4%'
    },
    textBox: {
      width: '90%'
    },
    ButtonItem: {
      flexDirection: "row",
      justifyContent: 'center',
      backgroundColor: '#ededed',
    },
  }
);



export default class extends React.PureComponent {
  static route = "FriendDetails";
  static navigationOptions = { title: "详细资料" };

  state = {
    user : {
      id: '1',
      username: 'aaaa',
      accont: 'aaaa',
      avator: 'https://img0.baidu.com/it/u=1094578575,4095785529&fm=26&fmt=auto'
    }
  }

  sendMsg = () => {
    sendMsg('send msg')
  }

  deleteFriend = () => {
    alert('delete friend')
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        <ListItem style={style.detail}>
          <Avatar
            activeOpacity={0.2}
            avatarStyle={{}}
            containerStyle={{}}
            icon={{}}
            iconStyle={{}}
            imageProps={{}}
            onLongPress={() => alert("onLongPress")}
            onPress={() => alert("onPress")}
            overlayContainerStyle={{}}
            placeholderStyle={{}}
            rounded
            size="large"
            source={{ uri: this.state.user.avator }}
          />
        </ListItem>
        <ListItem style={style.username}>
          <ListItem.Title style={{ color: '#aeaeae' }}>{this.state.user.username}</ListItem.Title>
        </ListItem>
        <ListItem containerStyle={style.setRemark}>
          <ListItem.Title style={style.textBox}>
            <Text>设置备注</Text>
          </ListItem.Title>
          <Icon name='right' size={20} onPress={() => {alert('go to setting')}} />
        </ListItem>
        <ListItem containerStyle={style.ButtonItem}>
          <Button
            title={'发送信息'}
            containerStyle={{
              width: '100%'
            }}
            onPress={this.sendMsg}
          />
        </ListItem>
        <ListItem containerStyle={style.ButtonItem}>
          <Button
            title={'删除好友'}
            containerStyle={{
              width: '100%'
            }}
            buttonStyle={{
              backgroundColor: '#ffffff'
            }}
            titleStyle={{
              color: '#ff0000'
            }}
            onPress={this.deleteFriend}
          />
        </ListItem>
      </ScrollView>
    );
  }
}

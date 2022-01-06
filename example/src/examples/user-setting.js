import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    userContainer: {
      height: '30%',
      backgroundColor: '#ffffff',
      flexDirection: 'row'
    },
    textBox: {
      width: '50%',
      marginLeft: '10%',
      marginTop: '20%'
    },
    iconRight: {
      marginTop: '25%'
    }
  }
);



export default class extends React.PureComponent {
  static route = "UserSetting";
  static navigationOptions = { title: "个人信息" };

  state = {
    user : {
      id: '1',
      username: 'aaaa',
      accont: 'aaaa',
      sex: '男',
      notes: 'casdasd',
      avator: 'https://img0.baidu.com/it/u=1094578575,4095785529&fm=26&fmt=auto'
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        <ListItem>
          <ListItem.Title>头像</ListItem.Title>
          <Avatar
            activeOpacity={0.2}
            avatarStyle={{}}
            containerStyle={{ backgroundColor: "#BDBDBD",marginLeft: "65%" }}
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
        <ListItem containerStyle={{
          borderTopWidth: 1,
          borderTopColor: '#ededed'
        }}>
          <ListItem.Title>昵称</ListItem.Title>
          <ListItem.Title>{this.state.user.username}</ListItem.Title>
        </ListItem>
        <ListItem>
          <ListItem.Title>账号</ListItem.Title>
          <ListItem.Title>{this.state.user.accont}</ListItem.Title>
        </ListItem>
        <ListItem>
          <ListItem.Title>性别</ListItem.Title>
          <ListItem.Title>{this.state.user.sex}</ListItem.Title>
        </ListItem>
      </ScrollView>
    );
  }
}

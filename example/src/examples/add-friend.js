import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SearchBar, ListItem, Avatar, Text, Input } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    searchBarContainer: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10
    },
    userItem: {
      marginTop: 20
    },
    labelItem: {
      height: 20,
      backgroundColor: '#ededed',
    },
    messageItem: {
    }
  }
);



export default class extends React.PureComponent {
  static route = 'AddFriend';
  static navigationOptions = { title: '添加好友' };

  state = {
    search : '',
    user : {
      username: 'jj',
      avator: 'https://img0.baidu.com/it/u=1094578575,4095785529&fm=26&fmt=auto',
    },
    message: ''
  }

  updateSearch = (search) => {
    this.setState({ search });
    console.log(this.state);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        <SearchBar
          platform="android"
          placeholder="对方账号"
          value={this.state.search}
          onChangeText={this.updateSearch}
          containerStyle={style.searchBarContainer}
        />
        <ListItem containerStyle={style.userItem}>
          <Avatar
            activeOpacity={0.2}
            avatarStyle={{}}
            containerStyle={{ backgroundColor: "#BDBDBD",marginLeft: 10 }}
            icon={{}}
            iconStyle={{}}
            imageProps={{}}
            overlayContainerStyle={{}}
            placeholderStyle={{}}
            size="medium"
            source={{ uri: this.state.user.avator }}
          />
          <ListItem.Content containerStyle={style.textBox}>
          <ListItem.Title>
            <Text style={style.username}>{this.state.user.username}</Text>
          </ListItem.Title>
        </ListItem.Content>  
        </ListItem>
        <ListItem containerStyle={style.labelItem}>
          <Text>申请留言</Text>
        </ListItem>
        <ListItem containerStyle={style.messageItem}>
          <Input
            placeholder=' '
          />
        </ListItem>
      </ScrollView>
    );
  }
}

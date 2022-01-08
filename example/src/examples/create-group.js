import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text, ListItem, SearchBar, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    searchBarContainer: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      padding: 10,
      marginRight: 10,
      borderRadius: 10
    },
  }
);



export default class extends React.PureComponent {
  static route = 'CreateGroup';
  static navigationOptions = { title: '创建群聊' };


  state = {
    search : '',
    users : [{
      id: '1',
      username: 'aaaa',
      checked: false,
      avator: 'https://img0.baidu.com/it/u=1094578575,4095785529&fm=26&fmt=auto'
    },{
      id: '2',
      username: 'aaaa2',
      checked: false,
      avator: 'https://img2.baidu.com/it/u=4020015437,2067593922&fm=26&fmt=auto'
    },{
      id: '3',
      username: 'aaaa3',
      checked: false,
      avator: 'https://img2.baidu.com/it/u=3084758157,2896901232&fm=26&fmt=auto'
    },{
      id: '4',
      username: 'aaaa4',
      checked: false,
      avator: 'https://img0.baidu.com/it/u=2262462694,2417107806&fm=26&fmt=auto'
    }]
  }

  updateSearch = (search) => {
    this.setState({ search });
    console.log(this.state);
  };

  updateCheck = (item,checked) => {
    console.log(item);
    console.log(checked);
    //this.setState({checked: !item.checked})
  }

  render() {
    var that=this;
    return (
      <ScrollView contentContainerStyle={style.body}>
        <SearchBar
            platform="android"
            placeholder="搜索好友"
            value={this.state.search}
            onChangeText={this.updateSearch}
            containerStyle={style.searchBarContainer}
          />
        {this.state.users.map((item, i) => (
          <ListItem key={item.id}
                    onPress={ 
                      (index) => {
                        console.log(that.state.users[index]);
                        this.setState(!that.state.users[index].checked);
                      }
                    }
                  >
            <CheckBox
              checkedIcon={ <Icon name='check-circle' size={20} /> }
              uncheckedIcon={ <Icon name='circle-outline' size={20} /> }
              checked={item.checked}
            />
            <Avatar
              activeOpacity={0.2}
              avatarStyle={{}}
              containerStyle={{ backgroundColor: "#BDBDBD"}}
              size="medium"
              source={{ uri: item.avator }}
            />
            <ListItem.Content containerStyle={style.textBox}>
              <ListItem.Title>
                <Text style={style.username}>{item.username}</Text>
              </ListItem.Title>
            </ListItem.Content>            
          </ListItem>
        ))}
      </ScrollView>
    );
  }
}

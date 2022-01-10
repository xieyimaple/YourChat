import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text, ListItem, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '90%'
    },
    bottomBar: {
      height: '10%',
      borderTopWidth: 1,
      borderColor: '#ededed',
      flexDirection: 'row',
      backgroundColor: '#f7f7f7',
    },
    messageInput: {
      width: '75%'
    }
  }
);



export default class extends React.PureComponent {
  static route = 'SingleMessage';
  static navigationOptions = { title: '信息' };


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
      checked: true,
      avator: 'https://img2.baidu.com/it/u=3084758157,2896901232&fm=26&fmt=auto'
    },{
      id: '4',
      username: 'aaaa4',
      checked: true,
      avator: 'https://img0.baidu.com/it/u=2262462694,2417107806&fm=26&fmt=auto'
    }]
  }

  render() {
    return (
      <View>
        <View>
          <ScrollView contentContainerStyle={style.body}>
            {this.state.users.map((item, i) => (
              <ListItem key={item.id}
                        onPress={ 
                          () => {
                            item.checked = !item.checked
                          }
                        }
                      >
              
              </ListItem>
            ))}
          </ScrollView>
        </View>
        <ListItem style={style.bottomBar}>
          <Input
            containerStyle = {style.messageInput}
          />
          <Icon name='happy-outline' size={30} onPress={() => {alert('go to setting')}} />
          <Icon name='add-circle-outline' size={30} onPress={() => {alert('go to setting')}} />
        </ListItem>
      </View>
      
    );
  }
}

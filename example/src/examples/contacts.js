import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text, ListItem } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    }
  }
);



export default class extends React.PureComponent {
  static route = 'contacts';
  state = {
    users : [{
      id: '1',
      username: 'aaaa',
      avator: 'https://img0.baidu.com/it/u=1094578575,4095785529&fm=26&fmt=auto'
    },{
      id: '2',
      username: 'aaaa2',
      avator: 'https://img2.baidu.com/it/u=4020015437,2067593922&fm=26&fmt=auto'
    },{
      id: '3',
      username: 'aaaa3',
      avator: 'https://img2.baidu.com/it/u=3084758157,2896901232&fm=26&fmt=auto'
    },{
      id: '4',
      username: 'aaaa4',
      avator: 'https://img0.baidu.com/it/u=2262462694,2417107806&fm=26&fmt=auto'
    }]
  }


  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        {this.state.users.map((item, i) => (
          <ListItem key={item.id}
                    onLongPress={() => alert("onLongPress")}
                    onPress={() => alert("onPress")}>
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

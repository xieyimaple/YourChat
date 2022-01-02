import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text, ListItem } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    userContainer: {
      backgroundColor: '#fff',
      borderColor: '#d2d2d2',
      borderBottomWidth: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center"
    },
    textBox: {
      width: '50%',
      marginLeft: '3%'
    },
    username: {
      color: 'black'
    },
    message: {
      color: '#7b7b7b',
      marginTop: 8
    }
  }
);



export default class extends React.PureComponent {
  static route = 'user';

  state = {
    users : [{
      id: '1',
      username: 'aaaa',
      message: 'casdasd',
      avator: 'https://img0.baidu.com/it/u=1094578575,4095785529&fm=26&fmt=auto'
    },{
      id: '2',
      username: 'aaaa2',
      message: 'casdasd',
      avator: 'https://img2.baidu.com/it/u=4020015437,2067593922&fm=26&fmt=auto'
    },{
      id: '3',
      username: 'aaaa3',
      message: ' i am gaoxin',
      avator: 'https://img2.baidu.com/it/u=3084758157,2896901232&fm=26&fmt=auto'
    },{
      id: '4',
      username: 'aaaa4',
      message: 'casdasd',
      avator: 'https://img0.baidu.com/it/u=2262462694,2417107806&fm=26&fmt=auto'
    }]
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        {this.state.users.map((item, i) => (
          <ListItem key={item.id} containerStyle={style.userContainer}
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
              <ListItem.Subtitle>
                <Text style={style.message}>{item.message}</Text>
              </ListItem.Subtitle>
            </ListItem.Content>            
          </ListItem>
        ))}
      </ScrollView>
    );
  }
}
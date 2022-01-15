import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

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
  static route = 'user';

  state = {
    user : {
      id: '1',
      username: 'aaaa',
      notes: 'casdasd',
      avator: 'https://img0.baidu.com/it/u=1094578575,4095785529&fm=26&fmt=auto'
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
          <View style={style.userContainer}>
            <Avatar
              activeOpacity={0.2}
              avatarStyle={{}}
              containerStyle={{ backgroundColor: "#BDBDBD",marginTop: "10%",marginLeft: "10%" }}
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
            <View style={style.textBox}>
              <Text style={style.username}>{this.state.user.username}</Text>
              <Text style={style.notes}>{this.state.user.notes}</Text>
            </View>
            <View style={ style.iconRight }>
              <Icon name='right' size={20} onPress={() => {alert('go to setting')}} />
            </View> 
          </View>
          <ListItem containerStyle={{height: '10%'}}>
            <Icon name='setting' size={20} />
            <ListItem.Title>
              <Text>账号安全</Text>
            </ListItem.Title>
            <Icon name='right' size={20} onPress={() => {alert('go to setting')}} />
          </ListItem>
          <ListItem containerStyle={{height: '10%'}}>
            <Icon name='infocirlceo' size={20} />
            <ListItem.Title>
              <Text>当前版本</Text>
              <Text>0.0.1</Text>
            </ListItem.Title>
          </ListItem>
      </ScrollView>
    );
  }
}

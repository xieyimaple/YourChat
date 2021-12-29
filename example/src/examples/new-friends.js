import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    }
  }
);



export default class extends React.PureComponent {
  static route = 'NewFriends';
  static navigationOptions = { title: '新的联系人' };

  state = {
    users : [{
      id: '1',
      username: 'aaaa',
      notes: 'casdasd',
      state: 'accepted',
      avator: '../images/1.jpg'
    },{
      id: '2',
      username: 'aaaa2',
      notes: 'casdasd',
      state: 'accepted',
      avator: '../images/2.jpg'
    },{
      id: '3',
      username: 'aaaa3',
      notes: ' i am gaoxin',
      state: 'accepted',
      avator: '../images/3.png'
    },{
      id: '4',
      username: 'aaaa4',
      notes: 'casdasd',
      state: 'accepted',
      avator: '../images/4.jpg'
    }]
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        {this.state.users.map((item, i) => (
          <View key={item.id}>
            <Avatar
              activeOpacity={0.2}
              avatarStyle={{}}
              containerStyle={{ backgroundColor: "#BDBDBD" }}
              icon={{}}
              iconStyle={{}}
              imageProps={{}}
              onLongPress={() => alert("onLongPress")}
              onPress={() => alert("onPress")}
              overlayContainerStyle={{}}
              placeholderStyle={{}}
              rounded
              size="medium"
              source={{ uri: item.avator }}
            />
            <Text>{item.username}</Text>
            <Text>{item.notes}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}

import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text, Button } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    userContainer: {
      height: 60,
      backgroundColor: '#fff',
      borderColor: '#d2d2d2',
      borderBottomWidth: 1,
      flexDirection: "row",
      flexWrap: "wrap"
    },
    textBox: {
      width: '50%',
      marginLeft: '3%'
    },
    username: {
      color: 'black'
    },
    notes: {
      color: '#7b7b7b',
      marginTop: 8
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
      avator: 'https://img0.baidu.com/it/u=1094578575,4095785529&fm=26&fmt=auto'
    },{
      id: '2',
      username: 'aaaa2',
      notes: 'casdasd',
      state: 'accepted',
      avator: 'https://img2.baidu.com/it/u=4020015437,2067593922&fm=26&fmt=auto'
    },{
      id: '3',
      username: 'aaaa3',
      notes: ' i am gaoxin',
      state: 'wait',
      avator: 'https://img2.baidu.com/it/u=3084758157,2896901232&fm=26&fmt=auto'
    },{
      id: '4',
      username: 'aaaa4',
      notes: 'casdasd',
      state: 'accepted',
      avator: 'https://img0.baidu.com/it/u=2262462694,2417107806&fm=26&fmt=auto'
    }]
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        {this.state.users.map((item, i) => (
          <View key={item.id} style={style.userContainer}>
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
            <View style={style.textBox}>
              <Text style={style.username}>{item.username}</Text>
              <Text style={style.notes}>{item.notes}</Text>
            </View>
            <Button
              buttonStyle={{ width: 100 }}
              containerStyle={{ marginLeft: '8%'}}
              disabled = { true }
              disabledStyle={{
                backgroundColor: '#ededed'
              }}
              disabledTitleStyle={{ color: "#fff" }}
              linearGradientProps={null}
              loadingProps={{ animating: true }}
              loadingStyle={{}}
              onPress={() => alert("click")}
              title={ item.state == 'accepted' ? '已接受' : '等待验证'}
              titleProps={{}}
              titleStyle={{ marginHorizontal: 5 }}
            />
          </View>
        ))}
      </ScrollView>
    );
  }
}

import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input, ListItem, Text } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    inputContainer: {
      backgroundColor: '#ededed'
    },
    tips: {
      marginTop: -35,
      marginLeft: 25
    }
  }
);



export default class extends React.PureComponent {
  static route = 'ResetUsername';
  static navigationOptions = { title: '修改昵称' };

  state = {
  }

  submit = () => {
    alert('submit')
  }
  

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        <View>
          <ListItem containerStyle={style.inputContainer}>
            <Input
              placeholder=' '
            />
            
          </ListItem>
          <Text style={style.tips}>
            快设置一个好听的名字吧
          </Text>
        </View>
      </ScrollView>
    );
  }
}

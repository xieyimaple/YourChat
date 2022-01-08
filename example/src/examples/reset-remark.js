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
    }
  }
);



export default class extends React.PureComponent {
  static route = 'ResetRemark';
  static navigationOptions = { title: '修改备注' };

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
        </View>
      </ScrollView>
    );
  }
}

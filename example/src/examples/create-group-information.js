import * as React from 'react';
import { StyleSheet , View, Image } from 'react-native';
import { Button, Input, ListItem } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center',
      backgroundColor: '#ededed'
    },
    ListItem: {
      flexDirection: "row",
      justifyContent: 'center',
      backgroundColor: '#ededed',
    },
    loginInput: {
      marginLeft: '25%',
      width: '50%'
    }
  }
);

export default class extends React.PureComponent {
  static route = 'CreateGrpupInformation';
  static navigationOptions = { title: '创建群组' };

  submit = () => {
    console.log('submit');
  }

  render() {
    return (
      <View style={style.body}>
        <ListItem containerStyle={style.ListItem}>
          <Input
            placeholder='请输入群名称'
            inputContainerStyle={style.loginInput}
          />
        </ListItem>
        <ListItem containerStyle={style.ListItem}>
          <Button
            title={'确认'}
            containerStyle={{
              width: '90%'
            }}
            onPress={this.submit}
          />
        </ListItem>
      </View>
    );
  }
}

import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ListItem, Text, Switch  } from 'react-native-elements';
const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    listItem: {
      backgroundColor: '#ffffff',
      flexDirection: 'row'
    },
    textBox: {
      width: '80%'
    }
  }
);



export default class extends React.PureComponent {
  static route = "AllowNotice";
  static navigationOptions = { title: "近友IM" };

  state = {
    allowNotice: false
  }

  setAllowNotice = value => {
    this.setState({ allowNotice: value });
    alert(this.state.allowNotice);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        <ListItem containerStyle={style.listItem}>
          <ListItem.Title style={style.textBox}>
            <Text>开启应用通知权限</Text>
          </ListItem.Title>
          <Switch value={this.state.allowNotice} onValueChange={this.setAllowNotice} />
        </ListItem>
      </ScrollView>
    );
  }
}

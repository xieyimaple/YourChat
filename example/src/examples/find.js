import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    }
  }
);



export default class extends React.PureComponent {
  static route = 'find';

  state = {
    finds : [{
      textName: '爱公益'
    },{
      textName: '爱慈善'
    },{
      textName: '爱救援'
    }]
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        {this.state.finds.map((item, i) => (
          <ListItem key={item.id}
                    onLongPress={() => alert("onLongPress")}
                    onPress={() => alert("onPress")}>
            <ListItem.Content>
              <ListItem.Title>
                <Text>{item.textName}</Text>
                <Icon name='right' size={20} />
              </ListItem.Title>
            </ListItem.Content> 
          </ListItem>
        ))}
      </ScrollView>
    );
  }
}

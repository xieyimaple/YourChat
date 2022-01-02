import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    textContainer: {
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
    textName: {
      color: 'black'
    },
    notes: {
      color: '#7b7b7b',
      marginTop: 8
    }
  }
);



export default class extends React.PureComponent {
  static route = 'find';

  state = {
    finds : [{
      textName: '爱公益'
    }]
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        {this.state.finds.map((item, i) => (
          <View key={item.id} style={style.textContainer}>
            <View style={style.textBox}>
              <Text style={style.textName}>{item.textName }</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

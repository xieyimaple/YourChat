import * as React from 'react';
import { ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

export default class extends React.PureComponent {
  static route = 'SingleFind';
  static navigationOptions = { title: '发现' };

  state = {
    
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff000',height: '100%', paddingTop: 50}}>
        <WebView
          source={{uri: 'www.baidu.com'}}
          style={{height: '50%',backgroundColor: '#dddfff'}}
        />
      </ScrollView>
    );
  }
}

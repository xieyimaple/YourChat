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
      <WebView
        source={{uri: 'www.baidu.com'}}
        style={{marginTop: 20}}
      />
    );
  }
}

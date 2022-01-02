import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed',
      minHeight: '100%'
    },
    searchBarContainer: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10
    }
  }
);



export default class extends React.PureComponent {
  static route = 'contacts';
  state = {
    search : ''
  }

  updateSearch = (search) => {
    this.setState({ search });
    console.log(this.state);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        <SearchBar
          platform="android"
          placeholder="对方账号"
          value={this.state.search}
          onChangeText={this.updateSearch}
          containerStyle={style.searchBarContainer}
        />
      </ScrollView>
    );
  }
}


/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 添加朋友
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react'
import MainView from '../components/MainView'
import {TouchableOpacity} from 'react-native'
import {Header, ListItem} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SearchBar, Text } from 'react-native-elements';
import ApiUtil from '../Service/ApiUtil'
import Toast from "react-native-root-toast";
import getStyle from './Style/AddFiendStyle';
import { YCChat } from '../observable/lib/chat';

const chat = YCChat.getInstance();
let Styles = {}
class AddFriend extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  search = async () => {
    const {search} = this.state

    try{
      const result = await chat.currentUser.findFriendByAccount(search);
      if (result.status) {
        this.props.navigation.navigate('UserDetail', {'user': result.details});
      } else {
        Toast.show(result.msg, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER
        })
      }
    }catch {

    }
    this.setState({
      search: ''
    })

  }

  updateSearch = search => {
    this.setState({ search });
  };

  render(){

    Styles = getStyle()

    return(
      <MainView>

        {/*头部*/}

        <Header
          placement="center"
          leftComponent={
            <TouchableOpacity onPress={()=>{
              this.props.navigation.goBack();
            }}>
              <FontAwesome name={'angle-left'} size={24} color={'#44a0df'}
              >
              </FontAwesome>
            </TouchableOpacity>
          }
          centerComponent={{ text: '添加朋友', style: { color: 'black', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />

        {/*搜索框*/}

        <SearchBar
          platform={'android'}
          placeholder="对方账号"
          value={this.state.search}
          containerStyle={{backgroundColor: 'white'}}
          inputContainerStyle={{backgroundColor: 'white'}}
          inputStyle={{ borderColor: 'white'}}
          onChangeText={this.updateSearch}
        />

        {/*搜索内容*/}
        {
          this.state.search!==''?
            <ListItem
              bottomDivider
              onPress={this.search}
            >
              <ListItem.Title>
                <Text>{"搜索:"+this.state.search}</Text>
              </ListItem.Title>
            </ListItem> : null
        }

      </MainView>
    )
  }

}

export default AddFriend;

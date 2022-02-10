/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 群管理页
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Header, ListItem, Text, Switch, Button, Avatar} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MainView from '../components/MainView'
import {TouchableOpacity, View, Image} from 'react-native'
import {connect} from "react-redux";
import {UpdateUser} from '../Redux/actionCreators'
import getStyle from './Style/GroupManageSelfStyle'
import Toast from "react-native-root-toast";

import { YCChat } from '../observable/lib/chat';

const chat = YCChat.getInstance();
let Styles = {};


class GroupManageSelf extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      allowNotice: true,
      groupId: this.props.navigation.state.params.groupId
    }
  }

  componentDidMount() {
  }

  render(){
    Styles = getStyle()

    return(
      <MainView>
        <Header
          placement="center"
          leftComponent={
            <TouchableOpacity onPress={()=>{
              this.props.navigation.goBack();
            }}>
              <FontAwesome name={'angle-left'} size={24} color={'white'}
              >
              </FontAwesome>
            </TouchableOpacity>
          }
          centerComponent={{ text: '群管理', style: { color: 'white', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />
        <ListItem containerStyle={Styles.listItem}
                  onPress={() => {
                    this.props.navigation.navigate('AddRole', { groupId: this.state.groupId });
                  }}>
          <ListItem.Title>
            <Text>设置管理员</Text>
          </ListItem.Title>
        </ListItem>
        <ListItem containerStyle={Styles.listItem}
                  onPress={() => {
                    this.props.navigation.navigate('DelRole', { groupId: this.state.groupId });
                  }}>
          <ListItem.Title>
            <Text>取消管理员</Text>
          </ListItem.Title>
        </ListItem>
        <ListItem containerStyle={Styles.listItem}
                  onPress={() => {
                    this.props.navigation.navigate('RemoveMembers', { groupId: this.state.groupId, isTransfer: true });
                  }}>
          <ListItem.Title>
            <Text>群主管理权转让</Text>
          </ListItem.Title>
        </ListItem>
        {/* <ListItem containerStyle={Styles.listItem}
                  onPress={() => {
                    console.log('群管理');
                  }}>
          <ListItem.Title>
            <Text>部分禁言</Text>
          </ListItem.Title>
        </ListItem>
        <ListItem containerStyle={Styles.listItem}>
          <ListItem.Title style={Styles.textBox}>
            <Text>允许管理员加好友</Text>
          </ListItem.Title>
          <Switch value={this.state.allowNotice} onValueChange={this.setAllowNotice} />
        </ListItem>
        <ListItem containerStyle={Styles.listItem}>
          <ListItem.Title style={Styles.textBox}>
            <Text>允许群内添加好友</Text>
          </ListItem.Title>
          <Switch value={this.state.allowNotice} onValueChange={this.setAllowNotice} />
        </ListItem>
        <ListItem containerStyle={Styles.listItem}>
          <ListItem.Title style={Styles.textBox}>
            <Text>全员禁言</Text>
          </ListItem.Title>
          <Switch value={this.state.allowNotice} onValueChange={this.setAllowNotice} />
        </ListItem> */}
      </MainView>
    )
  }

}

const mapState = state => ({
  user: chat.currentUser
})

const mapDispatch = dispatch => ({
  updateUser(param){
    dispatch(UpdateUser(param))
  }
})

export default connect(
  mapState,
  mapDispatch
)(GroupManageSelf)


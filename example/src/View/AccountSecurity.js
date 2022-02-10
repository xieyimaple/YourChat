/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 账号安全页
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Header, ListItem, Text} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MainView from '../components/MainView'
import {TouchableOpacity, Alert} from 'react-native'
import {connect} from "react-redux";
import {UpdateUser} from '../Redux/actionCreators'
import getStyle from './Style/AccountSecurityStyle'
import Icon from 'react-native-vector-icons/AntDesign';
import { YCChat } from '../observable/lib/chat';

const chat = YCChat.getInstance();
let Styles = {};


class AccountSecurity extends React.Component{
  constructor(props) {
    super(props);
  }

  deleteChatHistory = () => {
    
    console.log('deleteChatHistory');
  }

  loginOut= async () => {
    
    const result = await chat.validator.logout();
    if(result.status){
      this.props.navigation.navigate('LoginView')
    }else{
      Toast.show(result.msg,{
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP
      })
    }
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
              <FontAwesome name={'angle-left'} size={24} color={'#44a0df'}
              >
              </FontAwesome>
            </TouchableOpacity>
          }
          centerComponent={{ text: '账号安全', style: { color: 'black', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />

        <ListItem containerStyle={Styles.listItem} 
                  onPress={() => {this.props.navigation.navigate('AllowNotice')}}>
          <ListItem.Title style={Styles.textBox}>
            <Text>开启应用通知权限</Text>
          </ListItem.Title>
          <Icon style={Styles.iconRight} name='right' size={12} />
        </ListItem>
        <ListItem containerStyle={Styles.listItem}
                  onPress={() => {
                    Alert.alert(
                      '确认清空所有聊天记录？',
                      '',
                      [
                        {text: '取消', onPress: () => {}},
                        {text: '删除', onPress: () => this.deleteChatHistory()},
                      ]
                    )                    
                  }}>
          <ListItem.Title>
            <Text>清空聊天记录</Text>
          </ListItem.Title>
        </ListItem>
        <ListItem containerStyle={Styles.resetPsw}
                  onPress={() => {this.props.navigation.navigate('ResetPassword')}}>
          <ListItem.Title>
            <Text>修改密码</Text>
          </ListItem.Title>
        </ListItem>
        <ListItem containerStyle={Styles.logout}
                  onPress={() => {this.loginOut()}}>
          <ListItem.Title>
            <Text style={Styles.red}>退出登录</Text>
          </ListItem.Title>
        </ListItem>

        
      </MainView>
    )
  }

}

const mapState = state => ({
  user: state.UserReducer.get('user').toJS(),
})

const mapDispatch = dispatch => ({
  updateUser(param){
    dispatch(UpdateUser(param))
  }
})

export default connect(
  mapState,
  mapDispatch
)(AccountSecurity)


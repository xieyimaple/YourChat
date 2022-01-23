/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 创建群组
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Header, Input, Button} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MainView from '../components/MainView'
import {TouchableOpacity, View} from 'react-native'
import {connect} from "react-redux";
import {UpdateUser} from '../Redux/actionCreators'
import getStyle from './Style/EnterGroupNameStyle'
import { YCChat } from '../observable/lib/chat';
import Toast from 'react-native-root-toast';

const chat = YCChat.getInstance();
let Styles = {};
let params;

class EnterGroupName extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      groupName: ''
    };
  }


  EnterGroupName = async () => {
    let { groupName} = this.state;

    let users = params.params.users;
    users.push(this.props.user._id);
    let result = await chat.currentUser.createGroupChat({
      memberId: users,
      name: groupName,
      portraitUri: ''
    });
    console.log(result);
    if(result.status){
      Toast.show('创建群聊成功',{
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
      })
      
    }else{
      Toast.show(result.msg,{
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
      })
    }
  }
  

  render(){
    Styles = getStyle()
    params = this.props.navigation.state;
    return(
      <MainView>
        <Header
          placement="left"
          leftComponent={
            <TouchableOpacity onPress={()=>{
              this.props.navigation.goBack();
            }}>
              <FontAwesome name={'angle-left'} size={24} color={'black'}
              >
              </FontAwesome>
            </TouchableOpacity>
          }
          centerComponent={{ text: '创建群组', style: { color: 'black', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />


        <View style={Styles.content}>
          <Input
            placeholder='请输入群名称'
            containerStyle={Styles.containerStyle}
            inputContainerStyle={Styles.inputContainerStyle}
            inputStyle={Styles.input}
            value={this.state.groupName}
            onChangeText={(text)=>{
              this.setState({
                groupName: text
              })
            }}
          >
          </Input>
        </View>
        
        
        <Button
          title={"确认"}
          buttonStyle={Styles.Button}
          onPress={this.EnterGroupName}
          loading={this.props.loading}
          disabled={this.state.groupName === ''}
        ></Button>
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
)(EnterGroupName)


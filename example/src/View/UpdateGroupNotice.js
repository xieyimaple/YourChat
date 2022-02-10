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
import getStyle from './Style/UpdateGroupNoticeStyle'
import { YCChat } from '../observable/lib/chat';
import Toast from 'react-native-root-toast';

const chat = YCChat.getInstance();
let Styles = {};
let params;

class UpdateGroupNotice extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      groupId: this.props.navigation.state.params.groupId,
      groupNotice: ''
    };
  }


  UpdateGroupNotice = async () => {
    let { groupId, groupNotice} = this.state;
    let result = await chat.currentUser.updateGroupNotice(groupId,groupNotice);
    console.log(result);
    Toast.show(result.msg,{
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER
    })
    if(result.status){
      this.props.navigation.goBack();
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
              <FontAwesome name={'angle-left'} size={24} color={'#44a0df'}
              >
              </FontAwesome>
            </TouchableOpacity>
          }
          centerComponent={{ text: '修改群公告', style: { color: 'black', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />


        <View style={Styles.content}>
          <Input
            placeholder='请输入群公告'
            containerStyle={Styles.containerStyle}
            inputContainerStyle={Styles.inputContainerStyle}
            inputStyle={Styles.input}
            value={this.state.groupNotice}
            onChangeText={(text)=>{
              this.setState({
                groupNotice: text
              })
            }}
          >
          </Input>
        </View>
        
        
        <Button
          title={"确认"}
          buttonStyle={Styles.Button}
          onPress={this.UpdateGroupNotice}
          loading={this.props.loading}
          disabled={this.state.groupNotice === ''}
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
)(UpdateGroupNotice)


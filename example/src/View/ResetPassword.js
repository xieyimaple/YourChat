/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 修改密码
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
import getStyle from './Style/ResetPasswordStyle'
import Icon from 'react-native-vector-icons/AntDesign';

let Styles = {};

const msg = {
  passConfirmError: "两次密码不一致"
}

class ResetPassword extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      confirmPassError: ''
    };
  }


  // resetPassword = () => {
  //   let { oldPassword, newPassword} = this.state;
  //   console.log(oldPassword);
  //   console.log(newPassword);

  //   // this.props.register({
  //   //   'oldPassword': oldPassword,
  //   //   'newPassword': newPassword
  //   // })
  // }
  

  render(){
    Styles = getStyle()

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
          centerComponent={{ text: '修改密码', style: { color: 'black', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />


        <View style={Styles.content}>
          <Input
            secureTextEntry={true}
            placeholder='请输入旧密码'
            label='旧密码'
            containerStyle={Styles.containerStyle}
            inputContainerStyle={Styles.inputContainerStyle}
            labelStyle={Styles.inputLabel}
            inputStyle={Styles.input}
            value={this.state.oldPassword}
            onChangeText={(text)=>{
              this.setState({
                oldPassword: text
              })
            }}
          >
          </Input>

          <Input
            secureTextEntry={true}
            placeholder='请输入新密码'
            label="新密码"
            containerStyle={Styles.containerStyle}
            inputContainerStyle={Styles.inputContainerStyle}
            labelStyle={Styles.inputLabel}
            inputStyle={Styles.input}
            value={this.state.newPassword}
            onChangeText={(text)=>{
              this.setState({
                newPassword: text
              })
            }}
          >
          </Input>

          <Input
            secureTextEntry={true}
            placeholder='请再次输入新密码'
            label="确认新密码"
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.passConfirmError}
            containerStyle={Styles.containerStyle}
            inputContainerStyle={Styles.inputContainerStyle}
            labelStyle={Styles.inputLabel}
            inputStyle={Styles.input}
            value={this.state.confirmPassError}
            onChangeText={(text)=>{
              this.setState({
                confirmNewPassword: text
              },()=>{
                if(this.state.confirmNewPassword !== this.state.newPassword){
                  this.setState({
                    confirmPassError: msg.passConfirmError
                  })
                }else{
                  this.setState({
                    confirmPassError: ''
                  })
                }
              })
            }}
          >
          </Input>
        </View>
        
        
        <Button
          title={"修改密码"}
          buttonStyle={Styles.Button}
          onPress={this.resetPassword}
          loading={this.props.loading}
          disabled={this.state.oldPassword === '' || this.state.newPassword === '' || this.state.confirmNewPassword === ''}
        ></Button>
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
)(ResetPassword)


/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: APP 登录页
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Text, View, Image, TouchableOpacity} from "react-native";
import MainView from '../components/MainView'
import getStyle from './Style/LoginViewStyle'
import {connect} from "react-redux";
import {login} from '../Service/action'
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from "react-native-root-toast";
import {encrypt} from '../Util/Tool'
import { ListItem } from 'react-native-elements/dist/list/ListItem';
// import { YCChat } from '../observable/lib/chat';


let Styles = {};
const input = React.createRef();
const msg = {
  nameError: "用户名不能为空",
  passError: "密码不能为空",
  passConfirmError: "两次密码不一致"
}
class LoginView extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    if(nextProps.loginObj.tip !== ''){
      Toast.show(nextProps.loginObj.tip,{
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
      })
    }

    if(nextProps.loginObj.login){
      this.props.navigation.navigate('Main')
    }
  }

  //登录
  login= async ()=>{
    let { username, password} = this.state;

    // if(nameError !== ''){
    //   Toast.show(nameError,{
    //     duration: Toast.durations.SHORT,
    //     position: Toast.positions.CENTER
    //   })
    //   return;
    // }

    // if(passError !== ''){
    //   Toast.show(passError,{
    //     duration: Toast.durations.SHORT,
    //     position: Toast.positions.CENTER
    //   })
    //   return;
    // }
    // const chat = YCChat.getInstance();
    // console.log('username:' + username);
    // console.log('password:' + password);
    // const result = await chat.validator.login(username, password);
    // console.log(result);
    // console.log('END');

    this.props.login({
      username,
      password
    })
  }

  render(){
    Styles = getStyle();
    return(
      <MainView>
        <View style={Styles.LoginContainer}>

            {/*LOGO*/}

            <Image
              style={Styles.tinyLogo}
              source={require('../images/logo.png')}
            />
            <View style={Styles.LoginForm}>
              {/*用户名输入*/}

              <Input
                ref={input}
                containerStyle={ Styles.LoginInput}
                inputContainerStyle={ Styles.inputContainerStyle }
                placeholder='请输入账号'
                leftIcon={
                  <FontAwesome
                    name='user'
                    size={24}
                    color='#999999'
                  />
                }
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.nameError}
                leftIconContainerStyle={{marginRight: 10}}
                value={this.state.username}
                onChangeText={(text)=>{
                  this.setState({
                    username: text
                  },()=>{
                    if(!this.state.username){
                      this.setState({
                        nameError: msg.nameError
                      })
                    }else{
                      this.setState({
                        nameError: ''
                      })
                    }
                  })
                }}
              >
              </Input>

              {/*密码输入框*/}

              <Input
                containerStyle={ Styles.LoginPassword }
                inputContainerStyle={ Styles.inputContainerStyle }
                secureTextEntry={true}
                placeholder='请输入密码'
                leftIcon={
                  <FontAwesome
                    name='lock'
                    size={24}
                    color='#999999'
                  />
                }
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.passError}
                leftIconContainerStyle={{marginRight: 10}}

                value={this.state.password}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  },()=>{
                    if(!this.state.password){
                      this.setState({
                        passError: msg.passError
                      })
                    }else{
                      this.setState({
                        passError: ''
                      })
                    }
                  })
                }}

              >
              </Input>

              {/*登录按钮*/}

              <Button
                title={"登录"}
                titleStyle={{
                  fontSize: 16
                }}
                buttonStyle={Styles.LoginButton}
                loading={this.props.loginObj.loading}
                onPress={this.login}
                disabled={this.state.username === '' || this.state.password === ''}
              >

              </Button>
            </View>

            {/*跳转到注册*/}
            <View style={Styles.bottomButton}>
              <TouchableOpacity
                onPress={ ()=>{
                  this.props.navigation.navigate('RegisterView');
                }}
                style={Styles.register}>
                <Text style={ Styles.gray}>免费注册</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={ ()=>{
                  console.log('choose line');
                }}
                style={Styles.register}>
                <Text style={ Styles.gray}>选择线路</Text>
              </TouchableOpacity>
            </View>
          </View>
      </MainView>
    )
  }
}

const mapState = state => ({
  loginObj: state.UserReducer.get('loginObj').toJS(),
})

const mapDispatch = dispatch => ({
  login(param) {
    dispatch(login(param))
  }
})

export default connect(
  mapState,
  mapDispatch
)(LoginView)

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
import {login, reset} from '../Service/action'
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from "react-native-root-toast";
import {encrypt} from '../Util/Tool'
import { ListItem } from 'react-native-elements/dist/list/ListItem';

let Styles = {};
const input = React.createRef();

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

  componentDidMount() {
    this.props.reset()
  }

  //登录
  login= ()=>{
    let { username, password} = this.state;
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
                leftIconContainerStyle={{marginRight: 10}}
                value={this.state.username}
                onChangeText={(text)=>{
                  this.setState({
                    username: text
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
                leftIconContainerStyle={{marginRight: 10}}

                value={this.state.password}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
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
  },
  reset(param) {
    dispatch(reset(param))
  }
})

export default connect(
  mapState,
  mapDispatch
)(LoginView)

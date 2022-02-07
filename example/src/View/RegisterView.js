/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: APP 登录页
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Text, View, ScrollView} from "react-native";
import MainView from '../components/MainView'
import getStyle from './Style/RegisterViewStyle'
import {connect} from "react-redux";
import {register, uploadImage} from '../Service/action'
import LinearGradient from 'react-native-linear-gradient';
import { Button, Input, Header, ListItem, Avatar, CheckBox} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Toast from 'react-native-root-toast';
import ApiUtil from '../Service/ApiUtil'
import {encrypt} from '../Util/Tool';
import { YCChat } from '../observable/lib/chat';


let Styles = {};
const input = React.createRef();
const msg = {
  nameError: "用户名不能为空",
  passError: "密码不能为空"
}

class RegisterView extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      uri: "",
      nickname: "",
      username: "",
      checked: false,
      password: "",
      inviteNo: ''
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.registerObj.tip !== ''){
      Toast.show(nextProps.registerObj.tip,{
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
      })
    }

    if(nextProps.registerObj.register){
      this.props.navigation.navigate('LoginView')
    }
  }

  uploadAvatar=()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(async image => {
      const chat = YCChat.getInstance();
      let filename = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length);
      image.type = image.mime;
      image.name = filename;
      image.webkitRelativePath = image.path;
      image.uri = image.path;
      //const result = await this.props.uploadImage(image)
      const result = await chat.validator.upLoadImageResource({
        image
      });
      this.setState({
        ...this.state,
        uri: result.cont.url
      })
      console.log('回调结果');
      console.log(result.cont.url);
    });
  }

  register= async () => {
    let { username, password, checked, inviteNo, nickname} = this.state;
    this.props.register({
      'account': username,
      'password': password,
      'gender': checked ? 'male' : 'femail',
      'upAcc': inviteNo,
      'nickname': nickname
    })

  }

  render(){
    Styles = getStyle();
    return(
      <MainView>
        <Header
            placement="left"
            leftComponent={
              <FontAwesome onPress={
                () => {this.props.navigation.navigate('LoginView')}
              } name={'angle-left'} size={20}></FontAwesome>
            }
            centerComponent={
              { text: '注册', style: { color: '#000'}}
            }
            placement="center"
            containerStyle={{
              backgroundColor: 'white',
              justifyContent: 'space-around',
              paddingRight: 30,
              height: 60,
              marginTop: 24,
            }}
          />
        <ScrollView style={Styles.RegisterContainer}>
          
          <View style={Styles.RegisterForm}>

            <ListItem style={Styles.uploadAvatar}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title style={Styles.Title}>
                  <Text>上传头像</Text>
                </ListItem.Title>
              </ListItem.Content>
              <Avatar source={this.state} 
                onPress={this.uploadAvatar}
                size="large"
                rounded />
              <FontAwesome onPress={
                this.uploadAvatar
              } name={'angle-right'} size={20}></FontAwesome>
            </ListItem>

            <ListItem containerStyle={Styles.genderBox}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title style={Styles.Title}>
                  <Text>性别</Text>
                </ListItem.Title>
              </ListItem.Content>
              <CheckBox
                containerStyle={Styles.gender}
                title='男'
                checkedIcon={ <MaterialCommunityIcons name='face' size={ 15 } color='rgb(2, 147, 254)'/> }
                uncheckedIcon={ <MaterialCommunityIcons name='face' size={ 15 } color='rgb(154, 154, 154)'/> }
                checked={ this.state.checked }
                onPress={() => this.setState({checked: !this.state.checked})}
              />
              <CheckBox
                containerStyle={Styles.gender}
                title='女'
                checkedIcon={ <MaterialCommunityIcons name='face-woman' size={ 15 } color='rgb(2, 147, 254)'/> }
                uncheckedIcon={ <MaterialCommunityIcons name='face-woman' size={ 15 } color='rgb(154, 154, 154)'/> }
                checked={ !this.state.checked }
                onPress={ () => this.setState({checked: !this.state.checked}) }
              />
            </ListItem>
            {/*用户名*/}

            <Input
              ref={input}
              placeholder='请设置您的昵称'
              label="昵称"
              containerStyle={Styles.containerStyle}
              inputContainerStyle={Styles.inputContainerStyle}
              labelStyle={Styles.inputLabel}
              inputStyle={Styles.input}
              value={this.state.nickname}
              onChangeText={(text)=>{
                this.setState({
                  nickname: text
                })
              }}
            >
            </Input>

            {/*密码*/}

            <Input
              placeholder='5-17位字母或数字'
              label="登录账号"
              containerStyle={Styles.containerStyle}
              inputContainerStyle={Styles.inputContainerStyle}
              labelStyle={Styles.inputLabel}
              inputStyle={Styles.input}
              value={this.state.username}
              onChangeText={(text)=>{
                this.setState({
                  username: text
                })
              }}
            >
            </Input>

            {/*密码确认*/}

            <Input
              secureTextEntry={true}
              placeholder='5-17位字母或数字'
              label="登录密码"
              containerStyle={Styles.containerStyle}
              inputContainerStyle={Styles.inputContainerStyle}
              labelStyle={Styles.inputLabel}
              inputStyle={Styles.input}
              value={this.state.password}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            >
            </Input>

            {/* 邀请码 */}
            <Input
              placeholder='请输入邀请人账号'
              label="邀请码"
              containerStyle={Styles.containerStyle}
              inputContainerStyle={Styles.lastInputContainerStyle}
              labelStyle={Styles.inputLabel}
              inputStyle={Styles.input}
              value={this.state.inviteNo}
              onChangeText={(text)=>{
                this.setState({
                  inviteNo: text
                })
              }}
            >
            </Input>
          </View>
          <Button
            title={"注册"}
            buttonStyle={Styles.RegisterButton}
            onPress={this.register}
            loading={this.props.loading}
            disabled={this.state.username === '' || this.state.password === ''}
          ></Button>
        </ScrollView>
      </MainView>
    )
  }
}

const mapState = state => ({
  registerObj: state.UserReducer.get('registerObj').toJS(),
})

const mapDispatch = dispatch => ({
  register(param) {
    dispatch(register(param))
  },
  uploadImage(param) {
    dispatch(uploadImage(param))
  }
})

export default connect(
  mapState,
  mapDispatch
)(RegisterView)

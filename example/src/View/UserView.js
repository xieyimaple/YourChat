/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 用户详情页
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Header, ListItem, Avatar} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MainView from '../components/MainView'
import {TouchableOpacity} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from "react-redux";
import config from '../Config'
let RNFS = require('react-native-fs');
import {UpdateUser} from '../Redux/actionCreators'
import ApiUtil from '../Service/ApiUtil'
import Toast from "react-native-root-toast";
import { YCChat } from '../observable/lib/chat';

class UserView extends React.Component{
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const user = this.props.user;
  }

  uploadAvatar=()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(async image => {
      console.log(image);
      const result = await this.uploadImage(image.path)
      const filename = JSON.parse(result.body).filename
      const userId = this.props.user.id
      ApiUtil.request('changeAvatar',{
        userId,
        'avatar': filename
      }).then((result)=>{
        if(result.data.errno === 0){
          Toast.show(result.data.msg,{
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER
          })
          this.props.updateUser({
            'key': 'avatar',
            'value': filename
          })
        }
      })
    });
  }

  uploadImage= async (mediaPath) => {
    let uploadUrl = config.baseURL + '/api/upload/uploadImage'

    let uploadBegin = (response) => {
      let jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    let uploadProgress = (response) => {
      let percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    let files = [
      {
        name: 'test1',
        filename: 'test1.w4a',
        filepath: mediaPath,
        filetype: 'audio/x-m4a'
      }
    ];

    return await RNFS.uploadFiles({
      toUrl: uploadUrl,
      files: files,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      fields: {
        'hello': 'world',
      },
      begin: uploadBegin,
      progress: uploadProgress
    }).promise
  }


  render(){
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
          centerComponent={{ text: '个人信息', style: { color: 'black', fontSize: 16 } }}
          containerStyle={{
            backgroundColor: 'white',
            justifyContent: 'space-around',
            paddingRight: 30,
            height: 60,
            marginTop: 24,
          }}
        />

        
        <ListItem
          bottomDivider
          chevron
          onPress={this.uploadAvatar}
        >
          <ListItem.Content>
            <ListItem.Title>
              头像
            </ListItem.Title>
          </ListItem.Content>
          <Avatar size={'large'}
            source={{
              uri: this.props.user._photoUrl
            }}
          />
        </ListItem>
        <ListItem bottomDivider
          chevron
          onPress={()=>{
            this.props.navigation.navigate('ChangeName')
          }}
        >
          <ListItem.Content>
            <ListItem.Title>
              昵称
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title>
              {this.props.user._nickname || ''}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          bottomDivider
          chevron
        >
          <ListItem.Content>
            <ListItem.Title>
              账号
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title>
            {this.props.user._name || ''}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          bottomDivider
          chevron
        >
          <ListItem.Content>
            <ListItem.Title>
              性别
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title>
            {this.props.user.sex || '男'}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {/* <ListItem bottomDivider
          chevron
          onPress={()=>{
            this.props.navigation.navigate('UserMoreView');
          }}
        >
          <ListItem.Content>
            <ListItem.Title>
            更多
            </ListItem.Title>
          </ListItem.Content>
        </ListItem> */}
      </MainView>
    )
  }

}
const chat = YCChat.getInstance();

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
)(UserView)


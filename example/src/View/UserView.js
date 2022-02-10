/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 用户详情页
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Header, ListItem, Avatar, Text} from "react-native-elements";
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

let Styles = {
  listItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
}

class UserView extends React.Component{
  constructor(props) {
    super(props);
    console.log(this.props.user);
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
      const chat = YCChat.getInstance();
      let filename = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length);
      image.type = image.mime;
      image.name = filename;
      image.webkitRelativePath = image.path;
      image.uri = image.path;
      //const result = await this.props.uploadImage(image)
      const uploadResult = await chat.validator.upLoadImageResource({
        image
      });
      this.props.user._photoUrl = uploadResult.cont.url;
      let result = await chat.currentUser.updateSelfInfo(2,this.props.user._photoUrl);
      console.log(result);
      Toast.show('修改成功',{
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
      });
    });
  }

  render(){
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
          centerComponent={{ text: '个人信息', style: { color: 'black', fontSize: 16 } }}
          containerStyle={{
            backgroundColor: 'white',
            justifyContent: 'space-around',
            paddingRight: 30,
            height: 60,
            marginTop: 24,
          }}
        />

        
        <ListItem containerStyle={Styles.listItem}
          bottomDivider
          chevron
          onPress={this.uploadAvatar}
        >
          <ListItem.Title>
            头像
          </ListItem.Title>
          <Avatar size={'large'}
            rounded
            source={{
              uri: this.props.user._photoUrl
            }}
          />
        </ListItem>
        <ListItem containerStyle={Styles.listItem}
          bottomDivider
          chevron
          onPress={()=>{
            this.props.navigation.navigate('ChangeName')
          }}
        >
          <ListItem.Title>
            昵称
          </ListItem.Title>
          <Text>
            {this.props.user._nickname || ''}
          </Text>
        </ListItem>
        <ListItem containerStyle={Styles.listItem}
          bottomDivider
          chevron
        >
          <ListItem.Title>
            账号
          </ListItem.Title>
          <Text>
            {this.props.user._name || ''}
          </Text>
        </ListItem>
        <ListItem containerStyle={Styles.listItem}
          bottomDivider
          chevron
        >
          <ListItem.Title>
            性别
          </ListItem.Title>
          <Text>
          {this.props.user.sex || '男'}
          </Text>
        </ListItem>
        {/* <ListItem bottomDivider
          chevron
          onPress={()=>{
            this.props.navigation.navigate('UserMoreView');
          }}
        >
          <ListItem.Title>
          更多
          </ListItem.Title>
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


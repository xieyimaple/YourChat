/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 用户详情页
* 修改人:
* 修改时间:
* 修改内容:
* */
import React from 'react'
import {View, Text, TouchableOpacity, Alert, Dimensions} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import {Header, ListItem, Button, Avatar, Input} from "react-native-elements";
import MainView from '../components/MainView'
import config from '../Config'
import ApiUtil from '../Service/ApiUtil'
import {connect} from "react-redux";
import Toast from "react-native-root-toast";
import ActionSheet from 'react-native-actionsheet'
import {DeleteTalkList, AddTalkList} from '../Redux/actionCreators'
import {sort} from '../Util/Tool'
import { YCChat } from '../observable/lib/chat';

const width = Dimensions.get('window').width;

const chat = YCChat.getInstance();

class UserDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      user: this.props.navigation.getParam('user'),
      isFriend: false,
      sendMsg: '',
    }
  }

  UNSAFE_componentWillMount() {
    console.log('userdetail');
    console.log(this.props.friendList);
    this.props.friendList.some((item, index)=>{
      if(item.nickname === this.state.user.nickname){
        this.setState({
          isFriend: true
        })
      }
    })
  }

  componentDidMount() {

  }

  deleteFriend= async () => {

      ApiUtil.request('deleteFriend', {
        'selfId': this.props.self.id,
        'friendId': this.state.user._id
      }, true).then((result)=>{
        if(result.data.errno === 0){

          this.props.deleteFriend({'username': this.state.user.username})

          Toast.show(result.data.msg,{
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER
          })

          this.props.navigation.navigate('Mail')
        }
      })
  }

  goChat=()=>{
    const {username, _id} = this.state.user
    const {id} = this.props.self
    const roomId = sort(id, _id)
    const data = {...this.state.user, roomId}
    this.props.addTalkList(data)
    this.props.navigation.navigate('ChatView',{'friendName': username, 'friendId': _id});
  }

  addFriend = async () => {

    const self = this.props.self;
    const user = this.state.user;
    const sendMsg = this.state.sendMsg;
    console.log(sendMsg);
    try{
      const result = await chat.currentUser.addFriend(user.uuid,sendMsg);
      console.log(result);
      Toast.show(result.data.msg, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
      })
    }catch {
      Toast.show('添加好友异常', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
      })
    }
  }

  render(){
    const user = this.state.user;
    return(
      <MainView>

        {/*头部*/}
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
          centerComponent={
            { text: '添加好友', style: { color: '#000',marginTop: 5, textAlign:'center'}}
          }
          containerStyle={{
            backgroundColor: 'rgb(238, 238, 238)',
            justifyContent: 'space-around',
            paddingRight: 30,
            height: 60,
            marginTop: 24,
          }}
          rightComponent={
            <TouchableOpacity onPress={()=>{
              this.ActionSheet.show()
            }}>
              <Entypo name={'dots-three-horizontal'} size={24} color={'black'}
              >
              </Entypo>
            </TouchableOpacity>
          }
        />

        {/**/}
        <ListItem
          containerStyle={{paddingVertical: 30, paddingHorizontal: 30}}
          onPress={()=>{
            this.props.navigation.navigate('UserView');
          }}
          bottomDivider
        >
          <Avatar
            size={'medium'}
            source={{
              uri: user.portraitUri
            }}
          />
          <ListItem.Title>
          {user.nickname}
          </ListItem.Title>
          <ListItem.Subtitle>
          {user.lastLoginZone}
          </ListItem.Subtitle>
        </ListItem>
        {
          this.state.isFriend?
            <Button
              title="发消息"
              titleStyle={{color:'white'}}
              containerStyle={{width: '80%',marginLeft: '10%',marginTop: 20}}
              onPress={this.goChat}
            />
            :
            <View>
              <ListItem containerStyle={{backgroundColor: '#ededed'}}>
                <Text>申请留言</Text>
              </ListItem>
              <ListItem containerStyle={{flexDirection:'column'}}>
                <Input
                  label=""
                  containerStyle={{}}
                  inputContainerStyle={{borderBottomWidth: 0}}
                  labelStyle={{}}
                  inputStyle={{}}
                  value={this.state.sendMsg}
                  onChangeText={(text)=>{
                    this.setState({
                      sendMsg: text
                    })
                  }}
                >
              </Input>
              
              </ListItem>
              <Button
                title="提交申请"
                containerStyle={{width: '80%',marginLeft: '10%',marginTop: 20}}
                titleStyle={{color:'white'}}
                onPress={this.addFriend}
              />
            </View>
            
            
        }

        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={['删除', '取消']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={(index) => {
            if(index === 0){
              Alert.alert(
                '删除联系人',
                '将删除联系人',
                [
                  {text: '取消', onPress: () => {}},
                  {text: '删除', onPress: () => this.deleteFriend()},
                ])
            }
          }}
        />
      </MainView>
    )
  }

}

const mapState = state => ({
  self: state.UserReducer.get('user').toJS(),
  friendList: state.UserReducer.get('friendList').toJS()
})

const mapDispatch = dispatch => ({
  deleteFriend(param){
    dispatch(DeleteTalkList(param))
  },
  addTalkList(param){
    dispatch(AddTalkList(param))
  }
})


export default connect(
  mapState,
  mapDispatch
)(UserDetail)


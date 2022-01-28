/*
* 文件名: Home.js
* 作者: liushun
* 描述: 微信聊天页
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import MainView from '../components/MainView'
import {Header, ListItem, Button, Badge, Avatar} from "react-native-elements";
import {Text, TouchableOpacity, View, TouchableWithoutFeedback, FlatList} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropMenu from '../components/DropMenu'
import ApiUtil from '../Service/ApiUtil'
import {getFriendList, getGroupList} from "../Service/action";
import {connect} from "react-redux";
import { DeleteTalkList} from "../Redux/actionCreators";
import Toast from "react-native-root-toast";
import config from '../Config'
import {sort} from '../Util/Tool'
import { YCChat } from '../observable/lib/chat';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      show: false,
    }
  }

  UNSAFE_componentWillMount() {
    const user = this.props.user;
    // const loginObj = this.props.loginObj;
    // if(loginObj.login){
    //   global.io.emit('login', user, (mes)=>{
    //     Toast.show(mes,{
    //       duration: Toast.durations.SHORT,
    //       position: Toast.positions.TOP
    //     })
    //   })
    // }else{
    //   this.props.navigation.navigate('LoginView');
    // }
  }

  componentDidMount() {
    const user = this.props.user;
    this.props.getFriendList();
    this.props.getGroupList();
  }


  goChat=(item)=>{
    if(this.state.show){
      this.setState({
        show: false,
      })
      return;
    }
    this.props.navigation.navigate('ChatView', {'friendName':item.username, 'friendId':item._id});
  }

  goAction= async (item) => {

    const roomId = sort(this.props.user.id, item._id)

    const result = await ApiUtil.request('deleteMessageHistory', roomId, true)

    if(result.data.errno === 0){
      this.props.deleteTalk(item);
    }else{

    }

  }

  addFriend=()=>{
    this.setState({
      show: false,
    })
    this.props.navigation.navigate('AddFriend');
  }

  createGroup=()=>{
    this.setState({
      show: false,
    })
    this.props.navigation.navigate('CreateGroup');
  }

  keyExtractor = (item, index) => item._id.toString()

  renderItem = ({ item }) => {
    return(
      <TouchableOpacity
        onPress={()=>this.goChat(item)}
        onLongPress={()=>this.goAction(item)}
      >
        <ListItem bottomDivider>
          <View>
            <Avatar
              round={false}
              source={{
                uri: item.avator
                //uri: config.baseURL +'/'+ item.avatar
              }}
            />
            {item.unReadMsg > 0?
              <Badge value={item.unReadMsg} status="error" containerStyle={{ position: 'absolute', top: -15, right: -15}}></Badge>
              :
              null
            }
          </View>
          <ListItem.Content>
            <ListItem.Title>
              {item.username}
            </ListItem.Title>
            <ListItem.Subtitle>
              {item.lastMsg && item.lastMsg.text}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <MainView>
        {/*头部*/}
        <TouchableWithoutFeedback
          onPress={()=>{
            if(this.state.show){
              this.setState({
                show: false
              })
            }
          }}
        >
          <Header
            placement="left"
            leftComponent={
              <Text style={{fontSize: 16}}>近友</Text>
            }
            rightComponent={
              <View style={{flexDirection: 'row'}}>
                <View style={{width: 10}}>
                </View>
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    show: !this.state.show
                  })
                }}>
                  <Ionicons name={'ios-add-circle-outline'} size={24} color={'#44a0df'}/>
                </TouchableOpacity>
              </View>
            }
            containerStyle={{
              backgroundColor: 'white',
              justifyContent: 'space-around',
              paddingRight: 30,
              height: 60,
              marginTop: 24,
            }}
          />
        </TouchableWithoutFeedback>


        {/*最近聊天列表*/}


        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.props.talkList}
          renderItem={this.renderItem}
          onScroll={()=>{
            if(this.state.show){
              this.setState({
                show: false,
              })
            }
          }}
          >

        </FlatList>

        {/*弹窗*/}

        {this.state.show?
          <DropMenu
            style={{position:'absolute', right:20, top: 85}}
            navigation={this.props.navigation}
            addFriend={this.addFriend}
            createGroup={this.createGroup}
            createGroup={this.createGroup}
          >

          </DropMenu>:null}
      </MainView>
    );
  }
}

const chat = YCChat.getInstance();

const mapState = state => ({
  user: chat.currentUser,
  //loginObj: state.UserReducer.get('loginObj').toJS(),
  //talkList: state.UserReducer.get('talkList').toJS()
  talkList: [{
    _id: 123123,
    username: 'xxx',
    avator: 'https://img0.baidu.com/it/u=4117713405,2961605581&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
    lastMsg: {
      text: '你可真臭'
    },
    unReadMsg: 22
  },
  {
    _id: 123124,
    username: 'xxxx',
    avator: 'https://img2.baidu.com/it/u=3886895525,3764775842&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    lastMsg: {
      text: 'woshinibaba'
    },
    unReadMsg: 1
  },{
    _id: 123125,
    username: 'xxxxx',
    avator: 'https://img2.baidu.com/it/u=2955499920,3807435344&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
    lastMsg: {
      text: 'woshichoudidi'
    },
    unReadMsg: 5
  }]
})

const mapDispatch = dispatch => ({
  init(param){
    dispatch()
  },
  getFriendList(param) {
    dispatch(getFriendList(param))
  },
  getGroupList(param) {
    dispatch(getGroupList(param))
  },
  deleteTalk(obj){
    dispatch(DeleteTalkList(obj))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Home)


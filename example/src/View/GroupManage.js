/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 群管理页
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Header, ListItem, Text, Switch, Button, Avatar} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MainView from '../components/MainView'
import {TouchableOpacity, View, Image} from 'react-native'
import {connect} from "react-redux";
import {UpdateUser} from '../Redux/actionCreators'
import getStyle from './Style/GroupManageStyle'
import Toast from "react-native-root-toast";

import { YCChat } from '../observable/lib/chat';

const chat = YCChat.getInstance();
let Styles = {};


class GroupManage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      //allowNotice: true
      _group: this.props.navigation.state.params,
      members: []
    }
  }

  componentDidMount() {
    this.getMembers()
  }

  getMembers = async () => {
    let result = await chat.currentUser.showMember(this.state._group._id, 1 , this.state._group._memberCount);
    let members = result.cont;
    if(result.status){
      this.setState({
        ...this.state,
        members
      })
    }
  }

  // setAllowNotice = allowNotice => {
  //   this.setState({ allowNotice });
  //   console.log(this.state.allowNotice);
  // };

  delete = async () => {
    let result = await chat.currentUser.quitGroupChat(this.state._group._id);
    console.log(result);
    if(result.status){

    }else{
      Toast.show(result.msg,{
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
      })
    }
  }

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
              <FontAwesome name={'angle-left'} size={24} color={'white'}
              >
              </FontAwesome>
            </TouchableOpacity>
          }
          centerComponent={{ text: '群组信息', style: { color: 'white', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />

        {/* <ListItem containerStyle={Styles.listItem}>
          <ListItem.Title style={Styles.textBox}>
            <Text>消息免打扰</Text>
          </ListItem.Title>
          <Switch value={this.state.allowNotice} onValueChange={this.setAllowNotice} />
        </ListItem>
        <ListItem containerStyle={Styles.listItem}>
          <ListItem.Title style={Styles.textBox}>
            <Text>会话置顶</Text>
          </ListItem.Title>
          <Switch value={this.state.allowNotice} onValueChange={this.setAllowNotice} />
        </ListItem> */}

        <View style={Styles.allmember}>
          {this.state.members.map((item, i) => (
            <ListItem key={i}
                      containerStyle={{flexDirection: 'column',width: 100}}
                      onPress={() => {
                        console.log(item.name)
                      }}>
              <Avatar
                activeOpacity={0.2}
                containerStyle={{ backgroundColor: "#BDBDBD", marginBottom: 10 }}
                size="small"
                source={{ uri: item.portraitUri }}
              />
              <ListItem.Content style={Styles.singleMember}>
                <ListItem.Title>
                  <Text style={{width: '100%', fontSize: 12}}>{item.name}</Text>
                </ListItem.Title>
              </ListItem.Content> 
            </ListItem>
          ))}
          {
            this.state._group._creatorId === this.props.user._id ?
            <ListItem containerStyle={{flexDirection: 'column',width: 100}}
              onPress={()=>{
                this.props.navigation.navigate('AddMembers', { members: this.state.members, groupId: this.state._group._id, callback: () => {this.getMembers()} });
              }}>
              <Avatar
                activeOpacity={0.2}
                containerStyle={{ backgroundColor: "#BDBDBD", marginBottom: 10 }}
                size="small"
                ImageComponent={() => (
                  <Image
                    style={{width:33,height:34.6}}
                    source={require('../images/add.png')}
                  />
                )}
              />
            </ListItem> : null
          }
          {
            this.state._group._creatorId === this.props.user._id ?
            <ListItem containerStyle={{flexDirection: 'column',width: 100}}
              onPress={()=>{
                this.props.navigation.navigate('RemoveMembers', { members: this.state.members, groupId: this.state._group._id, callback: () => {this.getMembers()} });
              }}>
              <Avatar
                activeOpacity={0.2}
                containerStyle={{ backgroundColor: "#BDBDBD", marginBottom: 10 }}
                size="small"
                ImageComponent={() => (
                  <Image
                    style={{width:33,height:34.6}}
                    source={require('../images/delete.png')}
                  />
                )}
              />
            </ListItem> : null
          }
        </View>
        <ListItem containerStyle={Styles.listItem}>
          <ListItem.Title>
            <Text>全部群成员（{this.state._group._memberCount}）</Text>
          </ListItem.Title>
        </ListItem>
        <ListItem containerStyle={Styles.resetPsw}
                  onPress={() => {
                    console.log('群头像');
                  }}>
          <ListItem.Title>
            <Text>群头像</Text>
          </ListItem.Title>
          <Avatar
            activeOpacity={0.2}
            avatarStyle={{}}
            containerStyle={{ backgroundColor: "#BDBDBD",marginLeft: '75%' }}
            icon={{}}
            iconStyle={{}}
            imageProps={{}}
            overlayContainerStyle={{}}
            placeholderStyle={{}}
            size="small"
            source={{ uri: this.state._group._portraitUri }}
          />
        </ListItem>
        <ListItem containerStyle={Styles.listItem}
                  onPress={() => {
                    console.log('群名称');
                  }}>
          <ListItem.Title>
            <Text>群名称</Text>
          </ListItem.Title>
          <Text>{this.state._group._name}</Text>
        </ListItem>
        <ListItem containerStyle={Styles.listItem}
                  onPress={() => {
                    this.props.navigation.navigate('UpdateGroupNotice', { groupId: this.state._group._id });
                  }}>
          <ListItem.Title>
            <Text>群公告</Text>
          </ListItem.Title>
        </ListItem>
        {
          this.state._group._creatorId === this.props.user._id ? 
          <ListItem containerStyle={Styles.listItem}
                    onPress={() => {
                      this.props.navigation.navigate('GroupManageSelf', { groupId: this.state._group._id });
                    }}>
            <ListItem.Title>
              <Text>群管理</Text>
            </ListItem.Title>
          </ListItem> : null
        }
        
        
        <ListItem containerStyle={Styles.resetPsw}
                  onPress={() => {
                    console.log('清除聊天记录');
                  }}>
          <ListItem.Title>
            <Text>清除聊天记录</Text>
          </ListItem.Title>
        </ListItem>

        <Button
          title="删除并退出"
          buttonStyle={{backgroundColor: '#ef434f'}}
          containerStyle={{width: '80%',marginLeft: '10%',marginTop: 20}}
          titleStyle={{color:'white'}}
          onPress={this.delete}
        />

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
)(GroupManage)


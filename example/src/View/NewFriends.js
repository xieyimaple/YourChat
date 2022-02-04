/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 新的好友页
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Header, ListItem, Text, Button, Avatar} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MainView from '../components/MainView'
import {TouchableOpacity, View} from 'react-native'
import {connect} from "react-redux";
import {UpdateUser} from '../Redux/actionCreators'
import getStyle from './Style/NewFriendsStyle'
import { YCChat } from '../observable/lib/chat';

const chat = YCChat.getInstance();
let Styles = {};


class NewFriends extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      cont:[
        {
          uuid:"7df2b4b38bd943e38325a26af7d21990",
          nickname:"明年",
          portraitUri:"http://api.new689collection88.com/png/2022/01/07/692a995ca1e64a6f92bc8eb516e5d9e4.png",
          msgst:20,
          createTime:"2022-01-21 00:00:30",
          friendUuid:"daaebm128bce16ec4f4e909c57dce04da10ed6"
        },{
          uuid:"20140f7a61de4cb1a25f910b1163524f",
          nickname:"阶扬皆患",
          portraitUri:"http://2020xl-apk.oss-accelerate.aliyuncs.com/1598348077543-18787.jpg",
          message:"dasdas",
          msgst:20,
          createTime:"2022-01-21 00:04:57",
          friendUuid:"daaebmdab2871e87d5432a9f061dcaaa194f97"
        },{
          uuid:"de18ada61e5d4bc8bfc8e48995192808",
          nickname:"奥术大师",
          portraitUri:"http://2020xl-apk.oss-accelerate.aliyuncs.com/1598348077543-18787.jpg",
          message:"hello",
          msgst:20,
          createTime:"2022-01-23 01:53:43",
          friendUuid:"daaebm94f91d182c484b5abf49afc8b1a40ba6"
        },{
          uuid:"7258c95ef99d4aaabc63ee8de0421540",
          nickname:"奥术大师2",
          portraitUri:"http://2020xl-apk.oss-accelerate.aliyuncs.com/1598348077543-18787.jpg",
          message:"你好你好",
          msgst:11,
          createTime:"2022-02-02 22:44:14",
          friendUuid:"daaebm1fd98d475061405f84c1f8c44d03d291"
        }
      ]
    }
  }

  apply = (id) => {
    console.log('apply' + id);
  }

  reject = (id) => {
    console.log('reject' + id);
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
              <FontAwesome name={'angle-left'} size={24} color={'black'}
              >
              </FontAwesome>
            </TouchableOpacity>
          }
          centerComponent={{ text: '新的朋友', style: { color: 'black', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />


        { 
          this.state.cont.map((item, i) => (
            <ListItem bottomDivider key={i} containerStyle={Styles.listItem}>
              <ListItem.Title style={Styles.textBox}>
                <Avatar
                  round={false}
                  source={{
                    uri: item.portraitUri
                  }}
                />
                <View>
                  <Text style={{marginLeft: 10}}>{item.nickname}</Text>
                  <Text style={{
                    marginLeft: 10,
                    color: '#999',
                    fontSize: 12
                  }}>{item.message || ''}</Text>
                </View>
              </ListItem.Title>
              {item.msgst === 11 ? 
              <View style={Styles.buttons}>
                <Button
                  title={"通过"}
                  titleStyle={{
                    fontSize: 16
                  }}
                  buttonStyle={Styles.applyButton}
                  onPress={ () => this.apply(item.uuid)}
                ></Button>
                <Button
                  title={"拒绝"}
                  titleStyle={{
                    fontSize: 16
                  }}
                  buttonStyle={Styles.applyButton}
                  onPress={ () => this.reject(item.uuid)}
                ></Button>
              </View> : item.msgst === 20 ? 
              <View style={Styles.buttons}>
                <Button
                  title={"已添加"}
                  titleStyle={{
                    fontSize: 16
                  }}
                  disabled
                  disabledStyle={{}}
                ></Button>
              </View> : null
              }
              
            </ListItem>
          ))}
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
)(NewFriends)


/*
* 文件名: Find.js
* 作者: liushun
* 描述: 发现页
* 修改人:
* 修改时间:
* 修改内容:
* */
import React, { useState } from 'react';
import MainView from '../components/MainView'
import getStyle from './Style/FindStyle';
import {TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Header, ListItem, Text, Avatar} from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';

import DropMenu from "../components/DropMenu";
import {connect} from "react-redux";
import { YCChat } from '../observable/lib/chat';
import Toast from 'react-native-root-toast';

let Styles = {};
class Find extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      show: false,
      findList: []
    }
  }

  async componentDidMount() {
    Toast.show('请稍候...',{
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER
    })
    const chat = YCChat.getInstance();
    let result = await chat.currentUser.getFindList();
    let findList = result.findList.linksetVOS;
    if(result.status){
      this.setState({
        findList
      })
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

  goSingleFind(item) {
    this.props.navigation.navigate('SingleFind', {singleFindData: item});
  }

  render() {
    Styles = getStyle();
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
          <View>
            <Header
              placement="left"
              leftComponent={
                <Text style={{fontSize: 16}}>发现</Text>
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
            {this.state.findList.map((item, i) => (
              <ListItem key={item.applinkaddress}
                        onPress={() => {
                          this.goSingleFind(item)
                        }}>
                <Avatar
                  activeOpacity={0.2}
                  containerStyle={{ backgroundColor: "#BDBDBD",marginLeft: 10 }}
                  size="small"
                  source={{ uri: item.linkIcon }}
                />
                <ListItem.Content style={Styles.singleFind}>
                  <ListItem.Title>
                    <Text>{item.linkname}</Text>
                  </ListItem.Title>
                  <AntDesign name='right' size={16} />
                </ListItem.Content> 
              </ListItem>
            ))}
          </View>
        </TouchableWithoutFeedback>
        {/*弹窗*/}
        {this.state.show?
          <DropMenu
            style={{position:'absolute', right:20, top: 85}}
            navigation={this.props.navigation}
            addFriend={this.addFriend}
            createGroup={this.createGroup}
          >

          </DropMenu>:null}
      </MainView>
    );
  }
}

const mapState = state => ({
  user: state.UserReducer.get('user'),
})

const mapDispatch = dispatch => ({

})

export default connect(
  mapState,
  mapDispatch
)(Find)

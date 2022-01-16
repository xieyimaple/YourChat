/*
* 文件名: Find.js
* 作者: liushun
* 描述: 我的页面
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react'
import MainView from '../components/MainView'
import getStyle from './Style/MeStyle';
import { ListItem, Avatar, Text } from 'react-native-elements'
import Feather from "react-native-vector-icons/Feather";
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import config from '../Config'
import AntDesign from 'react-native-vector-icons/AntDesign';

let Styles = {};

class Me extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    Styles = getStyle();
    return (
      <MainView>
        <ListItem style={Styles.userContainer}>
          <Avatar
            activeOpacity={0.2}
            avatarStyle={{}}
            containerStyle={{ backgroundColor: "#BDBDBD",marginTop: 50 }}
            onPress={() => alert("onPress")}
            rounded
            size="large"
            source={{ uri: this.props.user.avator }}
          />
          <View style={Styles.textBox}>
            <Text style={Styles.username}>{this.props.user.username}</Text>
            <Text style={Styles.notes}>{this.props.user.notes}</Text>
          </View>
          <View style={ Styles.iconRight }>
            <AntDesign name={'right'} size={20} onPress={() => {alert('go to setting')}} />
          </View> 
        </ListItem>


        <ListItem onPress={()=>{
            console.log(1);
            this.props.navigation.navigate('UserView');
          }} containerStyle={Styles.listItemContainer}>
          <AntDesign name='setting' size={12}/>
          <ListItem.Title>
            <Text>账号安全</Text>
          </ListItem.Title>
          <AntDesign style={{marginLeft:'65%'}} name='right' size={12} onPress={() => {alert('go to setting')}} />
        </ListItem>


        <ListItem containerStyle={Styles.version}>
          <AntDesign name='infocirlceo' size={12}/>
          <ListItem.Title>
            <Text>当前版本 0.0.1</Text>
          </ListItem.Title>
        </ListItem>
        {/* <ListItem
          leftAvatar={{ source: { uri: config.baseURL +'/'+ this.props.user.avatar} }}
          title={this.props.user.username}
          subtitle={"微信号: ofdofsjodfjowefiwo"}
          chevron
          containerStyle={{paddingVertical: 30, paddingHorizontal: 30}}
          onPress={()=>{
            this.props.navigation.navigate('UserView');
          }}
        />
        <ListItem
          leftIcon={
            <Feather name={'settings'} size={20} color={'black'}
            >
            </Feather>
          }
          title={"设置"}
          bottomDivider
          chevron
          onPress={()=>{
            this.props.navigation.navigate('SettingView');
          }}
          containerStyle={{marginTop: 10}}
        /> */}
      </MainView>
    );
  }
}



const mapState = state => ({
  //user: state.UserReducer.get('user')
  user : {
    id: '1',
    username: 'aaaa',
    notes: 'casdasd',
    avator: 'https://img0.baidu.com/it/u=1094578575,4095785529&fm=26&fmt=auto'
  }
})

const mapDispatch = dispatch => ({

})

export default connect(
  mapState,
  mapDispatch
)(Me)


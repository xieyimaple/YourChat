/*
* 文件名: Find.js
* 作者: liushun
* 描述: 我的页面
* 修改人:
* 修改时间:
* 修改内容:
* */

import React, {PureComponent} from 'react'
import MainView from '../components/MainView'
import getStyle from './Style/MeStyle';
import { ListItem, Avatar, Text } from 'react-native-elements'
import {View} from "react-native";
import {connect} from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { YCChat } from '../observable/lib/chat';
import { CLIENT } from '../utils/client'
import { scaleSizeH } from '../Util/scaleSize';

let Styles = {};

class Me extends PureComponent {
  constructor(props) {
    super(props);

    this.user = this.props.user;
  }

  render() {
    const Styles = getStyle();
    const { _photoUrl, _name, _nickname } = this.user;

    return (
      <MainView>
        <ListItem style={Styles.userContainer} onPress={()=>{
            this.props.navigation.navigate('UserView');
          }} >
          <Avatar
            activeOpacity={0.2}
            containerStyle={{ marginTop: 50 }}
            rounded
            size="large"
            source={{ uri: _photoUrl }}
          />
          <View style={Styles.textBox}>
            <Text style={Styles.username}>{_name || ''}</Text>
            <Text style={Styles.notes}>{_nickname || ''}</Text>
          </View>
          <View style={ Styles.iconRight }>
            <AntDesign style={{marginLeft:'6%'}} name={'right'} size={20} />
          </View> 
        </ListItem>


        <ListItem onPress={()=>{
            this.props.navigation.navigate('AccountSecurity');
          }} containerStyle={Styles.listItemContainer}>
          <AntDesign name='setting' size={20}/>
          <ListItem.Title>
            <Text>账号安全</Text>
          </ListItem.Title>
          <AntDesign style={{marginLeft:'65%'}} name='right' size={12} />
        </ListItem>


        <ListItem containerStyle={Styles.version}>
          <AntDesign name='infocirlceo' size={20}/>
          <ListItem.Title>
            <Text>当前版本 {CLIENT.appVersion}</Text>
          </ListItem.Title>
        </ListItem>
      </MainView>
    );
  }
}


const chat = YCChat.getInstance();
const mapState = () => ({
  user: chat.currentUser
})

export default connect(
  mapState
)(Me)


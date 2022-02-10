/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 允许通知页
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Header, ListItem, Switch, Text} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MainView from '../components/MainView'
import {TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import {UpdateUser} from '../Redux/actionCreators'
import getStyle from './Style/AllowNoticeStyle'
import Icon from 'react-native-vector-icons/AntDesign';

let Styles = {};


class AllowNotice extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      allowNotice: true
    };
  }

  setAllowNotice = allowNotice => {
    this.setState({ allowNotice });
    console.log(this.state.allowNotice);
  };

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
              <FontAwesome name={'angle-left'} size={24} color={'#44a0df'}
              >
              </FontAwesome>
            </TouchableOpacity>
          }
          centerComponent={{ text: '近友IM', style: { color: 'black', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />

        <ListItem containerStyle={Styles.listItem}>
          <ListItem.Title style={Styles.textBox}>
            <Text>开启应用通知权限</Text>
          </ListItem.Title>
          <Switch value={this.state.allowNotice} onValueChange={this.setAllowNotice} />
        </ListItem>

        
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
)(AllowNotice)


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
import getStyle from './Style/NewFriendsStyle'
import { YCChat } from '../observable/lib/chat';
import Toast from 'react-native-root-toast';

const chat = YCChat.getInstance();
let Styles = {};


class NewFriends extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      cont:[]
    }
  }

  async componentDidMount() {
    Toast.show('请稍候...',{
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER
    })
    let result = await chat.currentUser.applyList();
    let cont = result.cont
    if(result.status){
      this.setState({
        cont
      })
    }
    console.log(this.state.cont)
  }

  apply = async (id) => {
    Toast.show('添加中...',{
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER
    })
    let result = await chat.currentUser.applyDeal(20, id);
    console.log('newfriend添加好友');
    console.log(result);
  }

  reject = async (id) => {
    Toast.show('拒绝中...',{
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER
    })
    let result = await chat.currentUser.applyDeal(21, id);
    console.log('newfriend拒绝好友');
    console.log(result);
  }
  
  render(){
    Styles = getStyle()

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
          centerComponent={{ text: '新的朋友', style: { color: 'black', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />


        { 
          this.state.cont.map((item, i) => (
            (item.msgst === 11 || item.msgst === 20) ? 
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
              
            </ListItem> : null
          ))}
      </MainView>
    )
  }

}

const mapState = state => ({
  user: state.UserReducer.get('user').toJS(),
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(NewFriends)


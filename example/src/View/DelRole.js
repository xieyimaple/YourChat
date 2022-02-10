
/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 新增管理员
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react'
import MainView from '../components/MainView'
import {TouchableOpacity,
  SectionList,
  TouchableWithoutFeedback,
  View,} from 'react-native'
import {Header, ListItem, Button, Avatar, CheckBox} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar, Text } from 'react-native-elements';
import ApiUtil from '../Service/ApiUtil'
import Toast from "react-native-root-toast";
import getStyle from './Style/AddFiendStyle'
import { connect } from 'react-redux';
import Pinyin from '../Util/ChinesePY';
import { YCChat } from '../observable/lib/chat';

const chat = YCChat.getInstance();

let Styles = {}
class DelRole extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groupId: this.props.navigation.state.params.groupId,
      members: [],
      search: ''
    };
  }


  async componentDidMount() {
    let result = await chat.currentUser.getManage(this.state.groupId);
    for(let i=result.cont.length-1;i >= 0;i--){
      if(result.cont[i].uuid === chat.currentUser._id){
        result.cont.splice(i,1);
      }
    }
    this.setState({
      members : result.cont
    })
  }

  componentWillUnmount(){
    console.log('add member unmount');
  }
  

  search= async () => {
    const {search} = this.state
    if(search){
      this.state.members.find((item,index)=> {
        if(item.uuid === search){
          this.state.members = [];
          this.state.members.push(item);
        }
      })
    }else {
      this.state.members = this.state.beforeSearchList;
    }

    this.setState({
      search: ''
    })

  }

  updateSearch = search => {
    this.setState({ search });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index}) => {
    return (
      <TouchableOpacity>
        <ListItem
          bottomDivider
          onPress={
            () => {
              var users = this.state.members;
              let i = this.state.members.findIndex((element)=>{
                return element.uuid === item.uuid;
              })
              this.state.members[i].checked = !this.state.members[i].checked;
              this.setState({users: [...users]});
            }
          }
        >
          <CheckBox
            checkedIcon={ <MaterialCommunityIcons name='check-circle' size={30} color='#0F0' /> }
            uncheckedIcon={ <MaterialCommunityIcons name='circle-outline' size={30} color='#ededed' /> }
            checked={item.checked}
            onPress={
              () => {
                var users = this.state.members;
                let i = this.state.members.findIndex((element)=>{
                  return element.uuid === item.uuid;
                })
                this.state.members[i].checked = !this.state.members[i].checked;
                this.setState({users: [...users]});
              }
            }
          />
          <Avatar
            activeOpacity={0.2}
            size={'medium'}
            rounded={false}
            source={{ uri: item.portraitUri }}
          />
          <ListItem.Content>
            <ListItem.Title>
            {item.name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  };

  renderSectionHeader = (item) => {
    let title = item.section.title;
    return (
      <View
        style={{
          height: 30,
          backgroundColor: '#ededed',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        <Text>{title}</Text>
      </View>
    );
  };

  nextStep = async () => {
    let users = [];
    if(this.state.users){
      this.state.users.find((item)=> {
        if(item.checked){
          users.push(item.uuid);
        }
      })
    }

    let result = await chat.currentUser.delRole(this.state.groupId, users);
    Toast.show(result.msg,{
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER
    })
    if(result.status){
      this.props.navigation.goBack();
      this.props.navigation.state.params.callback();
    }
  }

  render() {
    let sectionData = [];
    let data = {};
    this.state.members.length !== 0 &&
    this.state.members.forEach((item, index) => {
      item.letter = Pinyin.GetJP(item.name).charAt(0).toUpperCase();
      if (!data[item.letter]) {
        data[item.letter] = [];
        data[item.letter].push(item);
      } else {
        data[item.letter].push(item);
      }
    });
    for (let key in data) {
      let obj = {};
      obj.title = key;
      obj.data = data[key];
      sectionData.push(obj);
    }

    Styles = getStyle()

    return(
      <MainView>

        {/*头部*/}

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
          centerComponent={{ text: '删除管理员', style: { color: 'black', fontSize: 16 } }}
          rightComponent={
            <Button
              title={'确定'}
              titleStyle={{fontSize: 14,color:'#0395fc'}}
              buttonStyle={{backgroundColor: 'none',height:25}}
              onPress={this.nextStep}
            >
            </Button>
          }
          containerStyle={Styles.headerContainer}
        />
        {/*通讯列表*/}
        <SectionList
          keyExtractor={this.keyExtractor}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          sections={sectionData}
          stickySectionHeadersEnabled={false}
          onScroll={() => {
            if (this.state.show) {
              this.setState({
                show: false,
              });
            }
          }}
        />

      </MainView>
    )
  }

}

const mapState = (state) => ({
});

const mapDispatch = (dispatch) => ({});
export default connect(mapState, mapDispatch)(DelRole);

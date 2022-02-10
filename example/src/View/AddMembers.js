
/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 新增群员
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
class AddMembers extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groupId: this.props.navigation.state.params.groupId,
      members: this.props.navigation.state.params.members,
      search: '',
      beforeSearchList: []
    };
  }


  componentDidMount() {
    for(let i=this.props.friendList.length-1;i>=0;i--){
      let itemF = this.props.friendList[i];
      this.state.members.forEach((itemM,indexM) => {
        if(itemF._id === itemM.uuid){
          this.props.friendList.splice(i, 1);
        }
      })
    }
    this.setState({
      beforeSearchList : this.props.friendList
    })
  }

  componentWillUnmount(){
    console.log('add member unmount');
  }
  

  search= async () => {
    const {search} = this.state
    if(search){
      this.props.friendList.find((item,index)=> {
        if(item.uuid === search){
          this.props.friendList = [];
          this.props.friendList.push(item);
        }
      })
    }else {
      this.props.friendList = this.state.beforeSearchList;
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
              var users = this.props.friendList;
              let i = this.props.friendList.findIndex((element)=>{
                return element._id === item._id;
              })
              this.props.friendList[i].checked = !this.props.friendList[i].checked;
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
                var users = this.props.friendList;
                let i = this.props.friendList.findIndex((element)=>{
                  return element._id === item._id;
                })
                this.props.friendList[i].checked = !this.props.friendList[i].checked;
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
            {item.nickname}
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
    console.log(this.state.users);
    if(this.state.users){
      this.state.users.find((item)=> {
        if(item.checked){
          users.push(item._id);
        }
      })
    }
    console.log(users);

    let result = await chat.currentUser.addMember(this.state.groupId, users);
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
    this.props.friendList.length !== 0 &&
    this.props.friendList.forEach((item, index) => {
      item.letter = Pinyin.GetJP(item.nickname).charAt(0).toUpperCase();
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
          centerComponent={{ text: '新增成员', style: { color: 'black', fontSize: 16 } }}
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

        {/*搜索框*/}

        <SearchBar
          platform={'android'}
          placeholder="搜索好友"
          value={this.state.search}
          containerStyle={{backgroundColor: 'white'}}
          inputContainerStyle={{backgroundColor: 'white'}}
          inputStyle={{ borderColor: 'white'}}
          onChangeText={this.updateSearch}
        />

        {/*搜索内容*/}
        {
          this.state.search!==''?
            <ListItem
              bottomDivider
              onPress={this.search}
            >
              <ListItem.Title>
                <Text>{"搜索:"+this.state.search}</Text>
              </ListItem.Title>
            </ListItem> : null
        }
        
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
  friendList: chat.currentUser.friends.map((item)=>{return item})
});

const mapDispatch = (dispatch) => ({});
export default connect(mapState, mapDispatch)(AddMembers);

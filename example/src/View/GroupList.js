/*
 * 文件名: GroupList.js
 * 作者: liushun
 * 描述: 通讯录页面
 * 修改人:
 * 修改时间:
 * 修改内容:
 * */

import React from 'react';
import MainView from '../components/MainView';
import {
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header, ListItem, Avatar } from 'react-native-elements';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from 'react-redux';
import config from '../Config/index';
import { YCChat } from '../observable/lib/chat';
import Pinyin from '../Util/ChinesePY';

const chat = YCChat.getInstance();

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }


  goChat = (param) => {
    if (this.state.show) {
      this.setState({
        show: false,
      });
      return;
    }
    //this.props.navigation.navigate('UserDetail', { ...param });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.goChat({ user: item });
        }}
      >
        <ListItem
          bottomDivider
        >
          <Avatar
            activeOpacity={0.2}
            avatarStyle={{ backgroundColor: "#BDBDBD" }}
            rounded={false}
            //source={{ uri: item.portraitUri }}
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
          backgroundColor: 'gray',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        <Text>{title}</Text>
      </View>
    );
  };

  render() {
    let sectionData = [];

    let data = {};
    this.props.groupList.length !== 0 &&
      this.props.groupList.forEach((item, index) => {
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

    return (
      <MainView>
        {/*头部*/}

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
          centerComponent={{ text: '我的群聊', style: { color: 'black', fontSize: 16 } }}
          containerStyle={{
            backgroundColor: 'white',
            justifyContent: 'space-around',
            paddingRight: 30,
            height: 60,
            marginTop: 24,
          }}
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
    );
  }
}

// const mapState = (state) => ({
//   // groupList: [{
//   //   name: 'ADD', // 群名
//   //   portraitUri: '', // 群头像
//   //   id: '111', // 群ID
//   //   memberCount: '111', // 群当前人数
//   //   maxMemberCount: '111', // 群最大人数
//   //   creatorId: '111', // 群主id
//   //   canShowAllMember: 'YES', // 显示所有成员
//   //   canAddManagerFriend: 'NO', // 当前群是否可以加管理员好友
//   //   canAddFriend: 'YES', // 当前群是否可以加好友
//   //   allCanSay: 'NO' // 当前群是否禁言
//   // },{
//   //   name: 'wdd', // 群名
//   //   portraitUri: '', // 群头像
//   //   id: '222', // 群ID
//   //   memberCount: '222', // 群当前人数
//   //   maxMemberCount: '122211', // 群最大人数
//   //   creatorId: '222', // 群主id
//   //   canShowAllMember: 'YES', // 显示所有成员
//   //   canAddManagerFriend: 'NO', // 当前群是否可以加管理员好友
//   //   canAddFriend: 'YES', // 当前群是否可以加好友
//   //   allCanSay: 'NO' // 当前群是否禁言
//   // },{
//   //   name: 'yys', // 群名
//   //   portraitUri: '', // 群头像
//   //   id: '333', // 群ID
//   //   memberCount: '333', // 群当前人数
//   //   maxMemberCount: '333', // 群最大人数
//   //   creatorId: '333', // 群主id
//   //   canShowAllMember: 'YES', // 显示所有成员
//   //   canAddManagerFriend: 'NO', // 当前群是否可以加管理员好友
//   //   canAddFriend: 'YES', // 当前群是否可以加好友
//   //   allCanSay: 'NO' // 当前群是否禁言
//   // }]
//   groupList: state.UserReducer.get('groupList').toJS(),
// });
const mapState = (state) => ({
  groupList: chat.currentUser.groups,
});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(GroupList);

/*
 * 文件名: Mail.js
 * 作者: liushun
 * 描述: 通讯录页面
 * 修改人:
 * 修改时间:
 * 修改内容:
 * */

import React from 'react';
import MainView from '../components/MainView';
import {
  FlatList,
  SectionList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import { Header, ListItem, Avatar, Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropMenu from '../components/DropMenu';
import { connect } from 'react-redux';
import Pinyin from '../Util/ChinesePY';
import { YCChat } from '../observable/lib/chat';
const chat = YCChat.getInstance();

const ENGLISH = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 
  'Y', 'Z'];

class Mail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  addFriend = () => {
    this.setState({
      show: false,
    });
    this.props.navigation.navigate('AddFriend');
  };

  createGroup=()=>{
    this.setState({
      show: false,
    })
    this.props.navigation.navigate('CreateGroup');
  }

  goChat = (param) => {
    if (this.state.show) {
      this.setState({
        show: false,
      });
      return;
    }
    console.log('this.props.navigation: ', this.props.navigation)
    this.props.navigation.navigate('UserDetail', { ...param });
  };

  renderHeader = () => {
    return (
      <View>
        <ListItem 
          onPress={() => {this.props.navigation.navigate('NewFriends')}} 
          bottomDivider
          style={{height: 66}}
          containerStyle={{height: 66}}>
          <Avatar
            activeOpacity={0.2}
            containerStyle={{ backgroundColor: "white"}}
            ImageComponent={() => (
              <Image
                style={{width:33,height:33}}
                source={require('../images/tianjiayonghu.png')}
              />
            )}/>
          <ListItem.Content>
            <ListItem.Title>
              <Text>新的朋友</Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          onPress={() => {this.props.navigation.navigate('GroupList')}} 
          bottomDivider
          style={{height: 66}}
          containerStyle={{height: 66}}>
          <Avatar
            activeOpacity={0.2}
            containerStyle={{ backgroundColor: "white" }}
            ImageComponent={() => (
              <Image
                style={{width:33,height:33}}
                source={require('../images/qunzu.png')}
              />
            )}/>
          <ListItem.Content>
            <ListItem.Title>
              <Text>群组</Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    );
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
            avatarStyle={{}}
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

  renderSearchFirstName = () => {
    return (
      ENGLISH.map(item => {
        return(
          <TouchableOpacity
            key={ item }
            style={{ width: 25, height: 20 }}
            onPress={() => { console.log(item) }}
          >
            <Text style={{marginTop: 2, textAlign: 'center'}}>
              { item }
            </Text>
          </TouchableOpacity>
        )
      })
    )
  } 

  render() {
    let sectionData = [];

    console.log('this.props.friendList');
    console.log(this.props.friendList);
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

    return (
      <MainView>
        {/*头部*/}
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.state.show) {
              this.setState({
                show: false,
              });
            }
          }}
        >
        <Header
          placement="left"
          leftComponent={<Text style={{ fontSize: 16 }}>通讯录</Text>}
          rightComponent={
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 10 }} />
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    show: !this.state.show,
                  });
                }}
              >
                <Ionicons
                  name={'ios-add-circle-outline'}
                  size={24}
                  color={'#44a0df'}
                />
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
        </TouchableWithoutFeedback>

        <View
          style={{position:'absolute', top:150, right: 0, zIndex: 999}}
        >
          { this.renderSearchFirstName() }
        </View>

        {/*通讯列表*/}
        <SectionList
          ListHeaderComponent={this.renderHeader}
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

        {/*弹窗*/}
        {this.state.show ? (
          <DropMenu
            style={{position:'absolute', right:20, top: 85}}
            navigation={this.props.navigation}
            addFriend={this.addFriend}
            createGroup={this.createGroup}
          />
        ) : null
        }
      </MainView>
    );
  }
}

const mapState = (state) => ({
  friendList: chat.currentUser.friends
});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(Mail);

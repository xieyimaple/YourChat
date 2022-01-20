
/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 添加朋友
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
import {Header, ListItem, Button} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SearchBar, Text } from 'react-native-elements';
import ApiUtil from '../Service/ApiUtil'
import Toast from "react-native-root-toast";
import getStyle from './Style/AddFiendStyle'
import { connect } from 'react-redux';


let Styles = {}
class CreateGroup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  search= async () => {
    const {search} = this.state

    try{
      // const result = await ApiUtil.request('searchFriend', {'friendName': search}, true)

      // if (result.data.errno === 0) {
      //this.props.navigation.navigate('UserDetail', {'user': result.data.data});
      // } else {
      //   Toast.show(result.data.msg, {
      //     duration: Toast.durations.SHORT,
      //     position: Toast.positions.CENTER
      //   })
      // }
      this.props.navigation.navigate('UserDetail', {'user': {
        username:'wohaole',
        _id:123123,
        avatar: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
        sex: 'man',
        address: 'beijing'
      }});
    }catch {

    }

    this.setState({
      search: ''
    })

  }

  updateSearch = search => {
    this.setState({ search });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <ListItem
          bottomDivider
        >
          <Avatar
            activeOpacity={0.2}
            avatarStyle={{}}
            rounded={false}
            source={{ uri: config.baseURL + '/' + item.avatar }}
          />
          <ListItem.Content>
            <ListItem.Title>
            {item.username}
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

  nextStep = () => {
    this.setState({
      show: false,
    })
    this.props.navigation.navigate('EnterGroupName');
  }

  render() {
    let sectionData = [];

    let data = {};

    this.props.friendList = [];

    this.props.friendList.length !== 0 &&
      this.props.friendList.forEach((item, index) => {
        if (!data[item.friendId.letter]) {
          data[item.friendId.letter] = [];
          data[item.friendId.letter].push(item.friendId);
        } else {
          data[item.friendId.letter].push(item.friendId);
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
              <FontAwesome name={'angle-left'} size={24} color={'black'}
              >
              </FontAwesome>
            </TouchableOpacity>
          }
          centerComponent={{ text: '创建群聊', style: { color: 'black', fontSize: 16 } }}
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
  friendList: state.UserReducer.get('friendList').toJS(),
});

const mapDispatch = (dispatch) => ({});
export default connect(mapState, mapDispatch)(CreateGroup);

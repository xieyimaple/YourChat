
/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 创建群聊
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


let Styles = {}
class CreateGroup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    const beforeSearchList = this.props.friendList;
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
      this.props.friendList = beforeSearchList;
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
              this.props.friendList[index].checked = !this.props.friendList[index].checked;
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
                this.props.friendList[index].checked = !this.props.friendList[index].checked;
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

  nextStep = () => {
    this.setState({
      show: false,
    })
    let users = [];
    if(this.state.users){
      this.state.users.find((item)=> {
        if(item.checked){
          users.push(item.uuid);
        }
      })
    }
    this.props.navigation.navigate('EnterGroupName', { users: users });
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

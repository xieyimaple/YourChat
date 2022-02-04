/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
// 引入中文语言包
import 'dayjs/locale/zh-cn';
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native';
import {Header} from "react-native-elements";
import MainView from '../components/MainView'

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

export default function ChatView(props) {
    const [messages, setMessages] = useState([]);
    const _user = props.navigation.getParam('user');
    const toName = _user.hasOwnProperty('_allCanSay') ? _user._name : _user.username;
    const toId = _user._id;
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: '码农先生，开始聊天吧！',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);
    const onSend = useCallback((msg = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
    }, []);

    const renderBubble = (props) => {
        return (
          <Bubble
              {...props}
              textStyle={{
                  right: {
                      color: 'black',
                  },
              }}
              wrapperStyle={{
                  left: {
                      backgroundColor: '#fff',
                  },
                  right: {
                      backgroundColor: '#95ec69',
                  },
              }}
          />      
        );
    };

    const renderSend = (props) => {
        return (
            <Send
                {...props}
                alwaysShowSend={true}
            >
                <View style={styles.sendBtn}>
                    <Text style={{color: '#ffffff', fontSize: 17}}>发送</Text>
                </View>
            </Send>
        );
    };

    return (
      <><Header
        placement="left"
        leftComponent={<TouchableOpacity onPress={() => {
          // if(lastMessage.text){
          //   this.props.addRoomLastMsg({'roomId': this.state.roomId, 'message': lastMessage})
          // }
          // props.deleteRoomUnReadMsg({'roomId': this.state.roomId})
          props.navigation.goBack();
        } }>
          <FontAwesome name={'angle-left'} size={24} color={'black'}
          >
          </FontAwesome>
        </TouchableOpacity>}
        centerComponent={{ text: toName, style: { color: 'black', fontSize: 16 } }}
        containerStyle={{
          paddingRight: 30,
          height: 60,
          marginTop: 24,
          backgroundColor: 'white',
          justifyContent: 'space-around',
          zIndex: 1000,
        }}
        centerContainerStyle={{}}
        rightComponent={<TouchableOpacity onPress={() => {
            _user.hasOwnProperty('_allCanSay') ? 
            props.navigation.navigate('GroupManage', { ..._user }) : console.log('好友信息')
        } }>
        <Entypo name={'dots-three-horizontal'} size={20} color={'black'}
        >
        </Entypo>
        </TouchableOpacity>} /><SafeAreaView style={styles.mainContent}>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            showUserAvatar={true}
            locale={'zh-cn'}
            showAvatarForEveryMessage={true}
            renderBubble={renderBubble}
            placeholder={'开始聊天吧'}
            renderSend={renderSend}
            inverted={true}
            renderUsernameOnMessage={true}
            user={{
              _id: 50,
              name: '阳光',
              avatar: 'https://placeimg.com/140/140/any',
            }}
            alignTop={true} />
        </SafeAreaView></>
    )
}
const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#ededed',
    },
    sendBtn: {
        width: 63,
        height: 32,
        borderRadius: 3,
        backgroundColor:'#07c160',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5,
        marginRight:5,
    }
});

// const mapState = state => ({
//   user: state.UserReducer.get('user'),
// })

// const mapDispatch = dispatch => ({
//   addRoomLastMsg(param){
//     dispatch(AddRoomLastMsg(param))
//   },
//   deleteRoomUnReadMsg(param){
//     dispatch(DeleteRoomUnReadMsg(param))
//   }
// })

// export default connect(
//   mapState,
//   mapDispatch
// )(ChatView)
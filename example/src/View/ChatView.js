/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
// 引入中文语言包
import 'dayjs/locale/zh-cn';
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native';
import {Header} from "react-native-elements";
import { YCChat } from '../observable/lib/chat';
import { ConversationType } from '@rongcloud/react-native-imlib';

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

const dataConversion = (messageList, _user) => {
    let messageObj = {};
    let messageArray = [];
    if(_user instanceof Array) {
        for(let i = messageList.length - 1 ; i >= 0; i--) {
            let messageItem = messageList[i];
            const userElement = _user.find((item) => {
                return item.uuid === messageItem.senderUserId;
            });
            messageObj = {
                _id: messageItem.messageId,
                text: messageItem.content.content,
                createdAt: new Date(messageItem.sentTime),
                user: {
                    _id: messageItem.senderUserId,
                    name: userElement.name,
                    avatar: userElement.portraitUri,
                }
            };
            messageArray.push(messageObj);
        }
    } else {
        for(let i = messageList.length - 1 ; i > 0; i--) {
            let messageItem = messageList[i];
            messageObj = {
                _id: messageItem.messageId,
                text: messageItem.content.content,
                createdAt: new Date(messageItem.sentTime),
                user: {
                    _id: messageItem.senderUserId,
                    name: _user.nickname,
                    avatar: _user.portraitUri,
                }
            };
            messageArray.push(messageObj);
        }
    }
    console.log(messageArray);
    return messageArray;
};

export default function ChatView(props) {
    const [messages, setMessages] = useState([]);
    const _user = props.navigation.getParam('user');

    const chat = YCChat.getInstance();
    const toName = _user.hasOwnProperty('_allCanSay') ? _user._name : _user.username;
    const toId = _user._id;
    

    useEffect(() => {
        let conversation = chat.getConversation(toId, _user.hasOwnProperty('_allCanSay') ? ConversationType.GROUP : ConversationType.PRIVATE);
        (async () => {
            await conversation.open();
            conversation.addListener('receive-text-message', async (message) => {
                if(_user.hasOwnProperty('_allCanSay')){
                    let result = await chat.currentUser.showMember(_user._id,1,_user._memberCount);
                    if(result.status){
                        setMessages(dataConversion(conversation.messageList, result.cont));
                    }
                }else{
                    setMessages(dataConversion(conversation.messageList, _user));
                }
            });
            if(_user.hasOwnProperty('_allCanSay')){
                let result = await chat.currentUser.showMember(_user._id,1,_user._memberCount);
                if(result.status){
                    setMessages(dataConversion(conversation.messageList, result.cont));
                }
            }else{
                setMessages(dataConversion(conversation.messageList, _user));
            }
        })();

        return () => {
            conversation.removeAllListeners('receive-text-message');
        }
    }, []);
    const onSend = useCallback(async (msg = []) => {
        await chat.currentConversation.sendTextMessage(msg[0].text);
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
              _id: chat.currentUser._id,
              name: chat.currentUser.nickname,
              avatar: chat.currentUser._photoUrl,
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
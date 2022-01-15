/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Send, InputToolbar, Actions, IMessage  } from 'react-native-gifted-chat';
// 引入中文语言包
import 'dayjs/locale/zh-cn';
import {View,Text,StyleSheet,SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccessoryBar from '../components/AccessoryBar'


export default function ChatRoomScreen() {
    const [messages, setMessages] = useState([]);

    
    const isTyping = useState(false);
    
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: '王术彬哥哥，开始聊天吧！',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'tgl',
                    avatar: 'https://i2.hdslb.com/bfs/face/46f4dcca9f4f3c25ee185f506f65bc3071bf2889.jpg@150w_150h.jpg',
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
                alwaysShowSend={false}
            >
                <View style={styles.sendBtn}>
                    <Text style={{color: '#ffffff', fontSize: 17}}>发送</Text>
                </View>
            </Send>
        );
    };

    const renderInputToolbar = (props) => {
      return (
        <InputToolbar {...props}  />
      );
    }

    const onSendFromUser = (messages = []) => {
        const createdAt = new Date()
        const messagesToUpload = messages.map(message => ({
            ...message,
            user,
            createdAt,
            _id: Math.round(Math.random() * 1000000),
        }))
        this.onSend(messagesToUpload)
    }

    const setIsTyping = () => {
        this.setState({
          isTyping: !isTyping,
        })
    }

    const renderAccessory = (props) => {
      return (
        <AccessoryBar {...props} onSend={onSendFromUser} isTyping={setIsTyping}  />
      )
    }

    const handleSendImage = () => {
        console.log("handleSendImage");
    };
    
    const renderActions = (props) => {
        return (
          <Actions
            {...props}
            containerStyle={{
                width: 50
            }}
            icon={() => (
                <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'center'}}>
                    <Icon
                        name={"add-circle-outline"}
                        size={26}
                        color={'#818181'}
                        font={"FontAwesome"}
                        onPress={handleSendImage}
                    />
                    <Icon
                        name={"happy-outline"}
                        size={24}
                        color={'#818181'}
                        font={"FontAwesome"}
                        onPress={handleSendImage}
                    />
                </View>
              
            )}
            onSend={(args) => console.log(args)}
          />
        );
    }

    return (
        <SafeAreaView style={styles.mainContent}>
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            showUserAvatar={true}
            locale={'zh-cn'}
            showAvatarForEveryMessage={true}
            renderBubble={renderBubble}
            placeholder={'开始聊天吧'}
            renderSend={renderSend}
            isAnimated = {true}
            renderInputToolbar={renderInputToolbar} 
            renderActions={renderActions}
            inverted={true}
            renderAccessory={renderAccessory}
            renderUsernameOnMessage={true}
            user={{
                _id: 50,
                name: '高薪',
                avatar: 'https://i2.hdslb.com/bfs/face/cb620bbb9071974f37843134875d472b47532a97.jpg@240w_240h_1c_1s.webp',
            }}
            alignTop={true}
        />
        </SafeAreaView>
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
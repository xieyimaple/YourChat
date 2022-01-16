import * as React from 'react';
import { Platform, StyleSheet, Text, View, PermissionsAndroid, Button } from 'react-native';
// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
import { init, connect, setServerInfo } from "@rongcloud/react-native-imlib";
import config from "./config";
// import * as examples from "./examples";
import { YCChat } from './observable/lib/chat';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).catch(() => {});
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).catch(() => {});

if (config.naviServer != null && config.naviServer.length > 0) {
     setServerInfo(config.naviServer, '');
}
init("n19jmcy59f1q9");

// export default createAppContainer(createStackNavigator(examples, { initialRouteName: "default" }));
export default () => {
     const getRegisterInfo = async () => {
          const chat = YCChat.getInstance();
          const result = await chat.validator.getRegisterInfo();
          console.log(result);
          console.log('END')
     };

     const register = async () => {
          const chat = YCChat.getInstance();
          const result = await chat.validator.register({
               account: 'woshinibaba1233333',
               password: 'woshinibaba123213',
               gender: 'male',
               upAcc: "jytest1"
          });
          console.log(result);
          console.log('END')
     };

     const login = async () => {
          const chat = YCChat.getInstance();
          const result = await chat.validator.login('woshinibaba1233333', '123456');
          console.log(result);
          console.log('END')
     };

     const logout = async () => {
          const chat = YCChat.getInstance();
          const result = await chat.validator.logout();
          console.log(result);
          console.log('END')
     };

     const updatePassword = async () => {
          const chat = YCChat.getInstance();
          const result = await chat.currentUser.updatePassword({
               newPwd: '123456',
               oldPwd: chat.currentUser.password
          });
          console.log(result);
          console.log('END')
     };
     return (
          <View>
               <Button onPress={getRegisterInfo} title='获取注册字段列表'></Button>
               <Button onPress={register} title='注册'></Button>
               <Button onPress={login} title='登录'></Button>
               <Button onPress={logout} title='注销'></Button>
               <Button onPress={updatePassword} title='修改密码'></Button>
          </View>
     );
}

// const time = 1000;
// let _timer;

// _timer && clearTimeout(_timer)
// _timer = setTimeout(() => {
//      // 处理函数
// }, time);

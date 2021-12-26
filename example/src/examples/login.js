import * as React from "react";
import { StyleSheet , View, Image } from "react-native";
import FormItem from "./form-item";
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const style = StyleSheet.create(
  { 
    body: { 
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      textAlign: "center",
      backgroundColor: "#ededed"
    }, 
    tinyLogo: {
      width: 50,
      height: 50,
      resizeMode: "contain",
    },
    loginInput: {
      width: 280
    },
    loginButton: {
      width: 280
    }
  }
);

export default class extends React.PureComponent {
  static route = "Login";
  static navigationOptions = { title: "登录" };

  login = () => {
    alert('start login')
  }


  render() {
    return (
      <View style={style.body}>
        <Image
          style={style.tinyLogo}
          source={require('../images/logo.png')}
        />
        <FormItem>
          <Input
            placeholder='请输入账号'
            inputContainerStyle={style.loginInput}
            leftIcon={
              <Icon name="account-outline" size={20} />
            }
          />
        </FormItem>
        <FormItem>
          <Input
            placeholder='请输入密码'
            inputContainerStyle={style.loginInput}
            leftIcon={
              <Icon name="lock" size={20} />
            }
            errorStyle={{ color: 'red' }}
            errorMessage=''
            secureTextEntry={true}
          />
        </FormItem>
        <FormItem>
          <Button
            title={'登录'}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={this.login}
          />
        </FormItem>
      </View>
    );
  }
}

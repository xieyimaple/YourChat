import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Input, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const style = StyleSheet.create(
  { 
    body: { 
      backgroundColor: '#ededed'
    },
    inputContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 20,
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20
    },
    registerInput: {

    },
    registerLabel: {
      color: '#000'
    },
    registerButton: {
      width: 280
    }
  }
);



export default class extends React.PureComponent {
  static route = 'register';
  static navigationOptions = { title: '注册' };

  state = {
    checked: false
  }

  submit = () => {
    alert('submit')
  }
  

  render() {
    return (
      <ScrollView contentContainerStyle={style.body}>
        <View style={style.inputContainer}>
          <View>
            <CheckBox
              title='男'
              checkedIcon={ <Icon name='face' size={ 15 } color='rgb(2, 147, 254)'/> }
              uncheckedIcon={ <Icon name='face' size={ 15 } color='rgb(154, 154, 154)'/> }
              checked={ this.state.checked }
              onPress={() => this.setState({checked: !this.state.checked})}
            />
            <CheckBox
              title='女'
              checkedIcon={ <Icon name='face-woman' size={ 15 } color='rgb(2, 147, 254)'/> }
              uncheckedIcon={ <Icon name='face-woman' size={ 15 } color='rgb(154, 154, 154)'/> }
              checked={ !this.state.checked }
              onPress={ () => this.setState({checked: !this.state.checked}) }
            />
          </View>
          <Input
            inputContainerStyle={style.registerInput}
            labelStyle={style.registerLabel}
            label='昵称'
            placeholder='请设置您的昵称'
          />
          <Input
            inputContainerStyle={style.registerInput}
            labelStyle={style.registerLabel}
            label='登录账号'
            placeholder='7-15位字母或数字'
          />
          <Input
            inputContainerStyle={style.registerInput}
            labelStyle={style.registerLabel}
            label='登录密码'
            placeholder='7-15位字母或数字'
            errorStyle={{ color: 'red' }}
            errorMessage=''
            secureTextEntry={true}
          />
          <Input
            inputContainerStyle={style.registerInput}
            labelStyle={style.registerLabel}
            label='手机号'
            placeholder='只支持中国大陆手机'
          />
          <Input
            inputContainerStyle={style.registerInput}
            labelStyle={style.registerLabel}
            label='邀请码'
            placeholder='请输入邀请人账号'
          />
        </View>
        
        <Button
          style={style.registerButton}
          title={'立即注册'}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={this.submit}
        />
      </ScrollView>
    );
  }
}

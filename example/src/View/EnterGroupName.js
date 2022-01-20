/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 创建群组
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react';
import {Header, Input, Button} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MainView from '../components/MainView'
import {TouchableOpacity, View} from 'react-native'
import {connect} from "react-redux";
import {UpdateUser} from '../Redux/actionCreators'
import getStyle from './Style/EnterGroupNameStyle'

let Styles = {};



class EnterGroupName extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      groupName: ''
    };
  }


  EnterGroupName = () => {
    let { groupName} = this.state;
    console.log(groupName);

    // this.props.register({
    //   'groupName': groupName,
    //   'newPassword': newPassword
    // })
  }
  

  render(){
    Styles = getStyle()

    return(
      <MainView>
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
          centerComponent={{ text: '创建群组', style: { color: 'black', fontSize: 16 } }}
          containerStyle={Styles.headerContainer}
        />


        <View style={Styles.content}>
          <Input
            placeholder='请输入群名称'
            containerStyle={Styles.containerStyle}
            inputContainerStyle={Styles.inputContainerStyle}
            inputStyle={Styles.input}
            value={this.state.groupName}
            onChangeText={(text)=>{
              this.setState({
                groupName: text
              })
            }}
          >
          </Input>
        </View>
        
        
        <Button
          title={"确认"}
          buttonStyle={Styles.Button}
          onPress={this.EnterGroupName}
          loading={this.props.loading}
          disabled={this.state.groupName === ''}
        ></Button>
      </MainView>
    )
  }

}

const mapState = state => ({
  user: state.UserReducer.get('user').toJS(),
})

const mapDispatch = dispatch => ({
  updateUser(param){
    dispatch(UpdateUser(param))
  }
})

export default connect(
  mapState,
  mapDispatch
)(EnterGroupName)


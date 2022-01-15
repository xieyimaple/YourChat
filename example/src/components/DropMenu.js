/*
* 文件名: AppContainer.js
* 作者: liushun
* 描述: 下拉菜单
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";


class dropMenu extends React.Component{
  constructor(props) {
    super(props);
  }



  render(){
    return(
      <View style={[{width: 120,borderRadius: 5, backgroundColor: 'white', flexDirection:'column', alignItems:'center' },this.props.style]}>
        <TouchableOpacity onPress={()=>{
          if(this.props.createGroup){
            this.props.createGroup();
          }
        }}>
          <View style={{flexDirection:'row',paddingVertical: 10, alignItems:'center'}}>
            <Feather name={'message-circle'} size={20} color={'#44a0df'}>
            </Feather>
            <View style={{width:10}}>
            </View>
            <Text style={{color: 'black'}}>发起群聊</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          if(this.props.addFriend){
            this.props.addFriend();
          }
        }}>
         <View style={{flexDirection:'row',paddingVertical: 10, alignItems:'center'}}>
            <Entypo name={'add-user'} size={20} color={'#44a0df'}>
            </Entypo>
            <View style={{width:10}}>
            </View>
            <Text style={{color: 'black'}}>添加朋友</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={{flexDirection:'row',paddingVertical: 10, alignItems:'center'}}>
          <Ionicons name={'md-qr-scanner'} size={20} color={'#44a0df'}>
          </Ionicons>
          <View style={{width:10}}>
          </View>
          <Text style={{color: 'black'}}>扫一扫&emsp;</Text>
        </View> */}


        {/* 这里就是三角形的代码 */}
        {/* <View style={{
          borderWidth: 8,
          borderBottomColor:'#999',
          borderTopColor:'rgba(0,0,0,0)',
          borderLeftColor:'rgba(0,0,0,0)',
          borderRightColor:'rgba(0,0,0,0)',
          position:'absolute',
          top:-20,
          right: 15
        }}>
        </View> */}
      </View>
    )
  }

}

export default dropMenu;

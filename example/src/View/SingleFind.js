
/*
* 文件名: AppContainer.js
* 描述: 发现
* 修改人:
* 修改时间:
* 修改内容:
* */

import React from 'react'
import MainView from '../components/MainView'
import getStyle from './Style/AddFiendStyle'
import { TouchableOpacity } from 'react-native'
import { Header } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { WebView } from 'react-native-webview';

let Styles = {}
class SingleFind extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  

  

  render(){

    Styles = getStyle()
    const {params} = this.props.navigation.state;
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
          centerComponent={{ text: params.singleFindData.linkname, style: { color: 'black', fontSize: 16 } }}
          containerStyle={{
            backgroundColor: 'white',
            justifyContent: 'space-around',
            paddingRight: 30,
            height: 60,
            marginTop: 24,
          }}
        />
        <WebView
          source={{ uri: params.singleFindData.applinkaddress }}
          style={{height: '50%',backgroundColor: '#dddfff'}} // test
        />
      </MainView>
    )
  }

}

export default SingleFind;

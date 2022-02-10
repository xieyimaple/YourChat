import React from 'react'
import MainView from "../components/MainView";
import {TouchableOpacity} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Button, Header, Input} from "react-native-elements";
import ApiUtil from "../Service/ApiUtil";
import {UpdateUser} from "../Redux/actionCreators";
import {connect} from "react-redux";
import Toast from "react-native-root-toast";
import { YCChat } from '../observable/lib/chat';


const chat = YCChat.getInstance();

class ChangeName extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      name: this.props.user.nickname
    }
  }

  changeName = async () => {
    const username = this.state.name
    let result = await chat.currentUser.updateSelfInfo(1,username);
    console.log('change nickname start');
    console.log(result);
    console.log('change nickname end');
    Toast.show('修改成功',{
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER
    });
    this.props.navigation.goBack();
  }

  render(){
    return(
      <MainView>

        {/*头部*/}

        <Header
          placement="center"
          leftComponent={
            <TouchableOpacity onPress={()=>{
              this.props.navigation.goBack();
            }}>
              <FontAwesome name={'angle-left'} size={24} color={'#44a0df'}
              >
              </FontAwesome>
            </TouchableOpacity>
          }
          centerComponent={{ text: '更改名字', style: { color: 'black', fontSize: 16 } }}
          containerStyle={{
            backgroundColor: 'rgb(238, 238, 238)',
            justifyContent: 'space-around',
            paddingRight: 30,
            height: 60,
            marginTop: 24,
          }}
          rightComponent={
            <Button
              title={'保存'}
              titleStyle={{fontSize: 14,color:'#0395fc'}}
              buttonStyle={{backgroundColor: 'none',height:25}}
              onPress={this.changeName}
            >
            </Button>
          }
        />

        {/*输入框*/}
        <Input value={this.state.name} onChangeText={(text)=>this.setState({
          name: text
        })}/>

      </MainView>
    )
  }

}


const mapState = state => ({
  user: chat.currentUser
})

const mapDispatch = dispatch => ({
  updateUser(param){
    dispatch(UpdateUser(param))
  }
})

export default connect(
  mapState,
  mapDispatch
)(ChangeName)


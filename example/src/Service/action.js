import {
  LoginIn,
  SaveUser,
  Register,
  GetFriendList
} from '../Redux/actionCreators'
import ApiUtil from '../Service/ApiUtil';
import {saveTokens} from '../Util/storageToken'
import { YCChat } from '../observable/lib/chat';
import { createImportSpecifier } from 'typescript';



//登录
export const login = (param) => async (dispatch) => {
  dispatch(LoginIn({loading: true, tip: '', login: false}));
  
  try{
    const chat = YCChat.getInstance();
    const result = await chat.validator.login(param.username,param.password);
    if(result.status == true){
      dispatch(LoginIn({loading: false, tip: result.msg, login: true}))
    }else{
      dispatch(LoginIn({loading: false, tip: result.msg, login: false}))
    }
  }catch(e){
    dispatch(LoginIn({loading: false, tip: '登录异常', login: false}))
  }

}



export const register = (param) => async (dispatch) => {
  dispatch(Register({loading: true, tip: '', register: false}));
  try {
    const chat = YCChat.getInstance();
    let { account, password, gender, upAcc, nickname} = param;
    const result = await chat.validator.register({
      account, password, gender, upAcc, nickname
    });
    if(result.status){
      dispatch(Register({loading: false, tip: result.msg, register: true}))
    } else {
      dispatch(Register({loading: false, tip: result.msg, register: false}))
    }
  } catch {
    dispatch(Register({loading: false, tip: '注册异常', register: false}))
  }
}

export const getFriendList=(param)=> async (dispatch) => {
  try {
    const chat = YCChat.getInstance();
    const result = await chat.currentUser.queryAllFriend();
    if (result.status) {
      dispatch(GetFriendList(result.friendList))
    }
  } catch {

  }
}



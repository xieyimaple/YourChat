import {
  LoginIn,
  SaveUser,
  Register,
  UploadImage,
  GetFriendList,
  GetGroupList,
  Init
} from '../Redux/actionCreators'
import ApiUtil from '../Service/ApiUtil';
import {saveTokens} from '../Util/storageToken'
import { YCChat } from '../observable/lib/chat';
import { createImportSpecifier } from 'typescript';
import { ConditionalTypeSerializer } from 'typedoc/dist/lib/serialization/serializers';



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

export const uploadImage = (param) => async (dispatch) => {
  dispatch(UploadImage({loading: true, tip: '', uploadImage: false}));
  try {
    const chat = YCChat.getInstance();
    const result = await chat.validator.upLoadImageResource({
      param
    });
    console.log(result);
    if(result.rst){
      dispatch(UploadImage({loading: false, tip: result.msg, uploadImage: true, result: result}))
    } else {
      dispatch(UploadImage({loading: false, tip: result.msg, uploadImage: false}))
    }
  } catch {
    dispatch(UploadImage({loading: false, tip: '上传', uploadImage: false}))
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

export const initFriends=(param)=> async (dispatch) => {
  try {
    const chat = YCChat.getInstance();
    const result = await chat.currentUser.initFriends();
    if (result.status) {
      dispatch(initFriends(result.friends))
    }
  } catch {

  }
}

export const getGroupList=(param)=> async (dispatch) => {
  try {
    const chat = YCChat.getInstance();
    const result = await chat.currentUser.initGroups();
    if (result.status) {
      dispatch(GetGroupList(result.groups))
    }
  } catch {

  }
}

export const init=(param)=> async (dispatch) => {
  try {
    const chat = YCChat.getInstance();
    await chat.currentUser.init();
    if (result.status) {
      dispatch(init(result))
    }
  } catch {
  }
}



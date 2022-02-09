/**
 * @module user
 * @description 此模块为用户相关类，主要功能为用户信息的获取（用户名、头像、好友列表，与好友建立长连接通信等等）
 */
import { YCObject } from './base';
import { chatHttp, YCHttpInterfaceEnum } from './http';
import type { YCChat } from './chat';
import { YCFriend, YCFriendInfo } from './friend';
import { YCGroup, YCGroupInfo } from './group';
import type { YCConversation } from './conversation';
import { ConversationType } from '@rongcloud/react-native-imlib';
// import Realm from "realm";

/**
 * 用户信息接口
 */
export type YCUserDetails = {
  account: string;
  adcode: string;
  autoAgree: 'YES' | 'NO';
  birthday: string;
  city: string;
  createTime: string;
  delReason: string;
  delTime: string;
  downMemberNum: string;
  effective: 'YES' | 'NO';
  email: string;
  flagDel: boolean;
  gender: string;
  groupNum: number;
  id: number;
  identity: 'ORDINARY' | 'MEMBER';
  isp: string;
  lastLoginIp: string;
  lastLoginTime: string;
  lastLoginZone: string;
  lat: string;
  lng: string;
  locRegion: string;
  locationType: string;
  loginCount: number;
  loginErr: string;
  logoutCount: number;
  mark: string;
  memberIp: string;
  molDnum: number;
  new: boolean;
  nickname: string;
  onlineSt: 'YES' | 'NO';
  passwordHash: string;
  passwordSalt: string;
  paypwd: string;
  phone: string;
  portraitUri: string;
  pro: string;
  qqnum: string;
  realname: string;
  rectangle: string;
  region: string;
  registerIp: string;
  seeLink: 'YES' | 'NO';
  sign: string;
  uid: number;
  upAcc: string;
  updateTime: string;
  uuid: string;
  wechat: string;
};

/**
 * 用户信息接口
 */
export interface YCUserInfo {
  name: string;
  id?: string;
  password?: string;
  photoUrl?: string;
  photoPath?: string;
  logined?: boolean;
}

export type updatePasswordOptions = {
  newPwd: string;
  oldPwd: string;
  phone?: string;
  region?: string; // 国别号
  vcode?: string; // 图片验证码内容
  vtoken?: string; // 图片验证码token
};

export type forgetPasswordOptions = {
  newPwd: string;
  pcode: string;
  phone: string;
  region?: string; // 国别号
  vcode?: string; // 图片验证码内容
  vtoken?: string; // 图片验证码token
};

export type createGroupChatOptions = {
  memberId: string[]; // 成员的uuid组成的数组
  name: string; // 群名称
  portraitUri: string; // 群头像url
};

export type FindListType = {
  applinkaddress: string; // app端链接地址
  custlinkaddress: string; // 客服人员链接地址
  defaultLink: string; // 默认地址
  linkIcon: string; // 链接图标
  linkname: string; // app端链接名称
  onPwd: 'YES' | 'NO'; // 是否开启密码
  password: string; // 密码
  linksetVOS: FindListType[]; // 密码
};

export type FriendListType = {
  createTime: string;
  default: boolean;
  displayName: string;
  friendUuid: string;
  lastLoginTime: string;
  lastLoginTip: string;
  message: string;
  msgst: number;
  nickname: string;
  onlineSt: 'YES' | 'NO';
  portraitUri: string;
  uuid: string;
};

export enum YCUserInfoTypeEnum {
  nickname = 1,
  portraitUri = 2,
  gender = 3,
  sign = 4,
  qqnum = 5,
  wechat = 6,
  email = 7,
  realname = 8,
  birthday = 9,
}

/**
 *  @class User
 *  @desc 用户基类，该类的作用为实现用户相关功能以及属性。
 * */
export class YCUser extends YCObject implements YCUserInfo {
  private _id: string;
  private _name: string;
  private _logined = false;
  private _password: string;
  private _photoUrl: string;
  private _photoPath: string;
  private _nickname: string = 'a';
  private _gender: 'female' | 'male';
  private _account: string;

  private _currentChattingFriend: YCFriend;
  private _friends: YCFriend[] = [];
  private _groups: YCGroup[];
  private _owner: YCChat;

  get owner(): YCChat {
    return this._owner;
  }

  // get 访问器：获取id
  get id(): string {
    return this._id;
  }

  // get 访问器：获取用户名
  get name(): string {
    return this._name;
  }

  // get 访问器：获取密码
  get password(): string {
    return this._password;
  }

  // get 访问器：获取头像URL
  get photoUrl(): string {
    return this._photoUrl;
  }

  // get 访问器：获取头像路径
  get photoPath(): string {
    return this._photoPath;
  }

  // get 访问器：获取头像
  get photo(): string {
    return this.photoPath || this.photoUrl || '默认头像';
  }

  // get 访问器：获取当前用户的激活状态（即是否登录）
  get logined(): boolean {
    return this._logined;
  }

  // set 访问器：设置当前用户的激活状态（即是否登录）
  set logined(value: boolean) {
    this._logined = value;
  }

  // get 访问器：获取当前正在聊天的
  get currentChattingFriend(): YCFriend {
    return this._currentChattingFriend;
  }

  // get 访问器：获取用户名
  set currentChattingFriend(value: YCFriend) {
    this._currentChattingFriend = value;
  }

  // get 访问器：获取用户的聊天列表，用以显示界面上
  get friends(): YCFriend[] {
    return this._friends;
  }

  get groups(): YCGroup[] {
    return this._groups;
  }

  // get 访问器：获取当前用户的昵称
  get nickname(): string {
    return this._nickname;
  }

  // set 访问器：设置当前用户的昵称
  set nickname(value: string) {
    this._nickname = value;
  }

  // get 访问器：获取当前用户的性别
  get gender(): 'female' | 'male' {
    return this._gender;
  }

  // set 访问器：设置当前用户的性别
  set gender(value: 'female' | 'male') {
    this._gender = value;
  }

  // get 访问器：获取当前用户的账号名
  get account(): string {
    return this._account;
  }

  // 构造函数
  constructor(
    owner: YCChat,
    {
      id = '',
      name,
      password = '',
      logined = false,
      photoUrl = '',
      photoPath = '',
    }: YCUserInfo
  ) {
    super();
    this._id = id;
    this._name = name;
    this._password = password;
    this._logined = logined;
    this._photoUrl = photoUrl;
    this._photoPath = photoPath;
    this._owner = owner;
  }

  // 初始化方法
  // 1. 构建好友对象
  public async init() {
    // 初始化本地数据库
    
    // 初始化好友列表
    await this.initFriends();

    // 初始化群组列表
    await this.initGroups();

    await this.initSelfInfo();
  }

  // 将用户信息转为JSON格式，用于进程间通信或者数据发送
  public toJson(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      photo: this.photo,
    });
  }

  // 静态方法：通过json对象构造一个user对象
  static fromJson(owner: YCChat, json: string) {
    const jsonObj: { id: string; name: string } = JSON.parse(json);
    if (jsonObj.name || jsonObj.id) {
      throw Error('缺少关键参数id，name');
    }
    const user = new YCUser(owner, jsonObj);
    user._id = jsonObj.id;
    return user;
  }

  // 删除好友
  public async deleteFriend(
    friendId: string,
    message: string
  ): Promise<{
    status: boolean;
    msg: string;
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.deleteFriend, {
      message,
      uuid: friendId,
    });
    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  // 查询所有好友
  public async queryAllFriend(): Promise<{
    status: boolean;
    msg: string;
    friends?: FriendListType[];
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.queryAllFriend);
    // 查找成功
    if (result.rst) {
      return {
        status: result.rst,
        msg: result.msg,
        friends: result.cont,
      };
    }
    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  public async initFriends() {
    const result = await chatHttp.post(YCHttpInterfaceEnum.queryAllFriend);
    if (result.rst) {
      const friends = [];
      const friendInfoList = result.cont as YCFriendInfo[];
      friendInfoList.forEach((item) => {
        friends.push(
          new YCFriend({
            uuid: item.uuid,
            friendUuid: item.friendUuid,
            portraitUri: item.portraitUri,
            nickname: item.nickname,
            gender: item.gender,
            account: item.account,
            displayName: item.displayName,
            onlineSt: item.onlineSt,
            lastLoginTip: item.lastLoginTip,
            lastLoginTime: item.lastLoginTime,
            createTime: item.createTime,
            message: item.message,
            msgst: item.msgst,
          })
        );
      });
      this._friends = friends;
    } else {
      throw new Error(`初始化好友列表失败，详细信息: ${result.msg}`);
    }
  }

  // 添加好友申请
  public async addFriend(
    friendId: string,
    message: string
  ): Promise<{
    status: boolean;
    msg: string;
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.addFriend, {
      message,
      uuid: friendId,
    });
    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  // 获取申请列表 TODO
  public async applyList(): Promise<{
    status: boolean;
    msg: string;
    cont: []
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.applyList, {});
    return {
      status: result.rst,
      msg: result.msg,
      cont: result.cont
    };
  }

  // 处理申请列表 TODO
  public async applyDeal(msgst: number, uuid:string): Promise<{
    status: boolean;
    msg: string;
    cont: []
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.applyDeal, {
      msgst,
      uuid
    });
    return {
      status: result.rst,
      msg: result.msg,
      cont: result.cont
    };
  }

  // 根据账号查找好友
  public async findFriendByAccount(account: string): Promise<{
    status: boolean;
    msg: string;
    details?: YCUserDetails;
  }> {
    const result = await chatHttp.post(
      YCHttpInterfaceEnum.getFriendInfoByAccount,
      {
        account,
      }
    );
    // 查找成功
    if (result.rst) {
      return {
        status: result.rst,
        msg: result.msg,
        details: result.cont,
      };
    }
    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  // 上传媒体资源至阿里OSS
  public async upLoadMediaResource(filePath: string, uploadProgress?: (p: any) => void) {
    // const result = await chatHttp.post(YCHttpInterfaceEnum.getAliOssSts);
    // const {accessKeyId, accessKeySecret, bucketName, endpoint, expiration, securityToken} = result.cont;

    // AliyunOSS.enableOSSLog();
    // const config = {
    //   AccessKey: accessKeyId,  // your accessKeyId
    //   SecretKey: accessKeySecret, // your accessKeySecret
    //   SecretToken: securityToken, // your securityToken
    // };
    // const endPoint = endpoint; // your endPoint
    // // 初始化阿里云组件
    // AliyunOSS.initWithKey(config, endPoint);
    // // upload config
    // const uploadConfig = {
    //   bucketName: bucketName,  //your bucketName
    //   sourceFile: filePath, // local file path
    //   ossFile: '' // the file path uploaded to oss
    // };
    // // 上传进度
    // uploadProgress = uploadProgress || function (p) {
    //   console.log(p.currentSize / p.totalSize);
    // };
    // // 增加上传事件监听
    // AliyunOSS.addEventListener('uploadProgress', uploadProgress);
    // // 执行上传
    // await AliyunOSS.uploadObjectAsync(uploadConfig);
    // // 去除事件监听
    // AliyunOSS.removeEventListener('uploadProgress', uploadProgress);
  }

  // 创建群聊
  public async createGroupChat(options: createGroupChatOptions): Promise<{
    group: YCGroup;
    conversation: YCConversation;
  }> {
    // 1. 创建群组
    const result = await chatHttp.post(
      YCHttpInterfaceEnum.createGroupChat,
      options
    );
    // 修改成功
    if (result.rst) {
      const group = new YCGroup({
        name: result.cont.name,
        portraitUri: result.cont.portraitUri,
        uuid: result.cont.uuid,
        memberCount: result.cont.memberCount,
        maxMemberCount: result.cont.maxMemberCount,
        creatorUuid: result.cont.creatorUuid,
        canShowAllMember: result.cont.canShowAllMember,
        canAddManagerFriend: result.cont.canAddManagerFriend,
        canAddFriend: result.cont.canAddFriend,
        allCanSay: result.cont.allCanSay,
      });
      this.groups.push(group);
      const conversation = this.owner.createConversation(
        group.id,
        ConversationType.GROUP
      );
      return {
        group,
        conversation,
      };
    }
  }

  // 修改密码
  public async updatePassword(
    options: updatePasswordOptions
  ): Promise<{ status: boolean; msg: string }> {
    const result = await chatHttp.post(
      YCHttpInterfaceEnum.updatePassword,
      options
    );
    // 修改成功
    if (result.rst) {
      this['_password'] = options.newPwd;
    }
    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  // 忘记密码
  public async forgetPassword(
    options: forgetPasswordOptions
  ): Promise<{ status: boolean; msg: string }> {
    const result = await chatHttp.post(
      YCHttpInterfaceEnum.forgotPassword,
      options
    );
    // 修改成功
    if (result.rst) {
      this['_password'] = options.newPwd;
    }
    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  // 获取发现页列表
  public async getFindList(): Promise<{
    status: boolean;
    msg: string;
    findList?: FindListType;
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.getFindLink, {});
    // 修改成功
    if (result.rst) {
      return {
        status: result.rst,
        msg: result.msg,
        findList: result.cont,
      };
    }
    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  // 修改用户信息
  public async updateSelfInfo(
    type: YCUserInfoTypeEnum,
    value: string
  ): Promise<{ status: boolean; msg: string }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.updateInfo, {
      type,
      value,
    });

    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  // 批量修改用户信息
  public async batchUpdateSelfInfo(
    gender: string,
    nickname: string,
    portraitUri: string
  ): Promise<{ status: boolean; msg: string }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.batchUpdateInfo, {
      gender,
      nickname,
      portraitUri,
    });

    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  // 查询用户信息
  public async querySelfInfo(): Promise<{
    status: boolean;
    msg: string;
    info?: YCUserDetails;
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.updatePassword, {
      uuid: this.id,
    });
    // 修改成功
    if (result.rst) {
      return {
        status: result.rst,
        msg: result.msg,
        info: result.cont,
      };
    }
    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  // 查询表情列表
  public async queryMemeList(): Promise<{
    status: boolean;
    msg: string;
    list?: {
      path: string;
      uuid: string;
    }[];
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.updatePassword);
    if (result.rst) {
      return {
        status: result.rst,
        msg: result.msg,
        list: result.cont || [],
      };
    }
    return {
      status: result.rst,
      msg: result.msg,
    };
  }

  // 根据好友ID获取好友
  public getFriend(friendId: string): YCFriend {
    return this.friends.find((friend) => friend.id === friendId);
  }

  // 根据群组ID获取群组
  public getGroup(groupId: string): YCGroup {
    return this.groups.find((group) => group.id === groupId);
  }

  // 根据群组ID获取成员
  public async showMember(groupId: string, page: number, size: number): Promise<{
    status: boolean;
    msg: string;
    cont: [];
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.showMember, {
      groupId,
      page,
      size
    });
    if (result.rst) {
      return {
        status: result.rst,
        msg: result.msg,
        cont: result.cont
      }
    } else {
      throw new Error(`获取群成员失败，详细信息: ${result.msg}`);
    }
  }

  // 增加群成员
  public async addMember(groupId: string, memberId: string[]): Promise<{
    status: boolean;
    msg: string;
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.addMember, {
      groupId,
      memberId
    });
    console.log(result);
    if (result.rst) {
      return {
        status: result.rst,
        msg: result.msg
      }
    } else {
      throw new Error(`增加群成员失败，详细信息: ${result.msg}`);
    }
  }

  // 删除群成员
  public async removeMember(groupId: string, memberId: string[]): Promise<{
    status: boolean;
    msg: string;
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.removeMember, {
      groupId,
      memberId
    });
    console.log(result);
    if (result.rst) {
      return {
        status: result.rst,
        msg: result.msg
      }
    } else {
      throw new Error(`删除群成员失败，详细信息: ${result.msg}`);
    }
  }

  // 退出群
  public async quitGroupChat(groupId: string): Promise<{
    status: boolean;
    msg: string;
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.quitGroupChat, {
      groupId
    });
    console.log(result);
    if (result.rst) {
      return {
        status: result.rst,
        msg: result.msg
      }
    } else {
      throw new Error(`退出群失败，详细信息: ${result.msg}`);
    }
  }

  // 更新群公告
  public async updateGroupNotice(groupId: string, groupNotice: string): Promise<{
    status: boolean;
    msg: string;
  }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.updateGroupNotice, {
      groupId,
      groupNotice
    });
    console.log(result);
    if (result.rst) {
      return {
        status: result.rst,
        msg: result.msg
      }
    } else {
      throw new Error(`更新群公告失败，详细信息: ${result.msg}`);
    }
  }


  public async initGroups() {
    const result = await chatHttp.post(YCHttpInterfaceEnum.getAllGroups);
    if (result.rst) {
      const groups = [];
      const groupInfoList = result.cont as YCGroupInfo[];
      groupInfoList && groupInfoList.forEach((item) => {
        groups.push(
          new YCGroup({
            name: item.name,
            portraitUri: item.portraitUri,
            uuid: item.uuid,
            memberCount: item.memberCount,
            maxMemberCount: item.maxMemberCount,
            creatorUuid: item.creatorUuid,
            canShowAllMember: item.canShowAllMember,
            canAddManagerFriend: item.canAddManagerFriend,
            canAddFriend: item.canAddFriend,
            allCanSay: item.allCanSay,
          })
        );
      });
      this._groups = groups;
    } else {
      throw new Error(`初始化群组失败，详细信息: ${result.msg}`);
    }
  }

  // TODO
  public async initSelfInfo() {
    const result = await chatHttp.post(YCHttpInterfaceEnum.queryUserInfo);
    if (result.rst) {
      this._nickname = result.cont.nickname;
      this._photoUrl = result.cont.portraitUri;
      this._gender = result.cont.gender;
    } else {
      throw new Error(`初始化个人信息，详细信息: ${result.msg}`);
    }
  }
}

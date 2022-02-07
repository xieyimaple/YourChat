/**
 * @module chat
 * @description 此模块为好友模块
 */

import { YCObject } from './base';
import { chatHttp, YCHttpInterfaceEnum } from './http';

type YCYesOrNoType = 'YES' | 'NO';

export type YCFriendInfo = {
  nickname: string;
  uuid: string;
  portraitUri: string;
  gender: 'female' | 'male';
  onlineSt: YCYesOrNoType;
  displayName: string;
  account: string;
  lastLoginTip: string;
  lastLoginTime: string;
  friendUuid: string;
  createTime: string;
  message: string;
  msgst: number;
};

export class YCFriend extends YCObject {
  private _id?: string;
  private _friendId: string;
  private _portraitUri?: string;
  private _nickname: string;
  private _gender: 'female' | 'male';
  private _account: string;
  private _displayName: string;
  private _online: YCYesOrNoType;
  private _lastLoginTip: string;
  private _lastLoginTime: string;
  private _createTime: string;
  private _message: string;
  private _msgst: number;

  get id(): string {
    return this._id;
  }

  get friendId(): string {
    return this._friendId;
  }

  get createTime(): string {
    return this._createTime;
  }

  get message(): string {
    return this._message;
  }

  get msgst(): number {
    return this._msgst;
  }

  get portraitUri(): string {
    return this._portraitUri;
  }

  get lastLoginTip(): string {
    return this._lastLoginTip;
  }

  get lastLoginTime(): string {
    return this._lastLoginTime;
  }

  // get 访问器：获取当前用户的昵称
  get nickname(): string {
    return this._nickname;
  }

  // get 访问器：获取当前用户的性别
  get gender(): 'female' | 'male' {
    return this._gender;
  }

  // get 访问器：获取当前用户的账号名
  get account(): string {
    return this._account;
  }

  // get 访问器：获取当前用户的备注名
  get displayName(): string {
    return this._displayName;
  }

  // get 访问器：获取当前用户的备注名
  set displayName(value: string) {
    this._displayName = value;
  }

  // get 访问器：获取当前用户的备注名
  get online(): YCYesOrNoType {
    return this._online;
  }

  // get 访问器：获取当前用户的备注名
  set online(value: YCYesOrNoType) {
    this._online = value;
  }

  // 构造函数
  constructor(options: YCFriendInfo) {
    const {
      nickname,
      uuid,
      portraitUri,
      gender,
      onlineSt,
      displayName,
      account,
      lastLoginTip,
      lastLoginTime,
      friendUuid,
      createTime,
      message,
      msgst,
    } = options;

    super();
    this._id = uuid;
    this._friendId = friendUuid;
    this._portraitUri = portraitUri;
    this._nickname = nickname;
    this._gender = gender;
    this._account = account;
    this._displayName = displayName;
    this._online = onlineSt;
    this._lastLoginTip = lastLoginTip;
    this._lastLoginTime = lastLoginTime;
    this._createTime = createTime;
    this._message = message;
    this._msgst = msgst;
  }

  // 更新好友信息
  public updateInfo() {}

  // 删除该好友的聊天记录
  public deleteChatRecord() {}

  public async setDisplayName(
    displayName: string
  ): Promise<{ status: boolean; msg: string }> {
    const result = await chatHttp.post(YCHttpInterfaceEnum.setDisplayName, {
      uuid: this.id,
      displayName,
    });
    if (result.rst) {
      this.displayName = displayName;
    }
    return {
      status: result.rst,
      msg: result.msg,
    };
  }
}

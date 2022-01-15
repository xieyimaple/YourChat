/**
 * @module chat
 * @description 此模块为好友模块
 */

import { YCObject } from './base';

type YCFriendInfo = {
	name: string;
	id?: string;
	password?: string;
	photoUrl?: string;
	photoPath?: string;
	active?: boolean;
};

export class YCFriend extends YCObject {
	private _id?: string;
	private _name: string;
	private _active = false;
	private _password?: string;
	private _photoUrl?: string;
	private _photoPath?: string;

	// get 访问器：获取好友id
	get id(): string {
		return this._id;
	}

	// get 访问器：获取好友用户名
	get name(): string {
		return this._name;
	}

	// get 访问器：获取好友头像URL
	get photoUrl(): string {
		return this._photoUrl;
	}

	// get 访问器：获取好友头像路径
	get photoPath(): string {
		return this._photoPath;
	}

	// get 访问器：获取好友头像
	get photo(): string {
		return this.photoPath || this.photoUrl || '默认头像';
	}

	// get 访问器：获取当前好友的激活状态（即是否进入聊天界面）
	get active(): boolean {
		return this._active;
	}

	// 构造函数
	constructor({ id = '', name, password = '', active = false, photoUrl = '', photoPath = '' }: YCFriendInfo) {
		super();
		this._id = id;
		this._name = name;
		this._password = password;
		this._active = active;
		this._photoUrl = photoUrl;
		this._photoPath = photoPath;
	}

	// 将用户信息转为JSON格式，用于进程间通信或者数据发送
	public toJson(): string {
		return JSON.stringify({
			id: this.id,
			name: this.name,
			photo: this.photo
		});
	}

	// 更新好友信息
	public updateInfo() {}

	// 删除该好友的聊天记录
	public deleteChatRecord() {}
}

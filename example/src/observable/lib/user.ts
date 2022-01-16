/**
 * @module user
 * @description 此模块为用户相关类，主要功能为用户信息的获取（用户名、头像、好友列表，与好友建立长连接通信等等）
 */
import { chatHttp, YCHttpInterfaceEnum } from './http';
import { YCObject } from './base';
import type { YCChat } from './chat';
import type { YCFriend } from './friend';

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
}

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
	region?: string;	// 国别号
	vcode?: string;	// 图片验证码内容
	vtoken?: string; // 图片验证码token

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

	private _currentChattingFriend: YCFriend;
	private _chatList: YCFriend[];

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

	// get 访问器：获取当前正在聊天的
	get currentChattingFriend(): YCFriend {
		return this._currentChattingFriend;
	}

	// get 访问器：获取用户名
	set currentChattingFriend(value: YCFriend) {
		this._currentChattingFriend = value;
	}

	// get 访问器：获取用户的聊天列表，用以显示界面上
	get chatList(): YCFriend[] {
		return this._chatList;
	}

	// 构造函数
	constructor(owner: YCChat, { id = '', name, password = '', logined = false, photoUrl = '', photoPath = '' }: YCUserInfo) {
		super();
		this._id = id;
		this._name = name;
		this._password = password;
		this._logined = logined;
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
	public deleteFriend() {}

	// 添加好友
	public addFriend() {}

	// 创建群聊
	public createGroupChat() {
		// 1. 创建群组

		// 2. 创建群组会话（用以在界面显示，群组会话保存在owner的conversationList属性上）
	}

	// 修改密码
	public async updatePassword(options: updatePasswordOptions): Promise<{ status: boolean; msg: string }> {
		const result = await chatHttp.post(YCHttpInterfaceEnum.updatePassword, options);
		// 修改成功
		if (result.rst) {
			this['_password'] = options.newPwd;
		}
		return {
			status: result.rst,
			msg: result.msg
		};
	}
}

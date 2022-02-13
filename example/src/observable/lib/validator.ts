/**
 * @module chat
 * @description 此模块为整个聊天软件的验证器模块，负责登录，注销，构建等功能。
 */
import { YCObject } from './base';
import { chatHttp, YCHttpInterfaceEnum, YCHttpResultType, YCResultExt } from './http';
import type { YCChat } from './chat';
import { YCUser, YCUserDetails } from './user';
import sha1 from 'sha1';

export type YCRegisterFields = {
	cname: any;
	intro: object;
	must: string;
	regx: string;
	uuid: boolean;
	weight: boolean;
};

export type YCRegisterFieldsInfo = {
	cont: YCRegisterFields[];
} & YCResultExt;

export type YCRegisterResult = {
	cont: YCUserDetails;
} & YCResultExt;

export type YCRegisterOptions = {
	account: string;
	password: string;
	passwordHash?: string;
	birthday?: string;
	email?: string;
	fuuid?: string;
	gender?: string;
	incode?: string;
	linkPwd?: string;
	nickname?: string;
	paypwd?: string;
	pcode?: string;
	phone?: string;
	portraitUri?: string;
	ptoken?: string;
	qqnum?: string;
	realname?: string;
	regPwd?: string;
	region?: string;
	upAcc?: string;
	wechat?: string;
};

export class YCValidator extends YCObject {
	private _userList: YCUser[] = [];
	private _owner: YCChat;

	constructor(owner: YCChat) {
		super();
		this._owner = owner;
	}

	get userList(): YCUser[] {
		return this._userList;
	}

	get owner(): YCChat {
		return this._owner;
	}

	// 加密 sha1
	private encryption(str: string): string {
		return sha1(str);
	}

	private async getAppKeyAndToken(): Promise<{
		status: boolean,
		msg: string
		uuid?: string;
		appKey?: string;
		rongCloudToken?: string;
	}> {
		const result = await chatHttp.post(YCHttpInterfaceEnum.getAppKeyAndToken, {});
		if (result.rst) {
			return {
				status: result.rst,
				msg: result.msg,
				uuid: result.cont.uuid,
				appKey: result.cont.key,
				rongCloudToken: result.cont.token,
			};
		}
		return {
			status: result.rst,
			msg: result.msg
		};
	}

	/**
	 * @method login
	 * @param {string} username 用户名
	 * @param {string} password 用户名密码
	 * @param {YCUser} user 是否已有用户（未登录）
	 * @returns {User} 当前已登录用户对象
	 * @description 登录
	 */
	public async login(username: string, password: string, user?: YCUser): Promise<{ status: boolean; msg: string, user?: YCUser }> {
		// 1. 登录
		const result = await chatHttp.post(YCHttpInterfaceEnum.login, {
			acc: username,
			pwd: password
		});

		if (result.rst) {
			console.log(result.cont);
			// 2. 登陆成功，设置token
			const { tk } = result.cont;
			chatHttp.token = tk;
			console.log(`tk: ${chatHttp.token}`);

			// 3. 设置好token，请求接口获取融云appKey,rongCloudToken,uuid
			const { uuid, appKey, rongCloudToken } = await this.getAppKeyAndToken();
			console.log(`uuid: ${uuid}`);
			console.log(`appKey: ${appKey}`);
			console.log(`rongCloudToken: ${rongCloudToken}`);
			if (!user) {
				user = new YCUser(this.owner, { name: username })
			}
			user['_id'] = uuid;
			user['_account'] = username;
			user['_password'] = password;
			user['_logined'] = true;
			user['_photoUrl'] = result.cont.portraitUri;
			user.gender = result.cont.gender;
			user.nickname = result.cont.nickname;
			this.owner.currentUser = user;

			try {
				const userId = await this.owner.client.init(appKey, rongCloudToken);
				console.log(`userId: ${userId}`);
			} catch (error) {
				console.log(error);
			}

			return {
				status: result.rst,
				msg: result.msg,
				user
			};
		}
		return {
			status: result.rst,
			msg: result.msg
		}
	}

	// 上传图片
	public async upLoadImageResource(options: {}): Promise<{ 
		status: boolean;
		msg: string;
		cont: {}
	}> {
		const result = await chatHttp.uploadResources(
		  YCHttpInterfaceEnum.upLoadImageResource,
		  options,
		  {
			'Content-Type': 'multipart/form-data'
		  }
		);
		return {
		  status: result.rst,
		  msg: result.msg,
		  cont: result.cont
		};
	}

	/**
	 * @method logout
	 * @description 注销
	 */
	public async logout(isReceivePush?: boolean): Promise<{ status: boolean; msg: string }> {
		// 1. 与融云SDK断开socket连接
		this.owner.client.disconnect(isReceivePush);

		// 2. 调注销接口（成功后设置token为''）
		const result = await chatHttp.post(YCHttpInterfaceEnum.logout, {});
		if (result.rst) {
			chatHttp.token = '';
		}

		// 3. 关闭数据库
		this.owner.database.close();
		this.owner.databaseSchemaList = [];
		
		return {
			status: result.rst,
			msg: result.msg
		};
	}

	/**
	 * @method getRegisterInfo
	 * @description 获取注册时需要用户提交的信息
	 */
	public async getRegisterInfo(): Promise<YCRegisterFieldsInfo> {
		const result: YCHttpResultType = await chatHttp.post(YCHttpInterfaceEnum.registerInfo);
		return {
			cont: result.cont,
			ext: result.ext,
			msg: result.msg,
			param: result.param,
			rst: result.rst
		}
	}

	/**
	 * @method register
	 * @description 注册
	 */
	public async register(option: YCRegisterOptions): Promise<{ status: boolean; msg: string }> {
		option.passwordHash = option.password;
		// option.passwordHash = this.encryption(option.password);
		console.log(option.passwordHash);
		delete option.password;
		const result = await chatHttp.post(YCHttpInterfaceEnum.register, {
			...option
		});
		return {
			status: result.rst,
			msg: result.msg
		}
	}
}

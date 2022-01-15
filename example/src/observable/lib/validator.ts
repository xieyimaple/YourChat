/**
 * @module chat
 * @description 此模块为整个聊天软件的验证器模块，负责登录，注销，构建等功能。
 */

import { chatHttp, YCHttpInterfaceEnum } from './http';
import { YCChat } from './chat';
import { YCObject } from './base';
import { YCUser } from './user';

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
		return str;
	}

	private getAppKey(): string {
		return '';
	}

	/**
	 * @method login
	 * @param {string} username 用户名
	 * @param {string} password 用户名密码
	 * @param {YCUser} user 是否已有用户（未登录）
	 * @returns {User} 当前已登录用户对象
	 * @description 登录
	 */
	public async login(username: string, password: string, user?: YCUser): Promise<YCUser> {
		const result: any = await chatHttp.post(YCHttpInterfaceEnum.login, {
			username,
			password: this.encryption(password)
		});
		const userId = await this.owner.client.init(this.getAppKey(), result.token);
		this.owner.currentUser = user = user || new YCUser(this.owner, { id: userId, name: username, password, photoUrl: result.photoUrl, logined: true });
		return this.owner.currentUser;
	}

	/**
	 * @method logout
	 * @description 注销
	 */
	public async logout(isReceivePush?: boolean | undefined): Promise<void> {
		this.owner.client.disconnect(isReceivePush);
		await chatHttp.get(YCHttpInterfaceEnum.logout);
	}

	/**
	 * @method getRegisterInfo
	 * @description 获取注册时需要用户提交的信息
	 */
	public async getRegisterInfo(): Promise<void> {
		return;
	}

	/**
	 * @method register
	 * @description 注册
	 */
	public async register(option: Record<string, string>): Promise<boolean> {
		await chatHttp.post(YCHttpInterfaceEnum.register, {
			...option
		});
		return true;
	}
}

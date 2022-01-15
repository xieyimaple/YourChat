/**
 * @module chat
 * @description 此模块为所有类的基类，维护所有类通用的公共属性，公共方法。
 */

import { YCObject } from './base';

export enum YCHttpInterfaceEnum {
	getVersion = '/kkrp/app_version/find', // 获取版本
	login = '/kkrp/member/login', // 登录
	logout = '/kkrp/member/logout', //注销
	registerInfo = '/kkrp/member/fields', // 获取注册所需信息
	register = '/kkrp/member/register', // 注册
	updatePassword = '/kkrp/member/reset_old_pwd', // 换密码
	forgotPassword = '/kkrp/member/reset_pwd', // 忘记密码
	resetPwd = '/kkrp/member/reset_pwd_sms', // 重置密码
	queryUserInfo = '/kkrp/member/info', // 查询用户信息
	registerVerification = '/kkrp/member/regPwd', // 注册验证
	registerSMS = '/kkrp/member/reg_sms', // 注册短信
	addFriend = '/kkrp/member/friend/apply_msg', // 添加好友
	getFriendInfoByAccount = '/kkrp/member/friend/find_friend', // 根据账号搜索好友
	queryAllFriend = '/kkrp/member/friend/list', // 查询所有好友
	quitGroupChat = '/kkrp/im_group/group_quit', // 退出群聊
	createGroupChat = '/kkrp/im_group/create_group' // 创建群聊
}

class YCHttp extends YCObject {
	private _baseUrl = 'http://api.efhgrihvwe-ioh3dmqgt6.com';
	private _token = '';
	private _lastResponse = '';

	get baseUrl(): string {
		return this._baseUrl;
	}

	set baseUrl(value: string) {
		this._baseUrl = value;
	}

	get token(): string {
		return this._token;
	}

	set token(value: string) {
		this._token = value;
	}

	// 最后一次的请求返回头
	get lastResponse(): string {
		return this._lastResponse;
	}

	public async post(path: YCHttpInterfaceEnum, content: Record<string, string>, headers?: Headers | string[][] | { [key: string]: string }, queryParams?: string) {
		this.verifyParams();
		try {
			const result = await fetch(`${this.baseUrl}${path}${queryParams}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					...headers
				},
				body: JSON.stringify(content)
			});
			this._lastResponse = JSON.stringify(result);
			return result;
		} catch (error) {
			console.log(`Post ${this.baseUrl}${path} Error`);
			console.log(error);
			throw error;
		}
	}

	public async get(path: YCHttpInterfaceEnum, queryParams?: string) {
		this.verifyParams();
		try {
			const result = await fetch(`${this.baseUrl}${path}${queryParams}`);
			this._lastResponse = JSON.stringify(result);
			return result;
		} catch (error) {
			console.log(`Get ${this.baseUrl}${path} Error`);
			console.log(error);
			throw error;
		}
	}

	protected verifyParams(): boolean {
		// 相关的前置验证
		if (!this._baseUrl) {
			throw new Error('缺少关键参数baseUrl');
		}
		return true;
	}
}

export const chatHttp = new YCHttp();

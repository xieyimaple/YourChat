/**
 * @module chat
 * @description 此模块为所有类的基类，维护所有类通用的公共属性，公共方法。
 */
 import { YCObject } from './base';
import sha1 from 'sha1';
import { API_VER, CLIENT, CLIENT_TYPE, CLIENT_VER } from '../../utils';
import md5 from 'md5';

export enum YCHttpInterfaceEnum {
	getAppKeyAndToken = '/kkrp/ryim/get_token', // 获取appKey和Token
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
	deleteFriend = '/kkrp/member/friend/delete_friend', // 删除好友
	getFriendInfoByAccount = '/kkrp/member/friend/find_friend', // 根据账号搜索好友
	queryAllFriend = '/kkrp/member/friend/list', // 查询所有好友
	quitGroupChat = '/kkrp/im_group/group_quit', // 退出群聊
	createGroupChat = '/kkrp/im_group/create_group', // 创建群聊
	getFindLink = '/kkrp/linkset/findLink', // 获取发现页列表
	setDisplayName = '/kkrp/member/friend/set_display_name', // 设置备注
	updateInfo = '/kkrp/member/update', // 修改头像、昵称、性别、个性签名
	batchUpdateInfo = '/kkrp/member/update', // 批量修改头像、昵称、性别
	getMeme = '/kkrp/user_picture/list_all', // 获取表情列表
	getAllGroups = '/kkrp/im_group/show_groups', // 获取用户所有群组
	getAliOssSts = '/kkrp/ali_oss/sts', // 获取ali-oss sts
	upLoadImageResource = '/hx_file/file/upload/nenc',  // 上传图片 TODO
	applyList = '/kkrp/member/friend/apply_list', // 获取申请列表 TODO
	applyDeal = '/kkrp/member/friend/apply_deal', // 处理申请记录 TODO
	showMember = '/kkrp/im_group/show_member', // 获取群成员（分页） TODO
	addMember = '/kkrp/im_group/group_add_member', // 群增加成员
	removeMember = '/kkrp/im_group/group_remove_member', //群删除成员
	updateGroupNotice = '/kkrp/im_group/update_notice', // 更新群公告
	groupTransfer = '/kkrp/im_group/group_transfer', // 转让群主
}

export type YCResultExt = {
	ext?: object;
	msg?: string;
	param?: string;
	rst?: boolean;
}

export enum YCHttpResponseCodeEnum {
	ok = '200',
	created = '201',
	unauthorized = '401',
	forbidden = '403',
	notFound = '404'
};

export type YCHttpResultType = {
	code: YCHttpResponseCodeEnum;
	cont: any;
	ext?: object;
	msg?: string;
	param?: string;
	rst?: boolean;
};

class YCHttp extends YCObject {
	private _baseUrl = 'http://api.new689collection88.com';
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

	private _objKeySort(obj) { //排序的函数
		var newkey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
		var newObj =  {}; //创建一个新的对象，用于存放排好序的键值对

		for(var i = 0; i < newkey.length; i++) { //遍历newkey数组

			newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对

		}
		return newObj; //返回排好序的新对象
	}

	public async post(path: YCHttpInterfaceEnum, content?: Record<string, any>, headers?: Headers | string[][] | { [key: string]: string }, queryParams: string = '') {
		this.verifyParams();
		const times = (new Date()).getTime();
		if (content) {
			content = {
				apiVer: API_VER,
				client: CLIENT,
				clientType: CLIENT_TYPE,
				clientVer: CLIENT_VER,
				cont: content,
				ext: {},
				key: sha1('andriod').toUpperCase(),
				timestamp: `${times}`,
				sign: md5(`apiVer=${API_VER}&clientType=${CLIENT_TYPE}&clientVer=${CLIENT_VER}&timestamp=${times}&key=${sha1('andriod').toUpperCase()}&cont=${JSON.stringify(this._objKeySort(content))}`).toUpperCase()
			}
		}

		console.log(content);
		
		try {
			const response = await fetch(`${this.baseUrl}${path}${queryParams}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					"Authorization": this.token ? `Bearer ${this.token}` : '',
					...headers
				},
				body: content ? JSON.stringify(content) : '{}'
			});
			const result: YCHttpResultType = await response.json();
			this._lastResponse = JSON.stringify(result);
			if (result.code !== YCHttpResponseCodeEnum.ok) {
				console.log(result.msg);
				throw new Error(`请求失败: code: ${result.code}, msg: ${result.msg}`);
			}
			return result;
		} catch (error) {
			console.log(`Post ${this.baseUrl}${path} Error`);
			console.log(error);
			throw error;
		}
	}

	public async uploadResources(path: YCHttpInterfaceEnum, content?: Record<string, any>, headers?: Headers | string[][] | { [key: string]: string }, queryParams: string = '') {
		this.verifyParams();
		
		try {
			let param = new FormData();
			param.append('file', content.image);
			const response = await fetch(`${this.baseUrl}${path}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
					...headers
				},
				body: param
			});
			const result: YCHttpResultType = await response.json();
			this._lastResponse = JSON.stringify(result);
			if (result.code !== YCHttpResponseCodeEnum.ok) {
				console.log(result.msg);
				throw new Error(`请求失败: code: ${result.code}, msg: ${result.msg}`);
			}
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

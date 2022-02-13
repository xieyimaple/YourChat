/**
 * @module chat
 * @description 此模块为整个聊天软件的单例对象
 */

import { YCObject } from './base';
import { YCConfig } from './config';
import { YCConversation, YCConversationOptions, YCGroupConversation, YCGroupConversationOptions, YCPrivateConversation } from './conversation';
import { YCRongCloudServe } from './rongCloudServe';
import type { YCUser } from './user';
import { YCValidator } from './validator';
import { chatHttp, YCHttpInterfaceEnum } from './http';
import { ConversationType, ObjectName, SentStatus } from '@rongcloud/react-native-imlib';
import type { YCFriend } from '..';
import type { YCGroup } from './group';
import { YCRealm } from './realm';

let chat: YCChat;

export class YCChat extends YCObject {
	private _currentUser: YCUser;
	private _currentConversation: YCConversation;
	private _validator: YCValidator;
	private _config: YCConfig;
	private _client: YCRongCloudServe;
	private _conversationList: YCConversation[] = [];
	private _database: YCRealm;
	private _databaseSchemaList: Realm.ObjectSchema[] = [];

	get currentUser(): YCUser {
		return this._currentUser;
	}

	get currentConversation(): YCConversation {
		return this._currentConversation;
	}

	set currentConversation(value: YCConversation) {
		this._currentConversation = value;
	}

	set currentUser(value: YCUser) {
		this._currentUser = value;
	}

	get validator(): YCValidator {
		return this._validator;
	}

	get config(): YCConfig {
		return this._config;
	}

	get client(): YCRongCloudServe {
		return this._client;
	}

	get conversationList(): YCConversation[] {
		return this._conversationList;
	}

	get privateConversationList(): YCConversation[] {
		return this.conversationList.filter(conversation => {
			return conversation.type === 'private';
		});
	}

	get groupConversationList(): YCConversation[] {
		return this.conversationList.filter(conversation => {
			return conversation.type === 'group';
		});
	}

	get conversationListTableName(): string {
		return `${this.currentUser.id}_ConversationList`;
	}

	get database(): YCRealm {
		return this._database;
	}

	set database(value: YCRealm) {
		this._database = value;
	}

	get databaseSchemaList() :Realm.ObjectSchema[] {
		return this._databaseSchemaList;
	}

	set databaseSchemaList(value: Realm.ObjectSchema[]) {
		this._databaseSchemaList = value;
	}

	constructor() {
		super();
		this._validator = new YCValidator(this);
		this._config = new YCConfig();
		this._client = new YCRongCloudServe(this);
	}

	public async init() {
		console.log('准备加载会话列表');
		await this.loadConversationList();
		console.log('会话列表加载完成');
	}

	// 加载数据库数据表--会话列表
	public async loadConversationList() {
		// 1.1 定义一个realm数据库的表结构
		const ConversationListSchema = {//定义会话列表数据表结构
			name: this.conversationListTableName, // 表名称
		  
			primaryKey: 'id', // 主键
		    
			// 表字段
			properties: {
				// 消息唯一标识符 indexed表示此属性可以被索引，支持int, string, bool类型值
				id: {
				  	type: 'string', indexed: true
				},
		  
				conversationType: 'int',
		  
				conversationTitle: 'string',
		  
				isTop: {
					type: 'bool',
					defaultValue: false
				},
		  
				unreadMessageCount: 'int', 
		  
				draft: 'string', 

				targetId: 'string', 

				objectName: 'string', 

				receivedStatus: 'int',

				receivedTime: 'int',

				sentStatus: 'int',

				type: 'string',

				extra: 'string',

				senderUserId: {
					type: 'string',
					optional: true
				},

				hasUnreadMentioned: {
					type: 'bool',
					optional: true,
					defaultValue: false
				},

				mentionedCount: {
					type: 'int',
					optional: true
				}
			}
		};
		this.databaseSchemaList.push(ConversationListSchema);
		this._database = new YCRealm({
			schema: this.databaseSchemaList,
			deleteRealmIfMigrationNeeded: true,
			inMemory: false
		});
		console.log(`数据库路径`);
		console.log(this.database.realm.path);

		const results = await this.database.queryAllFromRealm(ConversationListSchema.name);
		console.log(`查询完毕, result:`);
		console.log(results);

		// await this._database.createTable([aaaa]);
		// const re = this._database.queryAllFromRealm(aaaa.name);
		// console.log(re);

		// const res = this._database.queryAllFromRealm(ConversationListSchema.name);
		// console.log(res);

		results.forEach(async item => {
			let conversation: YCConversation;

			if (item.type === 'private') {
				const data = item as YCConversationOptions;
				conversation = new YCPrivateConversation(this, {
					id: data.id,
					conversationType: ConversationType.PRIVATE, // 会话类型
					conversationTitle: data.conversationTitle, // 会话标题（私人会话一般就是好友的昵称或者网名）
					isTop: data.isTop, // 会话是否置顶
					unreadMessageCount: data.unreadMessageCount, // 未读消息数目
					draft: data.draft, // 草稿消息
					targetId: data.targetId, // userId或者groupId
					objectName: data.objectName, // 最后一条消息的类型(默认为文本类型)
					receivedStatus: data.receivedStatus, // 消息接收状态
					receivedTime: data.receivedTime, // 接收消息的时间
					sentStatus: data.sentStatus, // 已发送（也是初始状态）
					type: 'private',
				})
			}

			if (item.type === 'group') {
				const data = item as YCGroupConversationOptions;
				conversation = new YCGroupConversation(this, {
					conversationType: ConversationType.GROUP, // 会话类型
					conversationTitle: data.conversationTitle, // 会话标题（私人会话一般就是好友的昵称或者网名）
					isTop: data.isTop, // 会话是否置顶
					unreadMessageCount: data.unreadMessageCount, // 未读消息数目
					draft: data.draft, // 草稿消息
					targetId: data.targetId, // userId或者groupId
					objectName: data.objectName, // 最后一条消息的类型(默认为文本类型)
					receivedStatus: data.receivedStatus, // 消息接收状态
					receivedTime: data.receivedTime, // 接收消息的时间
					sentStatus: data.sentStatus, // 已发送（也是初始状态）
					type: 'group',
					senderUserId: data.senderUserId, // 群组内当前消息发送者的userId
					hasUnreadMentioned: data.hasUnreadMentioned, // 群组内是否有未读的@
					mentionedCount: data.mentionedCount // 群组内未读@的数目
				});
			}
			
			if (!conversation) {
				return;
			}
			console.log(`会话生成完成, 准备初始化`);
			// 会话构造完成后，调用init方法，加载消息列表等等
			await conversation.init();

			console.log(`会话初始化完成`);

			this.conversationList.push(conversation);
		});
	}

	static getInstance() {
		if (!chat) {
			chat = new YCChat();
		}
		return chat;
	}

	public async getConversation(targetId: string, conversationType: ConversationType) {
		// 从会话列表中查找
		let targetConversation = this.conversationList.find(conversation => {
			return conversation.targetId === targetId;
		});
		// 没有则新建一个会话
		targetConversation = targetConversation || await this.createConversation(targetId, conversationType, '我们已经是好友啦，快一起来聊天吧~');
		return targetConversation;
	}

	public async getVersion() {
		chatHttp.post(YCHttpInterfaceEnum.getVersion, {});
	}

	public async createConversation(targetId: string, conversationType: ConversationType, firstMessage?: string) {
		console.log(`正在创建一个新的会话`);
		let target = conversationType === ConversationType.PRIVATE ? this.currentUser.getFriend(targetId) : this.currentUser.getGroup(targetId);
		if (!target) {
			throw new Error('目标好友或者目标群组不存在!');
		}
		let conversation: YCConversation;
		if (conversationType === ConversationType.PRIVATE) {
			target = target as YCFriend;
			const FMessage = firstMessage && {
				content: {
					content: firstMessage, 
					extra: "", 
					objectName: ObjectName.Text
				}, 
				conversationType: 1, 
				extra: "", 
				messageDirection: 2, 
				messageId: -1,
				messageUId: "", 
				objectName: "RC:TxtMsg",
				receivedStatus: 8,
				sentTime: new Date().getTime(), 
				receivedTime: new Date().getTime(), 
				senderUserId: "", 
				sentStatus: 0,
				targetId: targetId
			}
			conversation = new YCPrivateConversation(this, {
				conversationType: ConversationType.PRIVATE, // 会话类型
				conversationTitle: target.nickname, // 会话标题（私人会话一般就是好友的昵称或者网名）
				isTop: false, // 会话是否置顶
				unreadMessageCount: 0, // 未读消息数目
				draft: '', // 草稿消息
				targetId: targetId, // userId或者groupId
				objectName: ObjectName.Text, // 最后一条消息的类型(默认为文本类型)
				receivedStatus: 1, // 消息接收状态
				receivedTime: new Date().getTime(), // 接收消息的时间
				sentStatus: SentStatus.RECEIVED, // 已发送（也是初始状态）
				type: 'private',
			})
			conversation.messageList.push(FMessage);
		}

		if (conversationType === ConversationType.GROUP) {
			target = target as YCGroup;
			conversation = new YCGroupConversation(this, {
				conversationType: ConversationType.GROUP, // 会话类型
				conversationTitle: target.title, // 会话标题（私人会话一般就是好友的昵称或者网名）
				isTop: false, // 会话是否置顶
				unreadMessageCount: 0, // 未读消息数目
				draft: '', // 草稿消息
				targetId: targetId, // userId或者groupId
				objectName: ObjectName.Text, // 最后一条消息的类型(默认为文本类型)
				receivedStatus: 1, // 消息接收状态
				receivedTime: new Date().getTime(), // 接收消息的时间
				sentStatus: SentStatus.RECEIVED, // 已发送（也是初始状态）
				type: 'group',
				senderUserId: '', // 群组内当前消息发送者的userId
				hasUnreadMentioned: false, // 群组内是否有未读的@
				mentionedCount: 0, // 群组内未读@的数目
			});
		}
		console.log(`会话初始化`);
		await conversation.init();
		console.log(`会话初始化完成`);
		this._conversationList.unshift(conversation);
		console.log(`会话存入数据库`);
		// 创建完后存入数据库
		this.database.writeToRealm(conversation.serialize(), this.conversationListTableName);
		console.log(`会话存入数据库完成`);
		return conversation;
	}

	// 删除会话
	public async deleteConversation(conversationId: string) {
		// 1. 首先删除缓存中的消息
		for (let i = 0; i < this.conversationList.length; i++) {
			const item = this.conversationList[i]
			if (item.id === conversationId) {
				await item.clearAllMessage();
				this.conversationList.splice(i, 1);
				break;
			}
		}

		// 2. 删除数据库中的数据
		return await this.database.clearRowFromRealm(conversationId, this.conversationListTableName);
	}

	// 清除所有会话
	public async clearConversationList() {
		for (let i = 0; i < this.conversationList.length; i++) {
			const item = this.conversationList[i]
			await item.clearAllMessage();
		}

		this._conversationList = [];

		// 2. 删除数据库中的数据
		return await this.database.clearAllFromRealm(this.conversationListTableName);
	}
}

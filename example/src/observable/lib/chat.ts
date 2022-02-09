/**
 * @module chat
 * @description 此模块为整个聊天软件的单例对象
 */

import { YCObject } from './base';
import { YCConfig } from './config';
import { YCConversation, YCGroupConversation, YCPrivateConversation } from './conversation';
import { YCRongCloudServe } from './rongCloudServe';
import type { YCUser } from './user';
import { YCValidator } from './validator';
import { chatHttp, YCHttpInterfaceEnum } from './http';
import { ConversationType, ObjectName, SentStatus } from '@rongcloud/react-native-imlib';
import type { YCFriend } from '..';
import type { YCGroup } from './group';

let chat: YCChat;

export class YCChat extends YCObject {
	private _currentUser: YCUser;
	private _validator: YCValidator;
	private _config: YCConfig;
	private _client: YCRongCloudServe;
	private _conversationList: YCConversation[] = [];
	private _currentConversation: YCConversation;

	get currentConversation(): YCConversation {
		return this._currentConversation;
	}

	set currentConversation(value: YCConversation) {
		this._currentConversation = value;
	}

	get currentUser(): YCUser {
		return this._currentUser;
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

	constructor() {
		super();
		this._validator = new YCValidator(this);
		this._config = new YCConfig();
		this._client = new YCRongCloudServe(this);
	}

	static getInstance() {
		if (!chat) {
			chat = new YCChat();
		}
		return chat;
	}

	public getConversation(targetId: string, conversationType: ConversationType) {
		// 从会话列表中查找
		console.log('get conversation')
		console.log(targetId);
		console.log(conversationType);
		let targetConversation = this.conversationList.find(conversation => {
			return conversation.targetId === targetId;
		});
		// 没有则新建一个会话
		targetConversation = targetConversation || this.createConversation(targetId, conversationType, '我们已经是好友啦，快一起来聊天吧~');
		return targetConversation;
	}

	public async getVersion() {
		chatHttp.post(YCHttpInterfaceEnum.getVersion, {});
	}

	public createConversation(targetId: string, conversationType: ConversationType, firstMessage?: string) {
		let target = conversationType === ConversationType.PRIVATE ? this.currentUser.getFriend(targetId) : this.currentUser.getGroup(targetId);
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
				latestMessageId: null, // 最后一条消息的Id
				latestMessage: FMessage || null, // 最后一条消息
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
				latestMessageId: null, // 最后一条消息的Id
				latestMessage: '', // 最后一条消息
				receivedStatus: 1, // 消息接收状态
				receivedTime: new Date().getTime(), // 接收消息的时间
				sentStatus: SentStatus.RECEIVED, // 已发送（也是初始状态）
				type: 'group',
				senderUserId: '', // 群组内当前消息发送者的userId
				hasUnreadMentioned: false, // 群组内是否有未读的@
				mentionedCount: 0, // 群组内未读@的数目
			});
		}
		this._conversationList.unshift(conversation);
		return conversation;
	}
}

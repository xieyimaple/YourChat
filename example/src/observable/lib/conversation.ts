/**
 * @module chat
 * @description 此模块会话模块
 */

import type { ConversationType, Message, SentStatus } from '@rongcloud/react-native-imlib';
import type { YCChat } from './chat';
import { YCObject } from './base';
import type { MediaMessageType } from './rongCloudServe';

export type YCConversationType = 'group' | 'private';

/**
 * 会话信息接口
 */
export interface YCConversationInterface {
	conversationType: ConversationType; // 会话类型
	conversationTitle: string; // 会话标题（私人会话一般就是好友的昵称或者网名）
	isTop: boolean; // 会话是否置顶
	unreadMessageCount: number; // 未读消息数目
	draft: string; // 草稿消息
	targetId: string; // userId或者groupId
	objectName: string; // 消息类型
	latestMessageId: number; // 最后一条消息的Id
	latestMessage: Message; // 最后一条消息
	receivedStatus: number; // 消息接收状态
	receivedTime: number; // 接收消息的时间
	sentStatus: SentStatus; // 发送状态
	type: YCConversationType;
}

/**
 * 会话信息（私有会话）
 */
export interface YCPrivateConversationInterface extends YCConversationInterface {
	// conversationType: ConversationType.PRIVATE;
}

/**
 * 会话信息（群组会话）
 */
export interface YCGroupConversationInterface extends YCConversationInterface {
	// conversationType: ConversationType.GROUP;
	senderUserId: string; // 群组内当前消息发送者的userId
	hasUnreadMentioned: boolean; // 群组内是否有未读的@
	mentionedCount: number; // 群组内未读@的数目
}

/***********************暂时只支持私有会话（1V1聊天）以及群组（多人聊天）************************/

export class YCConversation extends YCObject implements YCConversationInterface {
	private _owner: YCChat;
	private _conversationType: ConversationType;
	private _conversationTitle: string;
	private _isTop: boolean;
	private _unreadMessageCount: number;
	private _draft: string;
	private _targetId: string;
	private _objectName: string;
	private _latestMessageId: number;
	private _latestMessage: Message;
	private _receivedStatus: number;
	private _receivedTime: number;
	private _sentStatus: SentStatus;
	private _messageList: Message[];
	private _type: YCConversationType;

	/**
	 * @description get 访问器：获取当前会话类型
	 */
	get owner(): YCChat {
		return this._owner;
	}

	/**
	 * @description get 访问器：获取当前会话类型
	 */
	get conversationType(): ConversationType {
		return this._conversationType;
	}

	/**
	 * @description get 访问器：获取当前会话名
	 */
	get conversationTitle(): string {
		return this._conversationTitle;
	}

	/**
	 * @description set 访问器：设置当前会话名
	 */
	set conversationTitle(value: string) {
		if (value === this.conversationTitle) {
			return;
		}
		this._conversationTitle = value;
	}

	/**
	 * @description get 访问器：是否置顶
	 */
	get isTop(): boolean {
		return this._isTop;
	}

	/**
	 * @description set 访问器：设置当前会话是否置顶
	 */
	set isTop(value: boolean) {
		if (value === this.isTop) {
			return;
		}
		this._isTop = value;
	}

	/**
	 * @description get 访问器：未读消息数量
	 */
	get unreadMessageCount(): number {
		return this._unreadMessageCount;
	}

	/**
	 * @description set 访问器：设置当前会话是否置顶
	 */
	set unreadMessageCount(value: number) {
		if (value === this.unreadMessageCount) {
			return;
		}
		this._unreadMessageCount = value;
	}

	/**
	 * @description get 访问器：会话草稿
	 */
	get draft(): string {
		return this._draft;
	}

	/**
	 * @description set 访问器：设置会话草稿
	 */
	set draft(value: string) {
		if (value === this.draft) {
			return;
		}
		this._draft = value;
	}

	/**
	 * @description get 访问器：会话乙方的userId，甲方为当前用户，乙方则为聊天对象的userId
	 */
	get targetId(): string {
		return this._targetId;
	}

	/**
	 * @description get 访问器：会话的消息类型
	 */
	get objectName(): string {
		return this._objectName;
	}

	/**
	 * @description get 访问器：会话中最后一条消息的id
	 */
	get latestMessageId(): number {
		return this._latestMessageId;
	}

	/**
	 * @description get 访问器：会话中最后一条消息
	 */
	get latestMessage(): Message {
		return this._latestMessage;
	}

	/**
	 * @description get 访问器：会话的接收状态（考虑0和1两个枚举值，代码屏蔽当前会话和不屏蔽）
	 */
	get receivedStatus(): number {
		return this._receivedStatus;
	}

	/**
	 * @description get 访问器：会话接收到消息的时间
	 */
	get receivedTime(): number {
		return this._receivedTime;
	}

	/**
	 * @description get 访问器：会话发送状态
	 */
	get sentStatus(): SentStatus {
		return this._sentStatus;
	}

	/**
	 * @description set 访问器：设置会话发送状态
	 */
	set sentStatus(value: SentStatus) {
		if (value === this.sentStatus) {
			return;
		}
		this._sentStatus = value;
	}

	/**
	 * @description get 访问器：会话里面消息列表
	 */
	get messageList(): Message[] {
		return this._messageList;
	}

	/**
	 * @description get 访问器：获取当前会话类型
	 */
	get type(): YCConversationType {
		return this._type;
	}

	// 构造函数
	constructor(owner: YCChat, option: YCConversationInterface) {
		super();
		this._owner = owner;
		this._conversationType = option.conversationType;
		this._conversationTitle = option.conversationTitle;
		this._isTop = option.isTop || false;
		this._unreadMessageCount = option.unreadMessageCount || 0;
		this._draft = option.draft || '';
		this._targetId = option.targetId;
		this._objectName = option.objectName;
		this._latestMessageId = option.latestMessageId;
		this._latestMessage = option.latestMessage;
		this._receivedStatus = option.receivedStatus;
		this._receivedTime = option.receivedTime;
		this._sentStatus = option.sentStatus;
		this._type = option.type;
		this._messageList = [];
	}

	/**
	 * @method open
	 * @description 开启会话，一般在会话界面或者好友列表里面选中某个好友或者群组进行聊天的时候调用
	 */
	public open() {}

	/**
	 * @method close
	 * @description 关闭会话，一般在会话退出的时候调用（会完成消息，会话存储等功能）
	 */
	public close() {}

	/**
	 * @method load
	 * @description 加载消息（分为两部分，先加载历史消息，再向服务器拉取最新消息）
	 */
	public load() {}

	/**
	 * @method sendTextMessage
	 * @param {ConversationType} conversationType 消息类型
	 * @param targetId — 目标 ID：可以是用户ID、群ID、讨论组ID
	 * @param message — 消息文本内容
	 * @param pushContent — 推送的消息，用来显示
	 * @param pushData — 推送的数据，不用来显示
	 * @returns {number} 返回消息ID
	 * @description 发送文字消息
	 */
	public async sendTextMessage(message: string): Promise<number> {
		try {
			const messageId = await this.owner.client.sendTextMessage(this.conversationType, this.targetId, message);
			console.log(`发送文本消息成功，messageId: ${messageId}`);
			return messageId;
		} catch (error) {
			console.log(`发送文本消息失败: ${error}`);
			throw new Error(error);
		}
	}

	/**
	 * @method sendImageMessage
	 * @param {ConversationType} conversationType 消息类型
	 * @param targetId — 目标 ID：可以是用户ID、群ID、讨论组ID
	 * @param imagePath — 图片路径
	 * @param callback — 媒体消息的回调函数，需要定义一个接收上传进度的回调函数
	 * @param pushContent — 推送的消息，用来显示
	 * @param pushData — 推送的数据，不用来显示
	 * @returns {number} 返回消息ID
	 * @description 发送图片消息
	 */
	public async sendImageMessage(imagePath: string, callback: MediaMessageType): Promise<number> {
		try {
			const messageId = await this.owner.client.sendImageMessage(this.conversationType, this.targetId, imagePath, callback);
			console.log(`发送图片消息成功，messageId: ${messageId}`);
			return messageId;
		} catch (error) {
			console.log(`发送图片消息失败: ${error}`);
			throw new Error(error);
		}
	}

	/**
	 * @method cancelSendMediaMessage
	 * @param messageId — 消息 ID
	 * @description 取消发送中的媒体消息
	 */
	public cancelSendMediaMessage(messageId: number) {
		this.owner.client.cancelSendMediaMessage(messageId);
	}

	/**
	 * @method serialize
	 * @description 序列化会话对象，用于存储
	 */
	public serialize() {}
}

export class YCPrivateConversation extends YCConversation implements YCPrivateConversationInterface {
	constructor(owner: YCChat, option: YCPrivateConversationInterface) {
		super(owner, option);
	}

	/**
	 * @method serialize
	 * @description 序列化会话对象，用于存储
	 */
	public serialize() {}
}

export class YCGroupConversation extends YCConversation implements YCGroupConversationInterface {
	private _senderUserId: string;
	private _hasUnreadMentioned: boolean;
	private _mentionedCount: number;

	/**
	 * @description get 访问器：会话发送者的userId（群组功能）
	 */
	get senderUserId(): string {
		return this._senderUserId;
	}

	/**
	 * @description get 访问器：会话是否有未读的@（群组功能）
	 */
	get hasUnreadMentioned(): boolean {
		return this._hasUnreadMentioned;
	}

	/**
	 * @description get 访问器：会话里面未读的@的数目（群组功能）
	 */
	get mentionedCount(): number {
		return this._mentionedCount;
	}

	constructor(owner: YCChat, option: YCGroupConversationInterface) {
		super(owner, option);
		this._senderUserId = option.senderUserId;
		this._hasUnreadMentioned = option.hasUnreadMentioned;
		this._mentionedCount = option.mentionedCount;
	}

	/**
	 * @method serialize
	 * @description 序列化会话对象，用于存储
	 */
	public serialize() {}
}

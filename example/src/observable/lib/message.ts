/**
 * @module YCCutomeMessage
 * @description 此模块为自定义消息类。
 */

// export enum YCObjectName {

// }

// enum MyObjectName {
// 	MyTextMsg = 'YC:textMsg',
// 	MyVideoMsg = 'YC:videoMsg',
// 	MyAudioMsg = 'YC:audioMsg',
// }

import { MentionedInfo, MessageContent, ObjectName, UserInfo } from 'rongcloud-react-native-imlib';

export enum YCObjectName {
	MyTextMsg = 'YC:textMsg',
	MyVideoMsg = 'YC:videoMsg',
	MyAudioMsg = 'YC:audioMsg',
}

export class YCCutomeMessage implements MessageContent {
	private _objectName: YCObjectName;
	private _userInfo: UserInfo;
	private _mentionedInfo: MentionedInfo;
	private _content: string;

	get objectName(): YCObjectName {
		return this._objectName;
	}

	set objectName(value: YCObjectName) {
		this._objectName = value;
	}

	get userInfo(): UserInfo {
		return this._userInfo;
	}

	set userInfo(value: UserInfo) {
		this._userInfo = value;
	}

	get mentionedInfo(): MentionedInfo {
		return this._mentionedInfo;
	}

	set mentionedInfo(value: MentionedInfo) {
		this._mentionedInfo = value;
	}

	get content(): string {
		return this._content;
	}

	set content(value: string) {
		this._content = value;
	}
}

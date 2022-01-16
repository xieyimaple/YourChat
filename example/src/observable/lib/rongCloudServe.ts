import * as IMClient from '@rongcloud/react-native-imlib';
import {
  ConversationType,
  ImageMessage,
  MessageContent,
  ObjectName,
  ReceiveMessage,
  TextMessage,
} from '@rongcloud/react-native-imlib';
import type { YCChat } from './chat';
import { YCObject } from './base';

const errorCodeMessageMap = new Map([
  [-3, '参数错误（Android 平台）'],
  [-2, '参数错误（Android 平台）'],
  [405, '已被对方加入黑名单，消息发送失败。'],
  [407, '未在对方的白名单中，消息发送失败。'],
  [20604, '发送消息频率过高， 1 秒钟最多只允许发送 5 条消息'],
  [21406, '不在该讨论组中。'],
  [22406, '不在该群组中。'],
  [22408, '在群组中已被禁言。'],
  [23406, '不在该聊天室中。'],
  [23409, '已被踢出并禁止加入聊天室。'],
  [23410, '聊天室不存在。'],
  [23411, '聊天室成员超限。'],
  [23412, '聊天室接口参数无效。'],
  [23414, '聊天室云存储业务未开通。'],
  [24012, '通话鉴权失败。'],
  [24014, '实时音视频功能未开启。'],
  [24016, '实时音视频功能已关闭。'],
  [24016, '消息撤回时，参数错误。'],
  [26101, '没有在融云开发者后台开启小视频服务。'],
  [29106, '未关注此公众号。'],
  [29201, '无效的公众号。'],
  [30001, '当前连接不可用'],
  [30002, '当前连接不可用'],
  [30003, '客户端发送消息请求，融云服务端响应超时。'],
  [30004, '发送失败'],
  [30007, '发送失败'],
]);

export type MediaMessageType = {
  progress: (progress: number, messageId: number) => void;
};

/**
 * @module YCRongCloudServe
 * @description 此模块为融云IM的服务类。
 */
export class YCRongCloudServe extends YCObject {
  private _connectListener: any;
  private _ReceiveMessageListener: any;
  private _owner: YCChat;

  constructor(owner: YCChat) {
    super();
    this._owner = owner;
  }

  get owner(): YCChat {
    return this._owner;
  }

  /**
   * @method init
   * @param {string} appKey app key
   * @param {string} token user token
   * @returns {Promise<string>} 用户Id
   * @description: 初始化方法
   */
  public async init(appKey: string, token: string): Promise<string> {
    IMClient.init(appKey);
    const userId = await this.connect(token);
    this._connectListener = IMClient.addConnectionStatusListener((status) => {
      console.log(`当前连接状态: ${status}`);
    });
    return userId;
  }

  /**
   * @method connect
   * @param {string} token user token
   * @returns {Promise<string>} 用户Id
   * @description: 连接融云服务
   */
  public async connect(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const onSuccess = (userId: string) => {
        console.log('连接成功' + userId);
        // 服务端消息监听
        this._ReceiveMessageListener?.remove();
        this._ReceiveMessageListener = IMClient.addReceiveMessageListener(
          (message) => {
            console.log('接收消息');
            console.log(message);
            this.dispatch(message);
          }
        );
        resolve(userId);
      };
      const onError = (errorCode: IMClient.ConnectErrorCode) => {
        console.log('连接失败' + errorCode);
        reject(errorCode);
      };
      const onTokenIncorrect = () => {
        console.log('Token 不正确或已过期');
        reject('Token 不正确或已过期');
      };
      IMClient.connect(token, onSuccess, onError, onTokenIncorrect);
    });
  }

  private dispatch(receiveMessage: ReceiveMessage) {
    const { message, left } = receiveMessage;
    const conversation = this.owner.getConversation(message.targetId);
    conversation.unreadMessageCount = left;
    conversation.messageList.push(message);
  }

  /**
   * @method disconnect
   * @param {boolean | undefined} isReceivePush 是否继续接收推送消息
   * @description: 断开融云服务连接
   */
  public disconnect(isReceivePush?: boolean | undefined): void {
    IMClient.disconnect(isReceivePush);
    this._connectListener.remove();
    this._ReceiveMessageListener.remove();
  }

  private sendMessage(
    conversationType: ConversationType,
    targetId: string,
    content: MessageContent,
    pushContent: string,
    pushData: string
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      IMClient.sendMessage(
        { conversationType, targetId, content, pushContent, pushData },
        {
          success(messageId) {
            resolve(messageId);
          },
          error(errorCode) {
            reject(errorCode);
          },
        }
      );
    });
  }

  private sendMediaMessage(
    conversationType: ConversationType,
    targetId: string,
    content: MessageContent,
    pushContent: string,
    pushData: string,
    callback: MediaMessageType
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      const { progress = () => {} } = callback;
      IMClient.sendMediaMessage(
        { conversationType, targetId, content, pushContent, pushData },
        {
          success(messageId) {
            resolve(messageId);
          },
          error(errorCode) {
            reject(errorCode);
          },
          progress,
          cancel() {
            console.log('发送取消');
            resolve(-1);
          },
        }
      );
    });
  }

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
  public async sendTextMessage(
    conversationType: ConversationType,
    targetId: string,
    message: string,
    pushContent = '',
    pushData = ''
  ): Promise<number> {
    try {
      const content: TextMessage = {
        objectName: ObjectName.Text,
        content: message,
      };
      const messageId = await this.sendMessage(
        conversationType,
        targetId,
        content,
        pushContent,
        pushData
      );
      console.log(`发送文本消息成功，messageId: ${messageId}`);
      return messageId;
    } catch (errorCode) {
      const code = errorCode as number;
      console.log(`发送文本消息失败: ${errorCodeMessageMap.get(code)}`);
      throw new Error(errorCodeMessageMap.get(code));
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
  public async sendImageMessage(
    conversationType: ConversationType,
    targetId: string,
    imagePath: string,
    callback: MediaMessageType,
    pushContent = '',
    pushData = ''
  ): Promise<number> {
    try {
      const content: ImageMessage = {
        objectName: ObjectName.Image,
        local: imagePath,
      };
      const messageId = await this.sendMediaMessage(
        conversationType,
        targetId,
        content,
        pushContent,
        pushData,
        callback
      );
      console.log(`发送图片消息成功，messageId: ${messageId}`);
      return messageId;
    } catch (errorCode) {
      const code = errorCode as number;
      console.log(`发送图片消息失败: ${errorCodeMessageMap.get(code)}`);
      throw new Error(errorCodeMessageMap.get(code));
    }
  }

  /**
   * @method cancelSendMediaMessage
   * @param messageId — 消息 ID
   * @description 取消发送中的媒体消息
   */
  public cancelSendMediaMessage(messageId: number) {
    IMClient.cancelSendMediaMessage(messageId);
  }
}

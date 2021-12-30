/**
 * @module user
 * @description 此模块为用户相关类，主要功能为用户信息的获取（用户名、头像、好友列表，与好友建立长连接通信等等）
*/
import { EventEmitter } from "react-native";
import { YCFriend } from "./friend";

type YCUserInfo = {
    name: string;
    id?: string;
    password?: string;
    photoUrl?: string;
    photoPath?: string;
    logined?: boolean;
};

/**
 *  @class User
 *  @desc 用户基类，该类的作用为实现用户相关功能以及属性。
 * */
export class YCUser extends EventEmitter {
    private _id?: string;
    private _name: string;
    private _logined = false;
    private _password?: string;
    private _photoUrl?: string;
    private _photoPath?: string;

    private _currentChattingFriend: YCFriend;
    private _chatList: YCFriend[];

    // get 访问器：获取id
    get id(): string {
        return this._id;
    };

    // get 访问器：获取用户名
    get name(): string {
        return this._name;
    };

    // get 访问器：获取密码
    get password(): string {
        return this._password;
    };

    // get 访问器：获取头像URL
    get photoUrl(): string {
        return this._photoUrl;
    };

    // get 访问器：获取头像路径
    get photoPath(): string {
        return this._photoPath;
    };

    // get 访问器：获取头像
    get photo(): string {
        return this.photoPath || this.photoUrl || '默认头像';
    };

    // get 访问器：获取当前用户的激活状态（即是否登录）
    get logined(): boolean {
        return this._logined;
    };

    // get 访问器：获取当前正在聊天的
    get currentChattingFriend(): YCFriend {
        return this._currentChattingFriend;
    };

    // get 访问器：获取用户名
    set currentChattingFriend(value: YCFriend) {
        this._currentChattingFriend = value;
    };

    // get 访问器：获取用户的聊天列表，用以显示界面上
    get chatList(): YCFriend[] {
        return this._chatList;
    }

    // 构造函数
    constructor({
        id = '',
        name,
        password = '',
        logined = false,
        photoUrl = '',
        photoPath = '',
    }: YCUserInfo) {
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
    };

    // 静态方法：通过json对象构造一个user对象
    static fromJson(json: string) {
        const jsonObj: { id: string; name: string } = JSON.parse(json);
        if (jsonObj.name || jsonObj.id) {
            throw Error('缺少关键参数id，name');
        }
        const user = new YCUser(jsonObj);
        user['_id'] = jsonObj.id;
        return user;
    }

    // 删除聊天列表中的某个好友记录
    public deleteFriendFromChatList() {}

    // 删除好友
    public deleteFriend() {}
}
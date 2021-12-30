/**
 * @module chat
 * @description 此模块为整个聊天软件的配置对象，对应本地config.json配置文件
*/

import { YCObject } from "./base";
import { YCUser } from "./user";

export class YCConfig extends YCObject {
    private _userList: YCUser[];

    get userList(): YCUser[] {
        return this._userList;
    }

    /**
     * @method login
     * @param {string} username 用户名
     * @param {string} password 用户名密码
     * @returns {User} 当前已登录用户对象
     * @description 登录
    */
    public login(username: string, password: string): YCUser {
        return;
    }

    /**
     * @method logout
     * @description 注销
    */
    public logout(): void {}
}
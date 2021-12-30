/**
 * @module chat
 * @description 此模块为整个聊天软件的验证器模块，负责登录，注销，构建等功能。
*/

import { YCObject } from "./base";
import { YCUser } from "./user";

export class YCValidator extends YCObject {
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
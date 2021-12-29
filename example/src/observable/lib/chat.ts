/**
 * @module chat
 * @description 此模块为整个聊天软件的单例对象
*/

import { YCObject } from "./base";
import { YCConfig } from "./config";
import { YCUser } from "./user";
import { YCValidator } from "./validator";

let chat = null;

export class YCChat extends YCObject {
    private _currentUser: YCUser;
    private _validator: YCValidator;
    private _config: YCConfig;

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

    constructor() {
        super();
        this._validator = new YCValidator();
        this._config = new YCConfig();
    }

    static getInstance() {
        if (!chat) {
            chat = new YCChat();
        }
        return chat;
    }
}
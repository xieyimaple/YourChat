/** @format */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['Warning: componentWillReceiveProps has been renamed']);
LogBox.ignoreLogs(['Warning: componentWillUpdate has been renamed']);
LogBox.ignoreAllLogs(true);  // 手机关闭报错信息

AppRegistry.registerComponent(appName, () => App);

import * as React from 'react';
import { ScrollView } from 'react-native';
import Example from './example';
import Login from './login';
import Register from './register';
import ResetUsername from './reset-username';
import AccountSecurity from './account-security';
import AllowNotice from './allow-notice';
import CreateGroup from './create-group';
import CreateGrpupInformation from './create-group-information';
import MyGroups from './my-groups';
import FriendDetails from './friend-details';
import ResetRemark from './reset-remark';
import ResetPassword from './reset-password';
import AddFriend from './add-friend';
import NewFriends from './new-friends';
import Home from './home';
import SingleFind from './single-find';
import SingleMessage from './single-message';
import UserSetting from './user-setting';
import Connect from './connect';
import ReceiveMessage from './receive-message';
import SendMessage from './send-message';
import resendMessageById from './resend-message';
import Audio from './audio';
import TypingStatus from './typing-status';
import GetMessage from './get-message';
import ReadReceipt from './read-receipt';
import GetHistoryMessages from './get-history-messages';
import GetRemoteHistoryMessages from './get-remote-history-messages';
import InsertMessage from './insert-message';
import DeleteMessages from './delete-messages';
import DeleteMessagesByIds from './delete-messages-by-ids';
import SearchConversations from './search-conversations';
import SearchMessages from './search-messages';
import GetConversation from './get-conversation';
import GetConversations from './get-conversations';
import RemoveConversation from './remove-conversation';
import ConversationNotificationStatus from './conversation-notification-status';
import TextMessageDraft from './text-message-draft';
import GetUnreadCount from './get-unread-count';
import Blacklist from './blacklist';
import ChatRoom from './chat-room';
import CreateDiscussion from './create-discussion';
import PublicService from './public-service';
import RealTimeLocation from './realtime-location';
import CustomerService from './customer-service';
import PushReceiver from './push-receiver';
import { Button } from 'react-native-elements';
import { YCChat } from '../observable/index';

const examples = [
  Login,
  Register,
  AddFriend,
  NewFriends,
  ResetUsername,
  AccountSecurity,
  AllowNotice,
  CreateGroup,
  CreateGrpupInformation,
  MyGroups,
  FriendDetails,
  ResetRemark,
  ResetPassword,
  Home,
  SingleFind,
  SingleMessage,
  UserSetting,
  Connect,
  ReceiveMessage,
  SendMessage,
  resendMessageById,
  Audio,
  TypingStatus,
  GetMessage,
  ReadReceipt,
  GetHistoryMessages,
  GetRemoteHistoryMessages,
  InsertMessage,
  DeleteMessages,
  DeleteMessagesByIds,
  SearchConversations,
  SearchMessages,
  GetConversation,
  GetConversations,
  RemoveConversation,
  ConversationNotificationStatus,
  TextMessageDraft,
  GetUnreadCount,
  Blacklist,
  ChatRoom,
  CreateDiscussion,
  PublicService,
  RealTimeLocation,
  CustomerService,
  PushReceiver,
];

export default class extends React.PureComponent {
  static navigationOptions = { title: 'RongCloud IMLib Examples' };

  test = async () => {
    // 测试获取注册列表
    const chat = YCChat.getInstance();
    // alert(JSON.stringify(chat));
    // const result = await chat.validator.getRegisterInfo();
    // alert(JSON.stringify(result));
  }

  render() {
    return (
      <Button title="点我一下" onPress={this.test}></Button>
      // <ScrollView>
      //   {examples.map(({ navigationOptions: { title }, route }) => (
      //     <Example key={route} title={title} route={route} />
      //   ))}
      // </ScrollView>
    );
  }
}

export {
  Home,
  UserSetting,
  Login,
  Register,
  AddFriend,
  NewFriends,
  ResetUsername,
  AccountSecurity,
  AllowNotice,
  CreateGroup,
  CreateGrpupInformation,
  MyGroups,
  FriendDetails,
  ResetRemark,
  SingleFind,
  SingleMessage,
  ResetPassword,
  Connect,
  ReceiveMessage,
  SendMessage,
  resendMessageById,
  Audio,
  TypingStatus,
  GetMessage,
  ReadReceipt,
  GetHistoryMessages,
  GetRemoteHistoryMessages,
  InsertMessage,
  DeleteMessages,
  DeleteMessagesByIds,
  SearchConversations,
  SearchMessages,
  GetConversation,
  GetConversations,
  RemoveConversation,
  ConversationNotificationStatus,
  TextMessageDraft,
  GetUnreadCount,
  Blacklist,
  ChatRoom,
  CreateDiscussion,
  PublicService,
  RealTimeLocation,
  CustomerService,
  PushReceiver,
};

import * as React from "react";
import { ScrollView } from "react-native";
import Example from "./example";
import Login from "./login";
import Register from "./register";
import ResetPassword from "./reset-password";
import AddFriend from "./add-friend";
import NewFriends from "./new-friends";
import Home from "./home";
import Connect from "./connect";
import ReceiveMessage from "./receive-message";
import SendMessage from "./send-message";
import resendMessageById from "./resend-message";
import Audio from "./audio";
import TypingStatus from "./typing-status";
import GetMessage from "./get-message";
import ReadReceipt from "./read-receipt";
import GetHistoryMessages from "./get-history-messages";
import GetRemoteHistoryMessages from "./get-remote-history-messages";
import InsertMessage from "./insert-message";
import DeleteMessages from "./delete-messages";
import DeleteMessagesByIds from "./delete-messages-by-ids";
import SearchConversations from "./search-conversations";
import SearchMessages from "./search-messages";
import GetConversation from "./get-conversation";
import GetConversations from "./get-conversations";
import RemoveConversation from "./remove-conversation";
import ConversationNotificationStatus from "./conversation-notification-status";
import TextMessageDraft from "./text-message-draft";
import GetUnreadCount from "./get-unread-count";
import Blacklist from "./blacklist";
import ChatRoom from "./chat-room";
import CreateDiscussion from "./create-discussion";
import PublicService from "./public-service";
import RealTimeLocation from "./realtime-location";
import CustomerService from "./customer-service";
import PushReceiver from "./push-receiver";

const examples = [
  Login,
  Register,
  AddFriend,
  NewFriends,
  ResetPassword,
  Home,
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
  PushReceiver
];

export default class extends React.PureComponent {
  static navigationOptions = { title: "RongCloud IMLib Examples" };

  render() {
    return (
      <ScrollView>
        {examples.map(({ navigationOptions: { title }, route }) => (
          <Example key={route} title={title} route={route} />
        ))}
      </ScrollView>
    );
  }
}

export {
  Home,
  Login,
  Register,
  AddFriend,
  NewFriends,
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
  PushReceiver
};

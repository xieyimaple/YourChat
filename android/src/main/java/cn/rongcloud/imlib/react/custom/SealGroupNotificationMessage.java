package cn.rongcloud.imlib.react.custom;

import android.os.Parcel;

import io.rong.imlib.MessageTag;
import io.rong.message.GroupNotificationMessage;

@MessageTag(value = "ST:GrpNtf", flag = MessageTag.ISPERSISTED)
public class SealGroupNotificationMessage extends GroupNotificationMessage {
    public static final String GROUP_OPERATION_USER_CHANGE_INFO = "Userchangeinfo";

    public SealGroupNotificationMessage(Parcel in) {
        super(in);
    }

    public SealGroupNotificationMessage(byte[] data) {
        super(data);
    }
}

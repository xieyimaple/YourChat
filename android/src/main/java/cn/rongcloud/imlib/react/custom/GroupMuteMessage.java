package cn.rongcloud.imlib.react.custom;

import android.os.Parcel;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

import io.rong.common.ParcelUtils;
import io.rong.common.RLog;
import io.rong.imlib.MessageTag;
import io.rong.imlib.model.MessageContent;

@MessageTag(value = "Jy:GrpMute", flag = MessageTag.NONE)
public class GroupMuteMessage extends MessageContent {

    private String content;//open close

    private GroupMuteMessage() {
    }

    public GroupMuteMessage(Parcel in) {
        this.content = ParcelUtils.readFromParcel(in);
    }

    public GroupMuteMessage(byte[] data) {
        String jsonStr = null;
        try {
            jsonStr = new String(data, "UTF-8");
        } catch (UnsupportedEncodingException var5) {
//            RLog.e("GroupAnnounceMessage", "UnsupportedEncodingException ", var5);
        }

        try {
            JSONObject jsonObj = new JSONObject(jsonStr);
            this.setContent(jsonObj.optString("content"));
        } catch (JSONException var4) {
//            RLog.e("GroupAnnounceMessage", "JSONException " + var4.getMessage());
        }

    }

    public static final Creator<GroupMuteMessage> CREATOR = new Creator<GroupMuteMessage>() {
        public GroupMuteMessage createFromParcel(Parcel source) {
            return new GroupMuteMessage(source);
        }

        public GroupMuteMessage[] newArray(int size) {
            return new GroupMuteMessage[size];
        }
    };

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public byte[] encode() {
        JSONObject jsonObj = new JSONObject();
        try {
            jsonObj.put("content",this.content);
        } catch (JSONException var4) {
//            RLog.e("GroupAnnounceMessage", "JSONException " + var4.getMessage());
        }
        try {
            return jsonObj.toString().getBytes("UTF-8");
        } catch (UnsupportedEncodingException var3) {
//            RLog.e("GroupAnnounceMessage", "UnsupportedEncodingException ", var3);
            return null;
        }
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        ParcelUtils.writeToParcel(dest, this.content);
    }

    @Override
    public String toString() {
        return "GroupAnnounceMessage{" +
                "content='" + content + '\'' +
                '}';
    }
}

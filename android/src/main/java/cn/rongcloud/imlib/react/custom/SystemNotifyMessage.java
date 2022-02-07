package cn.rongcloud.imlib.react.custom;

import android.os.Parcel;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

import io.rong.common.ParcelUtils;
import io.rong.common.RLog;
import io.rong.imlib.MessageTag;
import io.rong.imlib.model.MessageContent;

@MessageTag(value = "Jy:updateRemarksNotify", flag = MessageTag.STATUS)
public class SystemNotifyMessage extends MessageContent {
    public static String UPDATE_REMARKS = "updateRemarks";

    //总控推送了功能时候发的
    String message;//updateRemarks

    private SystemNotifyMessage() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public SystemNotifyMessage(Parcel in) {
        this.message = ParcelUtils.readFromParcel(in);
    }

    public SystemNotifyMessage(byte[] data) {
        String jsonStr = null;
        try {
            jsonStr = new String(data, "UTF-8");
        } catch (UnsupportedEncodingException var5) {
//            RLog.e("GroupNotificationMessage", "UnsupportedEncodingException ", var5);
        }

        try {
            JSONObject jsonObj = new JSONObject(jsonStr);
            this.setMessage(jsonObj.optString("message"));
        } catch (JSONException var4) {
//            RLog.e("GroupNotificationMessage", "JSONException " + var4.getMessage());
        }

    }

    public static final Creator<SystemNotifyMessage> CREATOR = new Creator<SystemNotifyMessage>() {
        public SystemNotifyMessage createFromParcel(Parcel source) {
            return new SystemNotifyMessage(source);
        }

        public SystemNotifyMessage[] newArray(int size) {
            return new SystemNotifyMessage[size];
        }
    };

    @Override
    public byte[] encode() {
        JSONObject jsonObj = new JSONObject();
        try {
            jsonObj.put("message", this.message);
        } catch (JSONException var4) {
//            RLog.e("GroupNotificationMessage", "JSONException " + var4.getMessage());
        }
        try {
            return jsonObj.toString().getBytes("UTF-8");
        } catch (UnsupportedEncodingException var3) {
//            RLog.e("GroupNotificationMessage", "UnsupportedEncodingException ", var3);
            return null;
        }
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        ParcelUtils.writeToParcel(dest, this.message);
    }
}

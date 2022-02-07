package cn.rongcloud.imlib.react.custom;

import android.os.Parcel;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

import io.rong.common.ParcelUtils;
import io.rong.common.RLog;
import io.rong.imlib.MessageTag;
import io.rong.imlib.model.MessageContent;

@MessageTag(value = "KK:Grabpack", flag = MessageTag.ISPERSISTED)
public class RedPacketGrabMessage extends MessageContent {
//forName 发包人昵称 toName 抢包人昵称 forMoneyStr 发包金额 toMoneyStr 抢包金额 receiveNumNo 红包剩余个数
    private String operatorUserId;
    private String operation;
    private String data;
    private String message;

//    private String forName ;
//    private String toName ;
//    private String forMoneyStr ;
//    private String toMoneyStr ;
//    private String receiveNumNo ;

    private RedPacketGrabMessage() {
    }

    public RedPacketGrabMessage(byte[] data) {
        String jsonStr = null;

        try {
            jsonStr = new String(data, "UTF-8");
        } catch (UnsupportedEncodingException var5) {
            RLog.e("GroupNotificationMessage", "UnsupportedEncodingException ", var5);
        }

        try {
            JSONObject jsonObj = new JSONObject(jsonStr);
            this.setOperatorUserId(jsonObj.optString("operatorUserId"));
            this.setOperation(jsonObj.optString("operation"));
            this.setData(jsonObj.optString("data"));
            this.setMessage(jsonObj.optString("message"));
        } catch (JSONException var4) {
            RLog.e("GroupNotificationMessage", "JSONException " + var4.getMessage());
        }

    }

    public static final Creator<RedPacketGrabMessage> CREATOR = new Creator<RedPacketGrabMessage>() {
        public RedPacketGrabMessage createFromParcel(Parcel source) {
            return new RedPacketGrabMessage(source);
        }

        public RedPacketGrabMessage[] newArray(int size) {
            return new RedPacketGrabMessage[size];
        }
    };

    public RedPacketGrabMessage(Parcel in) {
        this.operatorUserId = ParcelUtils.readFromParcel(in);
        this.operation = ParcelUtils.readFromParcel(in);
        this.data = ParcelUtils.readFromParcel(in);
        this.message = ParcelUtils.readFromParcel(in);
    }

    @Override
    public byte[] encode() {
        JSONObject jsonObj = new JSONObject();
        try {
            jsonObj.put("operatorUserId", this.operatorUserId);
            jsonObj.put("operation", this.operation);
            jsonObj.put("data", this.data);
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
        ParcelUtils.writeToParcel(dest, this.operatorUserId);
        ParcelUtils.writeToParcel(dest, this.operation);
        ParcelUtils.writeToParcel(dest, this.data);
        ParcelUtils.writeToParcel(dest, this.message);
    }

    @Override
    public String toString() {
        return "RedPacketGrabMessage{" +
                "operatorUserId='" + operatorUserId + '\'' +
                ", operation='" + operation + '\'' +
                ", data='" + data + '\'' +
                ", message='" + message + '\'' +
                '}';
    }

    public String getOperatorUserId() {
        return operatorUserId;
    }

    public void setOperatorUserId(String operatorUserId) {
        this.operatorUserId = operatorUserId;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

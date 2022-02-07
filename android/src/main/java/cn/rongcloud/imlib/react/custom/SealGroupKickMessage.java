package cn.rongcloud.imlib.react.custom;

import android.os.Parcel;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

import io.rong.common.ParcelUtils;
import io.rong.common.RLog;
import io.rong.imlib.MessageTag;
import io.rong.imlib.model.MessageContent;

@MessageTag(value = "ST:GrpKickedNtf", flag = MessageTag.NONE)
public class SealGroupKickMessage extends MessageContent {
    private String operatorUserId;
    private String operation;
    private String data;
    private String message;
    private String extra;

    private SealGroupKickMessage() {
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

    public String getExtra() {
        return extra;
    }

    public void setExtra(String extra) {
        this.extra = extra;
    }

    public SealGroupKickMessage(Parcel in) {
        this.operatorUserId = ParcelUtils.readFromParcel(in);
        this.operation = ParcelUtils.readFromParcel(in);
        this.data = ParcelUtils.readFromParcel(in);
        this.message = ParcelUtils.readFromParcel(in);
        this.extra = ParcelUtils.readFromParcel(in);
    }

    public SealGroupKickMessage(byte[] data) {
        String jsonStr = null;
        try {
            jsonStr = new String(data, "UTF-8");
        } catch (UnsupportedEncodingException var5) {
//            RLog.e("GroupNotificationMessage", "UnsupportedEncodingException ", var5);
        }

        try {
            JSONObject jsonObj = new JSONObject(jsonStr);
            this.setData(jsonObj.optString("data"));
            this.setExtra(jsonObj.optString("extra"));
            this.setMessage(jsonObj.optString("message"));
            this.setOperation(jsonObj.optString("operation"));
            this.setOperatorUserId(jsonObj.optString("operatorUserId"));
        } catch (JSONException var4) {
//            RLog.e("GroupNotificationMessage", "JSONException " + var4.getMessage());
        }

    }

    public static final Creator<SealGroupKickMessage> CREATOR = new Creator<SealGroupKickMessage>() {
        public SealGroupKickMessage createFromParcel(Parcel source) {
            return new SealGroupKickMessage(source);
        }

        public SealGroupKickMessage[] newArray(int size) {
            return new SealGroupKickMessage[size];
        }
    };

    public static SealGroupKickMessage obtainDelete() {
        SealGroupKickMessage sealGroupKickMessage = new SealGroupKickMessage();
        sealGroupKickMessage.setOperation("Delete");
        return sealGroupKickMessage;
    }

    public static SealGroupKickMessage obtainClearGrp() {
        SealGroupKickMessage sealGroupKickMessage = new SealGroupKickMessage();
        sealGroupKickMessage.setOperation("ClearGroup");
        return sealGroupKickMessage;
    }

    @Override
    public byte[] encode() {
        JSONObject jsonObj = new JSONObject();
        try {
            jsonObj.put("operatorUserId",this.operatorUserId);
            jsonObj.put("operation",this.operation);
            jsonObj.put("data",this.data);
            jsonObj.put("message",this.message);
            jsonObj.put("extra",this.extra);
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
        ParcelUtils.writeToParcel(dest, this.extra);
    }

    @Override
    public String toString() {
        return "SealGroupKickMessage{" +
                "operatorUserId='" + operatorUserId + '\'' +
                ", operation='" + operation + '\'' +
                ", data='" + data + '\'' +
                ", message='" + message + '\'' +
                ", extra='" + extra + '\'' +
                '}';
    }
}

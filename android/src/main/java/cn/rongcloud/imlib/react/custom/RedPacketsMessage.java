package cn.rongcloud.imlib.react.custom;


import android.os.Parcel;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

import io.rong.common.ParcelUtils;
import io.rong.imlib.DestructionTag;
import io.rong.imlib.MessageTag;
import io.rong.imlib.model.MessageContent;

@MessageTag(value = "KK:redPacket", flag = MessageTag.ISCOUNTED)
public class RedPacketsMessage extends MessageContent {

    private String content;
    private String redId;

    public RedPacketsMessage() {
    }

    public RedPacketsMessage(byte[] data) {
        super(data);
        String jsonStr = null;
        try {
            jsonStr = new String(data, "UTF-8");
            JSONObject jsonObj = new JSONObject(jsonStr);
            this.setContent(jsonObj.optString("content"));
            this.setRedId(jsonObj.optString("redId"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static RedPacketsMessage obtain(String content, String redId) {
        RedPacketsMessage info = new RedPacketsMessage();
        info.content = content;
        info.redId = redId;
        return info;
    }

    public static final Creator<RedPacketsMessage> CREATOR = new Creator<RedPacketsMessage>() {

        @Override
        public RedPacketsMessage createFromParcel(Parcel source) {
            return new RedPacketsMessage(source);
        }

        @Override
        public RedPacketsMessage[] newArray(int size) {
            return new RedPacketsMessage[size];
        }
    };

    public RedPacketsMessage(Parcel parcel) {
        this.redId = ParcelUtils.readFromParcel(parcel);
        this.content = ParcelUtils.readFromParcel(parcel);
    }

    @Override
    public byte[] encode() {
        JSONObject object = new JSONObject();
        try {
            object.put("content", this.content);
            object.put("redId", this.redId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            return object.toString().getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        ParcelUtils.writeToParcel(dest, this.redId);
        ParcelUtils.writeToParcel(dest, this.content);
        // ParcelUtils.writeToParcel(dest, String.valueOf(this.isreceive));
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public String getRedId() {
        return redId;
    }

    public void setRedId(String redId) {
        this.redId = redId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}

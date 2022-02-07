package cn.rongcloud.imlib.react.custom;

import android.net.Uri;
import android.os.Parcel;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

import io.rong.common.ParcelUtils;
import io.rong.common.RLog;
import io.rong.imlib.DestructionTag;
import io.rong.imlib.MessageTag;
import io.rong.message.MediaMessageContent;

//收藏的图片和gif
@MessageTag(value = "KK:image", flag = MessageTag.ISCOUNTED | MessageTag.ISPERSISTED)
public class CustomImageMessage extends MediaMessageContent {
    private Uri localUri;
    private String url;

    private CustomImageMessage() {
    }

    public CustomImageMessage(byte[] data) {
        String jsonStr = null;

        try {
            jsonStr = new String(data, "UTF-8");
        } catch (UnsupportedEncodingException var5) {
//            RLog.e("CustomImageMessage", "UnsupportedEncodingException ", var5);
        }

        try {
            JSONObject jsonObj = new JSONObject(jsonStr);
            this.setUrl(jsonObj.optString("url"));
            this.setLocalUri(Uri.parse(jsonObj.optString("localUri")));
        } catch (JSONException var4) {
//            RLog.e("CustomImageMessage", "JSONException " + var4.getMessage());
        }

    }

    public static final Creator<CustomImageMessage> CREATOR = new Creator<CustomImageMessage>() {
        public CustomImageMessage createFromParcel(Parcel source) {
            return new CustomImageMessage(source);
        }

        public CustomImageMessage[] newArray(int size) {
            return new CustomImageMessage[size];
        }
    };

    public static CustomImageMessage obtain(Uri uri) {
        CustomImageMessage obj = new CustomImageMessage();
        obj.localUri = uri;
        return obj;
    }

    public static CustomImageMessage obtain(String url) {
        CustomImageMessage obj = new CustomImageMessage();
        obj.url = url;
        return obj;
    }

    public CustomImageMessage(Parcel in) {

        this.url = ParcelUtils.readFromParcel(in);
        this.localUri = ParcelUtils.readFromParcel(in,Uri.class);
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public byte[] encode() {
        JSONObject jsonObj = new JSONObject();
        try {
            jsonObj.put("url", this.url);
            jsonObj.put("localUri", this.localUri);
        } catch (JSONException var4) {
//            RLog.e("CustomImageMessage", "JSONException " + var4.getMessage());
        }
        try {
            return jsonObj.toString().getBytes("UTF-8");
        } catch (UnsupportedEncodingException var3) {
//            RLog.e("CustomImageMessage", "UnsupportedEncodingException ", var3);
            return null;
        }
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        ParcelUtils.writeToParcel(dest, this.url);
        ParcelUtils.writeToParcel(dest, localUri);
    }

    public void setLocalUri(Uri localUri) {
        this.localUri = localUri;
    }

    public Uri getLocalUri() {
        return localUri;
    }

    @Override
    public String toString() {
        return "CustomImageMessage{" +
                "localUri=" + localUri +
                ", url='" + url + '\'' +
                '}';
    }
}

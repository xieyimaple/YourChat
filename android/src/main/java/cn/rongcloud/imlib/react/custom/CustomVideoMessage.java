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
@MessageTag(value = "Custom:video", flag = MessageTag.ISCOUNTED)
public class CustomVideoMessage extends MediaMessageContent {
    private Uri localUri;
    private String url;

    private CustomVideoMessage() {
    }

    public CustomVideoMessage(byte[] data) {
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

    public static final Creator<CustomVideoMessage> CREATOR = new Creator<CustomVideoMessage>() {
        public CustomVideoMessage createFromParcel(Parcel source) {
            return new CustomVideoMessage(source);
        }

        public CustomVideoMessage[] newArray(int size) {
            return new CustomVideoMessage[size];
        }
    };

    public static CustomVideoMessage obtain(Uri uri) {
        CustomVideoMessage obj = new CustomVideoMessage();
        obj.localUri = uri;
        return obj;
    }

    public static CustomVideoMessage obtain(String url) {
        CustomVideoMessage obj = new CustomVideoMessage();
        obj.url = url;
        return obj;
    }

    public CustomVideoMessage(Parcel in) {

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

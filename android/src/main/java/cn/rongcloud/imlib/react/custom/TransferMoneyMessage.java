package cn.rongcloud.imlib.react.custom;


import android.os.Parcel;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

import io.rong.common.ParcelUtils;
import io.rong.imlib.DestructionTag;
import io.rong.imlib.MessageTag;
import io.rong.imlib.model.MessageContent;

//转账
@MessageTag(value = "KK:transMoney" , flag = MessageTag.ISCOUNTED)
public class TransferMoneyMessage extends MessageContent {
    private String text;
    private String money;
    public TransferMoneyMessage() {
    }

    public TransferMoneyMessage(byte[] data) {
        super(data);
        String jsonStr=null;
        try {
            jsonStr =new String(data,"UTF-8");
            JSONObject jsonObj = new JSONObject(jsonStr);
            this.setText(jsonObj.optString("text"));
            this.setMoney(jsonObj.optString("money"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static TransferMoneyMessage obtain(String text, String money){
        TransferMoneyMessage info =new TransferMoneyMessage();
        info.text =text;
        info.money = money;
        return info;
    }

    public static final Creator<TransferMoneyMessage> CREATOR = new Creator<TransferMoneyMessage>() {

        @Override
        public TransferMoneyMessage createFromParcel(Parcel source) {
            return new TransferMoneyMessage(source);
        }

        @Override
        public TransferMoneyMessage[] newArray(int size) {
            return new TransferMoneyMessage[size];
        }
    };

    public TransferMoneyMessage(Parcel parcel){
        this.text = ParcelUtils.readFromParcel(parcel);
        this.money = ParcelUtils.readFromParcel(parcel);
    }

    @Override
    public byte[] encode() {
        JSONObject object =new JSONObject();

        try {
            object.put("text",this.text);
            object.put("money",this.money);
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
        ParcelUtils.writeToParcel(dest, this.text);
        ParcelUtils.writeToParcel(dest,this.money);
    }

    @Override
    public int describeContents() {
        return 0;
    }


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    @Override
    public String toString() {
        return "TransferMoneyMessage{" +
                "text='" + text + '\'' +
                ", money='" + money + '\'' +
                '}';
    }
}

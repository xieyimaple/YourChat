public class RnRongPushModule extends ReactContextBaseJavaModule {
  private static final String TAG = "RnRongPushModule";

  public RnRongPushModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }
  /**
   这个函数就是给rn调用的
   调用方式为NativeModules.RnRongPushModule.setPushConfig(参数)
   */
  @ReactMethod
  public void setPushConfig(PushConfig pushconfig) {
    // 实现自己的逻辑
    rong.setPushConfig(pushconfig);
  }

  @Override
  public String getName() {
    return TAG;
  }
}

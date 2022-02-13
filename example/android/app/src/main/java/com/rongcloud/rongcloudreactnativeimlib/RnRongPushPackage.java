public class RnRongPushPackage implements ReactPackage {
    private RnRongPushModule mRnRongPushModule;

    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>(1);
        mRnRongPushModule = new RnRongPushModule(reactContext);
        modules.add(mRnRongPushModule);
        return modules;
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
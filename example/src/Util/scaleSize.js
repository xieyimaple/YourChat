import { Dimensions, PixelRatio } from "react-native";
const designWidth = 750;
const designHeight = 1334;

// 获取屏幕dp
const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;
const fontSize = PixelRatio.getFontScale();
const pixelRatio = PixelRatio.get();

// 根据dp获取屏幕px
const screenPxW = PixelRatio.getPixelSizeForLayoutSize(screenW);
const screenPxH = PixelRatio.getPixelSizeForLayoutSize(screenH);

/**
 * 适配字体
 * @param {} size 
 * @returns 
 */
const scaleFontSize = (size) => {
    const scaleWidth = screenW / designWidth;
    const scaleHeight = screenH / designHeight;
    const scale = Math.min(scaleWidth, scaleHeight);
    return Math.round(size * scale / fontSize + 0.5);
}
// 适配px宽度
const scaleSizeW = (size) => {
    const scaleWidth = size * screenPxW / designWidth;
    return Math.round(scaleWidth / pixelRatio + 0.5);
}

// 适配px高度
const scaleSizeH = (size) => {
    const scaleHeight = size * screenPxH / designHeight;
    return Math.round(scaleHeight / pixelRatio + 0.5);
}
export {
    scaleSizeH, scaleSizeW, scaleFontSize
}
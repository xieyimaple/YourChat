
/*
* 文件名: MeStyle.js
* 作者: liushun
* 描述: 我的页样式
* 修改人:
* 修改时间:
* 修改内容:
* */
import { scaleSizeH, scaleSizeW } from "../../Util/scaleSize"

export default getStyle = function () {
  return {
    userContainer: {
      height: scaleSizeH(260),
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textBox: {
      width: '61%',
      marginLeft: '5%',
      marginTop: scaleSizeH(120)
    },
    username: {
      fontSize: 18
    },
    notes: {
      marginTop: 20,
      fontSize: 14
    },
    iconRight: {
      marginTop: 130
    },
    listItemContainer: {
      width: '100%',
      height: 40
    },
    version: {
      width: '100%',
      height: 40,
      marginTop: 20
    }
  }
}


/*
* 文件名: MeStyle.js
* 作者: liushun
* 描述: 我的页样式
* 修改人:
* 修改时间:
* 修改内容:
* */


export default getStyle = function () {

  return {
    userContainer: {
      height: 200,
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textBox: {
      width: '55%',
      marginLeft: '10%',
      marginTop: 120
    },
    notes: {
      marginTop: 10
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

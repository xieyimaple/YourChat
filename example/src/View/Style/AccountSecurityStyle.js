import {Dimensions} from "react-native";

const window = Dimensions.get('window')
export default getStyle = function () {
  return{
    headerContainer: {
      backgroundColor: 'white',
      justifyContent: 'space-around',
      paddingRight: 30,
      height: 60,
      marginTop: 24,
    },
    listItem: {
      backgroundColor: '#ffffff',
      flexDirection: 'row'
    },
    textBox: {
      width: '90%'
    },
    iconRight: {
    },
    resetPsw: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      marginTop: 10
    },
    logout: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 25
    },
    red: {
      color: '#ff0000'
    }
  }
}

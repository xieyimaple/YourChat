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
    buttons: {
      flexDirection: 'row'
    },
    applyButton: {
      marginRight: 5
    },
    listItem: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textBox: {
      paddingRight: 10
    },
    resetPsw: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      marginTop: 10
    }
  }
}

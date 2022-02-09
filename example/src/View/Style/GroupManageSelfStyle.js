import {Dimensions} from "react-native";

const window = Dimensions.get('window')
export default getStyle = function () {
  return{
    headerContainer: {
      backgroundColor: '#0396fe',
      justifyContent: 'space-around',
      paddingRight: 30,
      height: 60,
      marginTop: 24,
    },
    allmember: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    listItem: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      justifyContent: 'space-between'
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

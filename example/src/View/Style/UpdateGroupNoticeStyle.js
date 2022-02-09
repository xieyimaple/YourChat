import {Dimensions} from "react-native";

const { width, height } = Dimensions.get('window')
export default getStyle = function () {
  return{
    headerContainer: {
      backgroundColor: 'white',
      justifyContent: 'space-around',
      paddingRight: 30,
      height: 60,
      marginTop: 24,
    },
    content: {
      marginTop: 25,
      flexDirection: 'column',
      alignItems: 'center'
    },
    Title: {
      marginLeft: -6
    },
    genderBox: {
      width: '100%',
      height: 50
    },
    gender: {
      borderWidth: 0,
      backgroundColor: 'white'
    },
    containerStyle: {
      height: 60,
      width: width-30,
      marginTop: 5
    },
    inputContainerStyle: {
      borderColor: '#ccc',
      height: 20
    },
    lastInputContainerStyle: {
      height: 20,
      borderBottomWidth: 0,
      marginBottom: 20
    },
    inputLabel: {
       color: '#333',
       height:30 
    },
    input: {
      color: '#999',
      fontSize: 12,
    },
    Button: {
      marginTop: 20,
      width: width-50,
      marginHorizontal: 25,
    }
  }
}

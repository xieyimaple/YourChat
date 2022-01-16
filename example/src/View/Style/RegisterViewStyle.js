import {Dimensions} from "react-native";
const { width, height } = Dimensions.get('window')


export default getStyle = function(){
  return{
    RegisterContainer: {
      flex: 1,
      flexDirection: 'column',
      marginTop: 10,
      // alignItems: 'center',
      // justifyContent: 'space-around'
    },
    RegisterForm: {
      marginHorizontal: 20,
      width: width-40,
      backgroundColor: 'white',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
      borderRadius: 20
    },
    uploadAvatar: {
      width: '100%',
    },
    Title: {
      fontWeight: 'bold',
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
      height:60,
      width: '100%',
      marginTop: 5
    },
    inputContainerStyle: {
      borderColor: '#ccc',
      height:20
    },
    lastInputContainerStyle: {
      height:20,
      borderBottomWidth:0,
      marginBottom: 20
    },
    inputLabel: {
       color: '#333',
       height:30 
    },
    input: {
      color: '#999',
      fontSize: 12
    },
    RegisterButton: {
      marginTop: 20,
      width: width-50,
      marginHorizontal: 25,
    }
  }
}

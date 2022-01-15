import {Dimensions} from "react-native";
const { width, height } = Dimensions.get('window')


export default getStyle = function(){
  return{
    LoginContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#ededed',
      marginTop: "auto",
      marginBottom: "auto"
    },
    tinyLogo: {
      marginTop: '13%',
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    LoginForm: {
      marginTop: '10%',
      width: width,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: 10,
      paddingHorizontal: 20
    },
    inputContainerStyle: {
      borderBottomWidth: 0
    },
    LoginInput: {
      borderRadius: 10,
      height: 50,
      backgroundColor: 'white'
    },
    LoginPassword: {
      borderRadius: 10,
      backgroundColor: 'white',
      height: 50,
      marginTop: 20
    },
    LoginButton: {
      marginTop: 20,
      width: width-50
    },
    bottomButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: width-50
    },
    gray: {
      color: '#999999'
    }
  }
}

import {Dimensions} from "react-native";
const { width, height } = Dimensions.get('window')


export default getStyle = function(){
  return{
    LoginContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ededed'
    },
    tinyLogo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    LoginForm: {
      marginTop: 80,
      width: width,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: 10,
      paddingHorizontal: 20
    },
    LoginInput: {
      borderRadius: 10,
      backgroundColor: 'white'
    },
    LoginPassword: {
      borderRadius: 10,
      backgroundColor: 'white',
      marginTop: 50
    },
    LoginButton: {
      marginTop: 20,
      width: width-50
    }
  }
}

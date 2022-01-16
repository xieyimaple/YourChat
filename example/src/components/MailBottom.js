import React from 'react'
import {View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {Badge, withBadge} from "react-native-elements";
import connect from "react-redux/es/connect/connect";


class MailBottom extends React.Component{
  constructor(props) {
    super(props);

  }

  render(){
    return(
      <View>
        <Icon color={this.props.focused?'#44a0df':'#9b9b9b'} name='contacts' size={20} />
        {/*<Badge  status="error" containerStyle={{ position: 'absolute', top: -5, right: -5}}/>*/}
      </View>
    )
  }

}

export default MailBottom;

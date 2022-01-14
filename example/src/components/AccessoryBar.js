import React from 'react'
import { StyleSheet, TouchableOpacity, View, } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class AccessoryBar extends React.Component {
  render() {
    const { onSend, isTyping } = this.props
    console.log(1);
    return (
      <View style={styles.container}>
        <Button name='photo' />
        <Button name='camera' />
        <Button name='my-location' />
        <Button name='chat' />
      </View>
    )
  }
}

const Button = ({
  size = 30,
  color = 'rgba(0,0,0,0.5)',
  ...props
}) => (
  <TouchableOpacity>
    <Icon size={size} color={color} {...props} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: '#029b03',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#029b03',
  },
})
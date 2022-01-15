import React, {Component} from 'react';
import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const {width} = Dimensions.get('window');
export default class CustomAlertDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({isVisible: nextProps.show});
    }

    closeModal() {
        this.setState({
            isVisible: false
        });
        this.props.closeModal(false);
    }

    renderItem(item, i) {
        return (
            <TouchableOpacity key={i} onPress={this.choose.bind(this, i)} style={styles.item}>
                <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
        );
    }

    choose(i) {
        if (this.state.isVisible) {
            this.props.callback(i);
            this.closeModal();
        }
    }

    renderDialog() {
        return (
            <View style={styles.modalStyle}>
                <View style={styles.optArea}>
                    {
                        this.entityList.map((item, i) => this.renderItem(item, i))
                    }
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{height: 400}}>
                <View
                    visible={this.state.isVisible}>
                    <Text>asdasdasd</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalStyle: {
        left: 0,
        bottom: 0,
        width: width,
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ededed',
    },
    optArea: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 12,
        marginBottom: 12,
    },
    item: {
        width: width,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
    }
});
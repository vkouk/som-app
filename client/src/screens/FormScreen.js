import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Form, Item, Input, Label, Icon, Button, Text, Picker } from 'native-base';

class FormScreen extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name='paper' style={[styles.icon, { color: '#0c627b' }]} />
        ),
    };

    state = {
        selected: undefined
    };

    renderFields = () => {
        return (
            <Picker
                mode="dropdown"
                placeholder="Select One"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Select your supply"
                textStyle={{ color: "#5cb85c" }}
                itemStyle={{
                    backgroundColor: "#d3d3d3",
                    marginLeft: 0,
                    paddingLeft: 10
                }}
                itemTextStyle={{ color: '#788ad2' }}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={e => event.target.value}
            >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
            </Picker>
        );
    };

    renderForm = () => {
        return (
            <View>
                <Form style={styles.formWrapper}>
                    {this.renderFields()}
                </Form>

                <Text style={styles.errorStyle}>
                    {this.props.error}
                </Text>

                <Button
                    block
                    light
                    style={styles.btnStyle}
                    action="submit"
                    onPress={this.onRegisterButtonPress}
                >
                    <Text>Buy!</Text>
                </Button>
            </View>
        );
    };

    render() {
        return(
            <View style={styles.container}>
                {this.renderForm()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    formWrapper: {
        marginTop: 80,
        marginBottom: 80,
        width: 280,
        height: 80
    },
    btnStyle: {
        marginLeft: 10
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        marginBottom: 20
    },
    icon: {
        width: 26,
        height: 26
    }
});

const mapStateToProps = ({ auth }) => {
    const { email, password, error } = auth;

    return { email, password, error };
};

export default connect(mapStateToProps)(FormScreen);

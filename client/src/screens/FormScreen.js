import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Form, Icon, Button, Text, Picker, Item, Input, Label } from 'native-base';
import { fetchSupplies, submitSupply } from "../actions";

class FormScreen extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name='paper' style={[styles.icon, { color: '#0c627b' }]} />
        ),
    };

    state = {
        selected: null,
        stock: null,
        error: '',
        success: ''
    };

    componentDidMount() {
        this.props.fetchSupplies();
    }

    onSupplyChange = value => {
        this.setState({ selected: value });
    };

    onStockChange = value => {
        const regex = /^[0-9\b]+$/;

        if (regex.test(value) || value === '') {
            this.setState({ stock: value , error: '' });
        } else {
            this.setState({ error: 'Stock amount must be digit only.', stock: '' });
        }
    };

    onBuyButtonPress = () => {
        const { stock, selected, error } = this.state;

        if (stock === null) {
            this.setState({ error: "Stock can't be blank.", success: "" });
        } else {
            this.setState({ error: "", success: "" });
        }

        this.props.submitSupply({ stock, _id: selected });
        if (error === '' && stock !== null) {
            this.setState({
                success: 'Thanks for buying.'
            });
        }
    };

    renderSupplies = () => {
        const filteredSupplies = this.props.supplies.filter(supply => supply.stock > 0 && this.state.stock <= supply.stock);

        return(
            <View>
                <Picker
                    mode="dropdown"
                    placeholder="Select One"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    placeholder="Select your supply"
                    textStyle={{ color: "#000" }}
                    itemStyle={{
                        marginLeft: 0,
                        paddingLeft: 10
                    }}
                    itemTextStyle={{ color: '#788ad2' }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onSupplyChange}
                >
                    {
                        filteredSupplies.map(supply => {
                            return(
                                <Picker.Item key={supply._id} label={`${supply.title} - ${supply.stock} Stock Left`} value={supply._id} />
                            );
                        })
                    }
                </Picker>
                <Item inlineLabel>
                    <Label>Stock Amount:</Label>
                    <Input
                        required
                        type="number"
                        value={this.state.stock}
                        onChangeText={this.onStockChange}
                        style={{color: '#000'}}
                    />
                </Item>
            </View>
        );
    };

    renderForm = () => {
        return (
            <View>
                <Form style={styles.formWrapper}>
                    {this.renderSupplies()}
                </Form>

                <Text style={styles.successStyle}>
                    {this.state.success}
                </Text>

                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>

                <Button
                    block
                    light
                    style={styles.btnStyle}
                    action="submit"
                    onPress={this.onBuyButtonPress}
                >
                    <Text style={{ color: '#fff'}}>Buy!</Text>
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
        marginLeft: 10,
        backgroundColor: '#0c627b'
    },
    icon: {
        width: 26,
        height: 26
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        marginBottom: 20
    },
    successStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'green',
        marginBottom: 20
    }
});

const mapStateToProps = ({ supplies }) => {
    return { supplies };
};

export default connect(mapStateToProps, { fetchSupplies, submitSupply })(FormScreen);
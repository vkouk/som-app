import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ImageBackground, Dimensions, StyleSheet, AsyncStorage } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Form, Item, Input, Label, Icon, Button, Text } from 'native-base';
import { loginUser,  registerUser, emailChanged, passwordChanged } from '../actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class AuthScreen extends Component {
    state = {
        selectedIndex: null,
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            this.props.navigation.navigate('home');
        }
    }

    onEmailChange = text => {
        this.props.emailChanged(text);
    };

    onPasswordChange = text => {
        this.props.passwordChanged(text);
    };

    onRegisterButtonPress = () => {
      const { email, password } = this.props;

      this.props.registerUser({ email, password });
    };

    onLoginButtonPress = () => {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    };

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex})
    };

    renderForm = () => {
      switch(this.state.selectedIndex) {
          case 0:
              return(
                  <View>
                      <Form style={styles.formWrapper}>
                          <Item floatingLabel>
                              <Label>Email</Label>
                              <Icon active name='ios-contact' style={{ color: 'white' }} />
                              <Input
                                  value={this.props.email}
                                  onChangeText={this.onEmailChange}
                                  style={{color: '#fff'}}
                              />
                          </Item>
                          <Item floatingLabel>
                              <Label>Password</Label>
                              <Icon active name='home' style={{ color: 'white' }} />
                              <Input
                                  value={this.props.password}
                                  onChangeText={this.onPasswordChange}
                                  style={{color: '#fff'}}
                                  secureTextEntry
                              />
                          </Item>
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
                        <Text>Register</Text>
                      </Button>
                  </View>
              );
          case 1:
              return(
                  <View>
                      <Form style={styles.formWrapper}>
                          <Item floatingLabel>
                              <Label>Email</Label>
                              <Icon active name='ios-contact' style={{ color: 'white' }} />
                              <Input
                                  value={this.props.email}
                                  onChangeText={this.onEmailChange}
                                  style={{color: '#fff'}}
                              />
                          </Item>
                          <Item floatingLabel>
                              <Label>Password</Label>
                              <Icon active name='home' style={{ color: 'white' }} />
                              <Input
                                  value={this.props.password}
                                  onChangeText={this.onPasswordChange}
                                  style={{color: '#fff'}}
                                  secureTextEntry
                              />
                          </Item>
                      </Form>

                      <Text style={styles.errorStyle}>
                          {this.props.error}
                      </Text>

                      <Button
                          block
                          light
                          style={styles.btnStyle}
                          action="submit"
                          onPress={this.onLoginButtonPress}
                      >
                          <Text>Login</Text>
                      </Button>
                  </View>
              );
          default:
              return null;
      }
    };

    render() {
        const buttons = ['Register', 'Login'];
        const { selectedIndex } = this.state;

        return(
            <ImageBackground
                style={styles.bgImageStyle}
                width={width}
                height={height}
                source={require('../../images/bg.jpg')}
            >
                <View style={styles.container}>
                    <ButtonGroup
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 50, backgroundColor: 'transparent', margin: 40 }}
                        onPress={this.updateIndex}
                    />
                    {this.renderForm()}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bgImageStyle: {
        flex: 1,
        alignSelf: 'stretch',
    },
    formWrapper: {
        marginTop: 20,
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
    }
});

const mapStateToProps = ({ auth }) => {
    const { email, password, error } = auth;

    return { email, password, error };
};

export default connect(mapStateToProps , { loginUser, registerUser, emailChanged, passwordChanged })(AuthScreen);
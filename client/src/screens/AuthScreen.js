import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Form, Item, Input, Label, Icon, Button, Text } from 'native-base';
import { userLogin, userRegister } from '../actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            error: ''
        };
    }

    componentDidMount() {
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete({token}) {
        if (token) {
            this.props.navigation.navigate('home');
        }
    }

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
                              <Label>Username</Label>
                              <Icon active name='ios-contact' style={{ color: 'white' }} />
                              <Input

                              />
                          </Item>
                      </Form>
                      <Form style={styles.formWrapper}>
                          <Item floatingLabel>
                              <Label>Password</Label>
                              <Icon active name='home' style={{ color: 'white' }} />
                              <Input
                                  secureTextEntry
                              />
                          </Item>
                      </Form>
                      <Form style={styles.formWrapper}>
                          <Item floatingLabel last>
                              <Label>Confirm Password</Label>
                              <Icon active name='home' style={{ color: 'white' }} />
                              <Input
                                  secureTextEntry
                              />
                          </Item>
                      </Form>
                      <Button
                          block
                          light
                          style={styles.btnStyle}
                          onPress={this.props.userRegister}
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
                              <Label>Username</Label>
                              <Icon active name='ios-contact' style={{ color: 'white' }} />
                              <Input

                              />
                          </Item>
                      </Form>
                      <Form style={styles.formWrapper}>
                          <Item floatingLabel>
                              <Label>Password</Label>
                              <Icon active name='home' style={{ color: 'white' }} />
                              <Input
                                  secureTextEntry
                              />
                          </Item>
                      </Form>
                      <Button
                          block
                          light
                          style={styles.btnStyle}
                          onPress={this.props.userLogin}
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
        marginTop: 10,
        marginBottom: 20,
        width: 280,
        height: 80
    },
    btnStyle: {
        marginLeft: 10
    }
});

mapStateToProps = ({auth}) => {
    return {
        token: auth
    };
};
export default connect(mapStateToProps, { userLogin, userRegister })(AuthScreen);

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, fetchUser } from "../actions";

import { Button, Text } from 'native-base';

class WelcomeScreen extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    onLogoutSubmit = () => {
      this.props.logoutUser();

      this.props.navigation.navigate('auth');
    };

    render() {
        return(
            <View>
                <Text>Hello</Text>
                <Button
                    block
                    light
                    action="submit"
                    onPress={this.onLogoutSubmit}
                >
                    <Text>Logout</Text>
                </Button>
            </View>
        );
    }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;

  return { user };
};

export default connect(mapStateToProps, { logoutUser, fetchUser })(WelcomeScreen);

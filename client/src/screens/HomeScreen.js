import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from "../actions";

import { Button, Text } from 'native-base';

class WelcomeScreen extends Component {
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

export default connect(null, { logoutUser })(WelcomeScreen);

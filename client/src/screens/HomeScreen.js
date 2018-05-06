import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, fetchUser } from "../actions";
import { Icon } from 'native-base';

import { Button, Text } from 'native-base';

class WelcomeScreen extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name='home' style={[styles.icon, { color: '#0c627b' }]} />
        ),
    };

    componentDidMount() {
        this.props.fetchUser();
    }

    onLogoutSubmit = () => {
      this.props.logoutUser();

      this.props.navigation.navigate('auth');
    };

    render() {
        return(
            <View style={styles.container}>
                <Text>Hello There User! Above some basic instructions will be given according to how to use the SOM Application.</Text>
                <Text style={{ marginTop: 30 }}>Above you should tap to supplies form which you will redirected to it. Then, there will be a select list in which you should select the one supply you want to buy, with the specific stock amount which should be not more than its individual supply stock. If no error exists and by presing the buy button if message 'Thanks for buying' appears, then everything went well and you should have bought your supply!!</Text>
                <Button
                    style={styles.btnSubmit}
                    block
                    light
                    action="submit"
                    onPress={this.onLogoutSubmit}
                >
                    <Text style={{ color: '#fff' }}>Logout</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        marginTop: 60,
        marginLeft: 15
    },
    btnSubmit: {
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 10,
        backgroundColor: '#0c627b'
    },
    icon: {
        width: 26,
        height: 26
    }
});

const mapStateToProps = ({ auth }) => {
  const { user } = auth;

  return { user };
};

export default connect(mapStateToProps, { logoutUser, fetchUser })(WelcomeScreen);

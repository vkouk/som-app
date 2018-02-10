import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

 class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello there!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#fff',
      color: 'black',
      alignItems: 'center',
      justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);

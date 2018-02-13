import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from '../store';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import FormScreen from '../screens/FormScreen';

class App extends Component {
  render() {
      const MainNavigator = TabNavigator({
          home: { screen: HomeScreen, navigationOptions: { title: 'Home'  } },
          form: { screen: FormScreen, navigationOptions: { title: 'Form'  } }
      });
      const MainScreenNavigator = StackNavigator({
          auth: { screen: AuthScreen, navigationOptions: { title: 'Register / Login', header: null }  },
          Tab: { screen: MainNavigator, navigationOptions: { header: null } }
      });

    return (
      <Provider store={store}>
          <MainScreenNavigator />
      </Provider>
    );
  }
}

export default App;

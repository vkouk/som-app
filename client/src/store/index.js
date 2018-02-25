import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers/';

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(reduxThunk),
        autoRehydrate()
    )
);

persistStore(store, { storage: AsyncStorage });

export default store;
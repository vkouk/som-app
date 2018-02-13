import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers/';
import reduxThunk from 'redux-thunk';

const persistedReducer = persistReducer({
    key: 'root',
    storage: AsyncStorage
}, reducers);

const store = createStore(
    persistedReducer,
    {},
    applyMiddleware(reduxThunk)
);

export default persistStore(store);
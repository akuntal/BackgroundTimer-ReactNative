import {createStore, combineReducers} from 'redux';
import {appReducer} from '../reducers';
import {AsyncStorage} from 'react-native';
import {persistReducer, persistStore} from 'redux-persist';

const rootReducer = combineReducers({appState: appReducer});

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['appState'],
  // Blacklist (Don't Save Specific Reducers)
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export {store, persistor};

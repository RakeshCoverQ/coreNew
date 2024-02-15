import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loginApi } from './api/loginApi';
import { ipApi } from './api/IPApi';
import userInfoReducer from './slice/loginSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const rootReducer = combineReducers({
  [loginApi.reducerPath]: loginApi.reducer,
  [ipApi.reducerPath]: ipApi.reducer,
  userInfo: userInfoReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["userInfo"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      ipApi.middleware
    ),
});

export const persistor = persistStore(store); // Create persistor

export default { store, persistor }; // Export both store and persistor

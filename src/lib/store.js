import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loginApi } from './api/loginApi';
import { ipApi } from './api/IPApi';
import userInfoReducer from './slice/loginSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { masterSubChildDataApi } from './api/masterSubChildDataApi';
import { addGeneralApi } from './api/addGeneralApi';
import { claimMasterApi } from './api/claimMasterApi';

const rootReducer = combineReducers({
  [loginApi.reducerPath]: loginApi.reducer,
  [ipApi.reducerPath]: ipApi.reducer,
  [masterSubChildDataApi.reducerPath]: masterSubChildDataApi.reducer,
  [addGeneralApi.reducerPath]: addGeneralApi.reducer,
  [claimMasterApi.reducerPath]: claimMasterApi.reducer,
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
      ipApi.middleware,
      masterSubChildDataApi.middleware,
      addGeneralApi.middleware,
      claimMasterApi.middleware,
    ),
});

export const persistor = persistStore(store); // Create persistor

export default { store, persistor }; // Export both store and persistor

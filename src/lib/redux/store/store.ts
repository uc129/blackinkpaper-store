import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Config } from 'redux-state-sync';
import cartReducer  from "./slices/cartSlice"
import uiReducer from "./slices/uiSlice"
import authReducer from "./slices/authSlice"

const rootReducer = combineReducers({
  cart: cartReducer,
  ui:uiReducer,
  auth: authReducer,
  // ... other reducers
});

const config:Config = {
  // blacklist: ['some-private-action'],
};




export const makeStore = () => {
    return configureStore({ reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for state-sync to pass actions across tabs
    })}
)};


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

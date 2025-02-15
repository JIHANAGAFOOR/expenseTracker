import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./persist";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "roots",
  storage: AsyncStorage,
};

const userReducer = combineReducers({
  expense: counterSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: persistedReducer,
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
      immutableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);

// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import ticketFormReducer from "./ticketSlice";

const persistConfig = {
    key: 'root',
    storage,
    // serialize: false,
};

const persistedReducer = persistReducer(persistConfig, ticketFormReducer);

const store = configureStore({
    reducer: {
        ticketform: persistedReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             // Ignore these action types
    //             ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    //             // Ignore these field paths in all actions
    //             ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
    //             // Ignore these paths in the state
    //             ignoredPaths: ['items.dates'],
    //         },
    //     }),
});

export const persistor = persistStore(store);
export default store;

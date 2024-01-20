import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { categorySlice } from "../features/category/categorySlice";
import { noteSlice } from "@/features/note/noteSlice";
import { layoutSlice } from "../features/layout/layoutSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Configurar la persistencia para el slice USER
const userPersistConfig = {
  key: "user",
  storage: storage,
};

const rootReducer = {
  users: persistReducer(userPersistConfig, userSlice.reducer),
  notes: noteSlice.reducer,
  categories: categorySlice.reducer,
  layout: layoutSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };

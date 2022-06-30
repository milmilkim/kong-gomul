import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import BookListSlice from "./slices/BookListSlice";

const store = configureStore({
  reducer: {
    booklist: BookListSlice,
    auth: AuthSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;

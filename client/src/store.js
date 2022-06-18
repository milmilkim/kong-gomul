import { configureStore } from "@reduxjs/toolkit";
import BookListSlice from "./slices/BookListSlice";

const store = configureStore({
  reducer: {
    booklist: BookListSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;

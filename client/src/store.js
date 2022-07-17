import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import BookListSlice from "./slices/BookListSlice";
import SearchSlice from "./slices/SearchSlice";
import ReviewSlice from "./slices/ReviewSlice";
import BookInfoSlice from "./slices/BookInfoSlice";
import MemberSlice from "./slices/MemberSlice";
import AnalysisSlice from "./slices/AnalysisSlice";

const store = configureStore({
  reducer: {
    booklist: BookListSlice,
    auth: AuthSlice,
    search: SearchSlice,
    review: ReviewSlice,
    bookInfo: BookInfoSlice,
    member: MemberSlice,
    analysis: AnalysisSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;

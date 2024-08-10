import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "../reducer/userInfoReducer";

export const rootReducer = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootReducer.dispatch;

import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "./userProfileApi"; // Importation de la fonction API

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserInfo, setLoading, setError } = userSlice.actions;

export const fetchUserProfile = (token) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getUserProfile(token);
    dispatch(setUserInfo(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default userSlice.reducer;

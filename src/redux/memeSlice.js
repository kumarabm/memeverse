import { createSlice } from '@reduxjs/toolkit';

export const memeSlice = createSlice({
  name: 'meme',
  initialState: {
    memes: [],
    likedMemes: [],
    currentMeme: null,
    user: {
      name: '',
      bio: '',
      profilePicture: '',
    },
  },
  reducers: {
    setMemes: (state, action) => {
      state.memes = action.payload;
    },
    setCurrentMeme: (state, action) => {
      state.currentMeme = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addLikedMeme: (state, action) => {
      state.likedMemes.push(action.payload);
    },
  },
});

export const { setMemes, setCurrentMeme, setUser, addLikedMeme } = memeSlice.actions;
export default memeSlice.reducer;

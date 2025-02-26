// src/actions/memeActions.js

export const likeMeme = (memeId) => {
    return {
      type: 'LIKE_MEME',
      payload: memeId,
    };
  };
  
  export const unlikeMeme = (memeId) => {
    return {
      type: 'UNLIKE_MEME',
      payload: memeId,
    };
  };
  
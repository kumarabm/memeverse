import axios from 'axios';

// Replace with actual API endpoint
const MEME_API_URL = 'https://api.imgflip.com/get_memes';

export const fetchMemes = async () => {
  try {
    const response = await axios.get(MEME_API_URL);
    return response.data.data.memes; // Customize based on API response structure
  } catch (error) {
    console.error('Error fetching memes:', error);
    return [];
  }
};

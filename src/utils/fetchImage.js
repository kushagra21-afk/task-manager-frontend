import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_xyz; // Replace with your Unsplash API Key
console.log('Unsplash Access Key:', process.env.REACT_APP_UNSPLASH_ACCESS_KEY);

export const fetchUnsplashImage = async (query) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    return response.data.results[0]?.urls?.regular || ''; // Return the first image URL or empty string
  } catch (error) {
    console.error('Failed to fetch Unsplash image:', error);
    return ''; // Return empty string if fetching fails
  }
};

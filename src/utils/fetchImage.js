import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_xyz; 
console.log('Unsplash Access Key:', process.env.REACT_APP_UNSPLASH_ACCESS_KEY);

export const fetchUnsplashImage = async (query) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    return response.data.results[0]?.urls?.regular || '';
  } catch (error) {
    console.error('Failed to fetch Unsplash image:', error);
    return ''; 
  }
};

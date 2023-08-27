import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

const getAccessTokenFromLocalStorage = () => {
  try {
    const persistRoot = localStorage.getItem('persist:root');
    if (persistRoot) {
      const persistData = JSON.parse(persistRoot);
      if (persistData && persistData.user) {
        const user = JSON.parse(persistData.user);
        if (user && user.currentUser && user.currentUser.accessToken) {
          return user.currentUser.accessToken;
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Error retrieving access token from localStorage:', error);
    return null;
  }
};



// Create an axios instance for public requests
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Create an axios instance for user requests with the token header
export const userRequest = createAuthenticatedAxiosInstance();

// Create an axios instance for authenticated requests
export const authRequest = createAuthenticatedAxiosInstance();

// Function to create an authenticated axios instance with the token header
function createAuthenticatedAxiosInstance() {
  const accessToken = getAccessTokenFromLocalStorage();
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return instance;
}

// Function to update the authRequest and userRequest axios instances with a new access token
export async function updateUserRequest(newAccessToken) {
  authRequest.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  userRequest.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
}

// Update the authRequest and userRequest instances initially with the retrieved access token
updateUserRequest(getAccessTokenFromLocalStorage())
  .then(() => {
    console.log(authRequest.defaults.headers.common['Authorization']); // This will show the updated access token if available
  })
  .catch((error) => {
    console.error('Error updating authRequest and userRequest axios instances:', error);
  });

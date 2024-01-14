import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://pixabay.com/api/?q=cat&page=1&key=11809160-30735c542d1a44d0753f02a93&image_type=photo&orientation=horizontal&per_page=12',
});

export const getAllPosts = () => {
  return instance.get("/");
};

// export const searchPost = search => {
//     return axios.get("")
// }

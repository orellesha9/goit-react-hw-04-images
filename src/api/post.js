import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://pixabay.com/api/?key=11809160-30735c542d1a44d0753f02a93&image_type=photo&orientation=horizontal',
});

export const getAllPosts = () => {
  return instance.get("/");
};

export const searchPosts = (q, page=1) => {
  return instance.get(`&q=${q}&per_page=12&page=${page}`)
}
// export const searchPost = search => {
//     return axios.get("")
// }

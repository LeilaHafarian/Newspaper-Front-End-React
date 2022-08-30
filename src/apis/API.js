import axios from "axios";
let baseURL = "https://localhost:44368/api/";
axios.defaults.baseURL = baseURL;
const responseBody = (response) => response;
const errorBody = (error) => {
  return error.response;
};
const requests = {
  get: (url) => axios.get(url).then(responseBody).catch(errorBody),
  post: (url, body) =>
    axios.post(url, body).then(responseBody).catch(errorBody),
  put: (url, body) => axios.put(url, body).then(responseBody).catch(errorBody),
  delete: (url) => axios.delete(url).then(responseBody).catch(errorBody),
  postFormData: (url, formData) => {
    
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody)
      .catch(errorBody);
  },
};
const Articles = {
  getArticles: () => requests.get(`articles`),
  deleteArticle:(id)=>requests.delete(`Articles/${id}`),
  updateArticle:(data)=>requests.put(`articles/${data.id}`, data),
  createArticle:(data)=>requests.post(`articles`, data)
};

const Journalist = {
  getJournalists: () => requests.get(`authors`),
  deleteJournalist:(id)=>requests.delete(`authors/${id}`),
  updateJournalist:(data)=>requests.put(`authors/${data.id}`, data),
  createJournalist:(data)=>requests.post(`authors`, data)
};

const Bilder={
  getAllImages:()=>requests.get('images'),
  uploadImage:(data)=>requests.postFormData('images',data)
}
export const getAllArticles = async () => {
  try {
    const response = await Articles.getArticles();
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getAllJournalist = async () => {
  try {
    const response = await Journalist.getJournalists();
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getAllImages= async () => {
  try {
    const response = await Bilder.getAllImages();
    return response.data;
  } catch (error) {
    return error;
  }
};
export const deleteArticle= async (id) => {
  try {
    const response = await Articles.deleteArticle(id);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteJournalist= async (id) => {
  try {
    const response = await Journalist.deleteJournalist(id);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateArticle= async (data) => {
  try {
    const response = await Articles.updateArticle(data);

    return response.data;
  } catch (error) {
    return error;
  }
};
export const createArticle= async (data) => {
  try {
    const response = await Articles.createArticle(data);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const updateJournalist= async (data) => {
  try {
    const response = await Journalist.updateJournalist(data);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const createJournalist= async (data) => {
  try {
    const response = await Journalist.createJournalist(data);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const uploadImage= async (data) => {
  try {
    const response = await Bilder.uploadImage(data);
    return response.data;
  } catch (error) {
    return error;
  }
};

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

const apiInfo = { baseUrl: "https://localhost:44399/api/tags" };
export default {
  getTags: async () => {
    let result = {};
    await axios.get(apiInfo.baseUrl).then((response) => {
      result = response.data;
    });
    return result;
  },
  getTag: async (id) =>
    await axios.get(apiInfo.baseUrl + "/" + id).then((response) => {
      console.log(response.data);
    }),
  createTag: async (tagToCreate) => {
    let newTag = {};
    await axios
      .post(apiInfo.baseUrl, {
        name: tagToCreate.name,
      })
      .then((response) => {
        newTag = response.data;
      });
    return newTag;
  },
  deleteTag: async (tagId) =>
    await axios.delete(apiInfo.baseUrl + "/" + tagId).then(() => {}),
};

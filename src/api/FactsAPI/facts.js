import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

const apiInfo = { baseUrl: "https://localhost:44399/api/facts" };
export default {
  getFacts: async () => {
    let result = {};
    await axios.get(apiInfo.baseUrl).then((response) => {
      result = response.data;
    });
    return result;
  },
  getFact: async (id) =>
    await axios.get(apiInfo.baseUrl + "/" + id).then((response) => {
      console.log(response.data);
    }),

  createFact: async (factToCreate) => {
    let newFact = {};
    await axios
      .post(apiInfo.baseUrl, {
        title: factToCreate.title,
        content: factToCreate.content,
      })
      .then((response) => {
        newFact = response.data;
      });
    return newFact;
  },

  updateFact: async (updatedFact) => {
    await axios
      .patch(apiInfo.baseUrl + "/" + updatedFact.id, {
        title: updatedFact.title,
        content: updatedFact.content,
      })
      .then((response) => {
        response.data;
      });
  },
  deleteFact: async (factId) =>
    await axios.delete(apiInfo.baseUrl + "/" + factId).then(() => {}),

  associateTagsToFact: async (factId, tags) => {
    let body = [];
    for (let i = 0; i < tags.length; i++) {
      body.push(tags[i].id);
    }
    console.log(body);
    await axios
      .patch(apiInfo.baseUrl + "/" + factId + "/tags", body)
      .then(() => {});
  },
  getFactTags: async (factId) => {
    let result = {};
    await axios
      .get(apiInfo.baseUrl + "/" + factId + "/tags")
      .then((response) => (result = response.data));
    return result;
  },
};

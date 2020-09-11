import api from "../../api/FactsAPI/tags";

const state = () => ({
  tags: [],
  selectedTag: null,
});

const mutations = {
  SET_ALL_TAGS(state, payload) {
    state.tags = payload;
  },
  SET_SELECTED_TAG(state, payload) {
    state.selectedTag = payload;
  },
  ADD_TAG(state, payload) {
    state.tags.push(payload);
  },
};

const getters = {
  tags: (state) => {
    return state.tags;
  },
  selectedTag: (state) => {
    return state.selectedTag;
  },
};

const actions = {
  fetchAllTags: async ({ commit }) => {
    await api.getTags().then((data) => commit("SET_ALL_TAGS", data));
  },
  setSelectedTag: ({ commit }, selectedTag) => {
    commit("SET_SELECTED_TAG", selectedTag);
  },
  deleteTag: async ({ commit }, tagToDelete) => {
    await api
      .deleteTag(tagToDelete.id)
      .then(() => commit("SET_SELECTED_TAG", null));
  },
  createTag: async ({ commit }, tagToCreate) => {
    let newTag = await api.createTag(tagToCreate);
    commit("ADD_TAG", newTag);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

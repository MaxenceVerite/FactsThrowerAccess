import api from "../../api/FactsAPI/facts";

const state = () => ({
  facts: [],
  selectedFact: null,
});

const mutations = {
  SET_ALL_FACTS(state, payload) {
    state.facts = payload;
  },
  SET_SELECTED_FACT(state, payload) {
    state.selectedFact = payload;
  },
  ADD_FACT(state, payload) {
    state.selectedFact.push(payload);
  },
};

const getters = {
  facts: (state) => {
    return state.facts;
  },
  selectedFact: (state) => {
    return state.selectedFact;
  },
};

const actions = {
  fetchAllFact: async ({ commit }) => {
    await api.getFacts().then((data) => commit("SET_ALL_FACTS", data));
  },
  fetchFactTags: async ({ state }, factId) => {
    console.log(state.selectedFact);

    let tags;
    await api.getFactTags(factId).then((data) => (tags = data));

    return tags;
  },
  setSelectedFact: ({ commit }, selectedFact) => {
    commit("SET_SELECTED_FACT", selectedFact);
  },
  deleteFact: async ({ commit }, factToDelete) => {
    await api
      .deleteFact(factToDelete.id)
      .then(() => commit("SET_SELECTED_FACT", null));
  },
  createFact: async ({ commit }, factToCreate) => {
    let newFact = await api.createFact(factToCreate);

    if (factToCreate.tags.count > 0) {
      await api.associateTagsToFact(newFact.id, factToCreate.tags);
    }
    commit("ADD_FACT", newFact);
  },
  updateFact: async ({ commit }, factToUpdate) => {
    await api.updateFact(factToUpdate);
    if (factToUpdate.tags.length > 0) {
      await api.associateTagsToFact(factToUpdate.id, factToUpdate.tags);
    }
    commit("SET_SELECTED_FACT", null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

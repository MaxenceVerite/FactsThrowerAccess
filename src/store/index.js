import Vue from "vue";
import Vuex from "vuex";
import facts from "./modules/facts";
import tags from "./modules/tags";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  modules: {
    facts,
    tags,
  },
});

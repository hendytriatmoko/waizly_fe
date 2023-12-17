import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    key: "waizly",
    storage: localStorage,
  }).plugin(store);
};

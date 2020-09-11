<template>
  <v-container>
    <h2>Facts</h2>
    <v-divider></v-divider>
    <FactsList />
    <v-img class="filigran" src="../../../assets/scroll.png"></v-img>
  </v-container>
</template>
<script>
import FactsList from "./FactsList";

export default {
  components: {
    FactsList
  }
};
</script>
<style scoped>
.filigran {
  position: absolute;
  opacity: 0.1;
  bottom: 40px;
  right: 40px;
  width: 400px;
  height: 400px;
}
</style>
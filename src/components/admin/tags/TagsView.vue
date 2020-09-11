<template>
  <v-container>
    <h2>Tags</h2>
    <v-divider></v-divider>
    <TagsList />
    <v-img class="filigran" src="../../../assets/tag.png"></v-img>
  </v-container>
</template>
<script>
import TagsList from "./TagsList";

export default {
  components: {
    TagsList
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
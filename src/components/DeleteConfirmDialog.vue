<template>
  <v-card>
    <v-card-title class="title red darken-2">Delete this {{concern}} from the base ?</v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="cancel()">
        Cancel
        <v-icon dark right>fa-window-close</v-icon>
      </v-btn>
      <v-btn color="error" text @click="confirm()">
        Confirm
        <v-icon dark right>fa-trash</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    concern: String
  },
  methods: {
    confirm() {
      this.$emit("confirm", true);
    },
    cancel() {
      this.$emit("confirm", false);
    }
  }
};
</script>

<style scoped>
.title {
  color: white;
}
</style>

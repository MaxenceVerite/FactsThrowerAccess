<template>
  <v-card form>
    <v-card-title class="title red darken-2">Create a fact</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="fact.title"
                  :counter="50"
                  :rules="factrules.title"
                  prepend-icon="fa-id-card"
                  label="Title"
                  filled
                  required
                  clearable
                ></v-text-field>

                <v-text-field
                  v-model="fact.content"
                  :rules="factrules.content"
                  :counter="200"
                  label="Content"
                  prepend-icon="fa-newspaper"
                  outlined
                  required
                  clearable
                ></v-text-field>

                <v-select
                  v-model="fact.tags"
                  :items="tags"
                  item-text="name"
                  item-value="id"
                  attach
                  chips
                  label="Tags"
                  multiple
                  prepend-icon="fa-tag"
                  outlined
                  :menu-props="{ top: true, offsetY: true }"
                ></v-select>
                <v-btn @click="clear()" text color="error">
                  Clear
                  <v-icon dark right>fa-undo</v-icon>
                </v-btn>
                <v-btn @click="submit()" color="success" outlined :disabled="!valid">
                  Create
                  <v-icon dark right>fa-check</v-icon>
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  async created() {
    await this.fetchAllTags();
  },
  computed: {
    ...mapGetters("tags", ["tags"])
  },

  methods: {
    ...mapActions("tags", ["fetchAllTags"]),
    clear() {
      this.fact.title = "";
      this.fact.content = "";
      this.fact.tags = [];
    },
    submit() {
      let creation = JSON.parse(JSON.stringify(this.fact));
      this.$emit("onCreateConfirm", creation);
      this.clear();
    }
  },

  data() {
    return {
      valid: false,
      fact: {
        title: "",
        content: "",
        tags: []
      },
      factrules: {
        title: [
          v => !!v || "Title is required",
          v => {
            (v && v.length <= 50 && v.length >= 5) ||
              "Title length must be between 5 and 30";
          }
        ],
        content: [
          v => !!v || "Content is required",
          v => {
            (v && v.length <= 200 && v.length >= 20) ||
              "Title length must be between 5 and 30";
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.title {
  color: white;
}
</style>

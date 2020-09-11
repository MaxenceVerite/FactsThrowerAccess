<template>
  <v-card form>
    <v-card-title class="title red darken-2">Edit a fact</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="tag.id" prepend-icon="fa-key" label="ID" disabled />
                <v-text-field
                  v-model="tag.name"
                  :counter="30"
                  :rules="tagRules.name"
                  label="Tag Name"
                  filled
                  required
                  clearable
                  prepend-icon="fa-tag"
                ></v-text-field>

                <v-btn @click="cancel()" text>
                  Cancel
                  <v-icon dark right>fa-window-close</v-icon>
                </v-btn>
                <v-btn @click="submit()" color="success" outlined :disabled="!valid">
                  Save Edit
                  <v-icon dark right>fa-save</v-icon>
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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("tags", ["selectedTag"])
  },

  watch: {
    selectedTag: {
      immediate: true,
      handler: function(newValue) {
        this.tag = JSON.parse(JSON.stringify(newValue));
      }
    }
  },

  methods: {
    submit() {
      let editedTag = JSON.parse(JSON.stringify(this.tag));
      this.$emit("onEditConfirm", editedTag);
    },
    cancel() {
      this.$emit("onEditConfirm", null);
    }
  },

  data() {
    return {
      valid: false,
      tag: {
        id: "",
        name: ""
      },
      tagRules: {
        name: [
          v => !!v || "Name is required",
          v => {
            (v && v.length <= 30 && v.length >= 5) ||
              "Tag length must stand between 5 and 30";
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
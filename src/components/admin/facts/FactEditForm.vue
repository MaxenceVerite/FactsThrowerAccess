<template>
  <v-card form>
    <v-card-title class="title red darken-2">Edit a fact</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="fact.id" prepend-icon="fa-key" label="ID" disabled />
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
                  :return-object="true"
                  attach
                  chips
                  label="Tags"
                  multiple
                  prepend-icon="fa-tag"
                  outlined
                  :menu-props="{ top: true, offsetY: true }"
                ></v-select>
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
import { mapGetters, mapActions } from "vuex";
export default {
  async created() {
    await this.fetchAllTags();
  },
  computed: {
    ...mapGetters("tags", ["tags"]),
    ...mapGetters("facts", ["selectedFact"])
  },

  watch: {
    selectedFact: {
      deep: true,
      immediate: true,
      handler: function(newValue) {
        this.fact = newValue;
      }
    }
  },

  methods: {
    ...mapActions("tags", ["fetchAllTags"]),
    submit() {
      let editedFact = JSON.parse(JSON.stringify(this.fact));
      this.$emit("onEditConfirm", editedFact);
    },
    cancel() {
      this.$emit("onEditConfirm", null);
    }
  },

  data() {
    return {
      valid: false,
      fact: {
        id: "",
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
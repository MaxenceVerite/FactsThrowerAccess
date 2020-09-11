  <template>
  <v-card form>
    <v-card-title class="title red darken-2 white-text">Create a tag</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
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
export default {
  methods: {
    clear() {
      this.tag.name = "";
    },
    submit() {
      this.$emit("onCreateConfirm", this.tag);
      this.clear();
    }
  },

  data() {
    return {
      valid: false,
      tag: {
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
.white-text {
  color: white;
}
</style>
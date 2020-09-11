<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, i) in tags" :key="i" cols="2">
        <v-card class="mx-auto" max-width="200" outlined elevation="2">
          <v-list-item>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>

          <v-card-actions>
            <v-btn text @click="openEditDialog(item)">
              <v-icon dark>fa-pen</v-icon>
            </v-btn>
            <v-btn text color="error" @click="openDeleteDialog(item)">
              <v-icon dark>fa-trash</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-btn @click="openCreateDialog()" fab dark large fixed right bottom x-large>
        <v-icon dark>fa-plus</v-icon>
      </v-btn>
    </v-row>

    <v-dialog v-model="deleteDialog" width="600">
      <DeleteConfirmDialog concern="tag" @confirm="onDeleteConfirm" />
    </v-dialog>

    <v-dialog v-model="createDialog">
      <TagCreateForm @onCreateConfirm="handleTagCreation" />
    </v-dialog>
    <v-dialog v-model="editDialog">
      <TagEditForm @onEditConfirm="handleTagUpdate" />
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DeleteConfirmDialog from "../../DeleteConfirmDialog";
import TagCreateForm from "../tags/TagCreateForm";
import TagEditForm from "../tags/TagEditForm";

export default {
  components: {
    DeleteConfirmDialog,
    TagCreateForm,
    TagEditForm
  },
  methods: {
    ...mapActions("tags", [
      "fetchAllTags",
      "createTag",
      "deleteTag",
      "updateTag",
      "setSelectedTag"
    ]),

    openDeleteDialog(toDelete) {
      if (!this.deleteDialog) {
        this.deleteDialog = true;
      }

      this.setSelectedTag(toDelete);
    },
    onDeleteConfirm(confirm) {
      if (confirm) {
        this.confirmDelete();
      }
      this.deleteDialog = false;
      this.setSelectedTag(null);
    },
    confirmDelete() {
      this.deleteTag(this.selectedTag);
    },
    openCreateDialog() {
      this.createDialog = true;
    },
    handleTagCreation(tag) {
      let newTag = { name: tag.name };
      this.createTag(newTag);
      this.createDialog = false;
    },
    openEditDialog(tag) {
      this.setSelectedTag(tag);
      this.editDialog = true;
    },
    async handleTagUpdate(tag) {
      this.editDialog = false;
      if (this.tag != null) {
        await this.updateTag(tag);
      }
      this.setSelectedTag(null);
    }
  },
  computed: {
    ...mapGetters("tags", ["tags", "selectedTag"])
  },

  data() {
    return {
      deleteDialog: false,
      editDialog: false,
      createDialog: false
    };
  },
  created() {
    this.fetchAllTags();
  }
};
</script>

<style scoped>
</style>
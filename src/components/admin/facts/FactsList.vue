<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, i) in factList" :key="i" cols="3">
        <v-card class="mx-auto" max-width="344" outlined elevation="2">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                <p class="font-weight-bold">{{ item.title }}</p>
              </div>
              <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
              <div v-if="item.tags.length > 0">
                <v-chip-group>
                  <v-chip v-for="tag in item.tags" :key="tag.id">{{
                    tag.name
                  }}</v-chip>
                </v-chip-group>
              </div>
              <div v-else>
                <v-chip-group>
                  <v-chip>Aucun Tag</v-chip>
                </v-chip-group>
              </div>
            </v-list-item-content>
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

      <v-btn
        @click="openCreateDialog()"
        fab
        dark
        large
        fixed
        right
        bottom
        x-large
      >
        <v-icon dark>fa-plus</v-icon>
      </v-btn>
    </v-row>

    <v-dialog v-model="deleteDialog" width="600">
      <DeleteConfirmDialog concern="fact" @confirm="onDeleteConfirm" />
    </v-dialog>

    <v-dialog v-model="createDialog">
      <FactCreateForm @onCreateConfirm="handleFactCreation" />
    </v-dialog>
    <v-dialog v-model="editDialog">
      <FactEditForm @onEditConfirm="handleFactUpdate" />
    </v-dialog>
  </v-container>
</template>

<script>
import DeleteConfirmDialog from "../../DeleteConfirmDialog";
import FactCreateForm from "./FactCreateForm";
import FactEditForm from "./FactEditForm";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    DeleteConfirmDialog,
    FactCreateForm,
    FactEditForm,
  },
  data() {
    return {
      factList: [],
      deleteDialog: false,
      editDialog: false,
      createDialog: false,
    };
  },

  computed: {
    ...mapGetters("facts", ["facts", "selectedFact"]),
  },

  async created() {
    await this.fetchAllFact();

    for (let i = 0; i < this.facts.length; i++) {
      let currentFact = this.facts[i];
      let tags = await this.fetchFactTags(currentFact.id);

      this.factList.push({
        id: currentFact.id,
        title: currentFact.title,
        content: currentFact.content,
        tags: tags,
      });
    }
  },

  methods: {
    ...mapActions("facts", [
      "fetchAllFact",
      "setSelectedFact",
      "deleteFact",
      "createFact",
      "updateFact",
      "fetchFactTags",
    ]),

    openDeleteDialog(toDelete) {
      if (!this.deleteDialog) {
        this.deleteDialog = true;
      }

      this.setSelectedFact(toDelete);
    },
    onDeleteConfirm(confirm) {
      if (confirm) {
        this.confirmDelete();
      }
      this.deleteDialog = false;
      this.setSelectedFact(null);
    },
    confirmDelete() {
      this.deleteFact(this.selectedFact);
    },
    openCreateDialog() {
      this.createDialog = true;
    },
    async handleFactCreation(fact) {
      this.createDialog = false;
      await this.createFact(fact);
    },
    openEditDialog(toEdit) {
      if (!this.editDialog) {
        this.editDialog = true;
      }

      this.setSelectedFact(toEdit);
    },
    async handleFactUpdate(fact) {
      this.editDialog = false;

      if (fact != null) {
        await this.updateFact(fact);
        this.setSelectedFact(null);
      }
    },
  },
};
</script>

<style scoped></style>

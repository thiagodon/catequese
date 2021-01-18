<template>
  <div id="ClassesList">
    <div>
      <ClassesForm
        v-if="showModal"
        @close="closeModal()"
        v-bind:classe="classe"
      >
      </ClassesForm>
    </div>
    <div>
      <CatechistsForm
        v-if="showModalCatechist"
        @close="closeModalCatechist()"
        v-bind:classe="classeSelected"
      >
      </CatechistsForm>
    </div>
    <div
      class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow"
    >
      <div class="mr-auto p-2">
        <h6 class="mb-0 text-white lh-100">Lista de Turmas</h6>
        <small>Salas Disponíveis para catequse</small>
      </div>
      <button
        class="btn btn-primary p-2"
        id="show-modal"
        @click="setShowModal()"
      >
        Adicionar Turmas
      </button>
    </div>
    <div class="my-3 p-3 bg-white rounded box-shadow">
      <div class="mb-3" v-for="group in groupsList" :key="group.id">
        <h3 class="alert alert-info">{{ group.name }}</h3>
        <div v-for="level in group.levels" :key="level.id">
          <div class="row ml-1">
            <b-card
              :class="'col-12 col-sm-12 col-md-5 mr-3 mb-3 p-0'"
              v-for="classe in level.classes"
              :key="classe.id"
              :title="classe.level.name"
              header-tag="header"
              footer-tag="footer"
            >
              <template #header>
                <div class="d-flex">
                  <h3 class="mr-auto p-2">
                    {{ classe.location.name }} - {{ classe.room.name }}
                  </h3>
                  <button
                    @click.prevent="edit(classe)"
                    class="btn btn-primary p-2"
                  >
                    Editar
                  </button>
                  <button
                    @click.prevent="deleteClasse(classe.id)"
                    class="btn btn-danger p-2"
                  >
                    Excluir
                  </button>
                </div>
              </template>
              <b-card-text>
                <strong> Catequistas:</strong>
                <table class="table">
                  <tbody>
                    <tr
                      v-for="catechist in classe.catechists"
                      :key="catechist.id"
                    >
                      <td>{{ catechist.name }}</td>
                      <td>
                        <button
                          @click.prevent="
                            deleteCatechistClasse(classe, catechist.id)
                          "
                          class="btn btn-danger p-2"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
              </b-card-text>
              <b-button @click="setShowModalCatechist(classe)" variant="primary"
                >Adicionar Catequistas</b-button
              >
              <template #footer>
                <em>{{ classe.day.day_week }} - {{ classe.day.schedule }}</em>
              </template>
            </b-card>
          </div>
        </div>
      </div>
      <!-- <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nível</th>
              <th>Comunidade</th>
              <th>Sala</th>
              <th>Horário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="classe in classesList" :key="classe.id">
              <td>{{ classe.level.name }}</td>
              <td>{{ classe.location.name }}</td>
              <td>{{ classe.room.name }} - {{ classe.room.location.name }}</td>
              <td>{{ classe.day.day_week }} - {{ classe.day.schedule }}</td>
              <td>
                <button @click.prevent="edit(classe)" class="btn btn-primary">
                  Editar
                </button>
                <button
                  @click.prevent="deleteClasse(classe.id)"
                  class="btn btn-danger"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->
      <small class="d-block text-right mt-3">
        <a href="#"></a>
      </small>
    </div>
  </div>
</template>

<script>
import { classes, groups, levels, catechists } from "../../db";
import ClassesForm from "./ClassesForm";
import CatechistsForm from "./CatechistsForm";

export default {
  name: "ClassesList",
  components: {
    ClassesForm,
    CatechistsForm,
  },
  data() {
    return {
      classesList: [],
      groupsList: [],
      levelsList: [],
      classe: {
        id: "",
        level: "",
        location: "",
        room: "",
        day: "",
      },
      showModal: false,
      showModalCatechist: false,
      classeSelected: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    closeModal(){
      this.showModal = false;
      this.getData();
    },
    closeModalCatechist(){
      this.showModalCatechist = false;
      this.getData();
    },
    getData() {
      this.groupsList = [];
      groups.orderBy("order", "asc").onSnapshot((snapshotChange) => {
        this.groupsList = [];
        snapshotChange.forEach((doc) => {
          let levelsList = [];
          levels
            .where("group.id", "==", doc.id)
            .onSnapshot((snapshotChange) => {
              levelsList = [];
              snapshotChange.forEach((sub_doc) => {
                let classesList = [];
                classes
                  .where("level.id", "==", sub_doc.id)
                  .onSnapshot((snapshotChange) => {
                    classesList = [];
                    snapshotChange.forEach((classeDoc) => {
                      classesList.push({
                        id: classeDoc.id,
                        name: classeDoc.data().name,
                        location: classeDoc.data().location,
                        level: classeDoc.data().level,
                        room: classeDoc.data().room,
                        day: classeDoc.data().day,
                        catechists: classeDoc.data().catechists,
                      });
                    });
                    levelsList.push({
                      id: sub_doc.id,
                      name: sub_doc.data().name,
                      group: sub_doc.data().group,
                      classes: classesList,
                    });
                  });
              });
              this.groupsList.push({
                id: doc.id,
                name: doc.data().name,
                order: doc.data().order,
                levels: levelsList,
              });
            });
        });
      });
    },
    deleteClasse(id) {
      if (window.confirm("Você tem certeza que deseja deletar?")) {
        classes
          .doc(id)
          .delete()
          .then(() => {
            console.log("Local deletado!");
          })
          .catch((error) => {
            console.error(error);
          });
          this.getData();
      }
    },
    setShowModal() {
      this.showModal = true;
      this.classe = {
        id: "",
        level: "",
        location: "",
        room: "",
        day: "",
        created_by: "",
        created_at: "",
        updated_by: "",
        updated_at: "",
      };
    },
    setShowModalCatechist(classe) {
      this.classeSelected = classe;
      this.showModalCatechist = true;
    },
    edit(classe) {
      this.classe = classe;
      this.showModal = true;
    },
    deleteCatechistClasse(classe, catechist) {
      if (window.confirm("Você tem certeza que deseja deletar?")) {
        let newCatechists = [];
        classe.catechists.forEach((value) => {
          console.error(value);
          if (value.id != catechist) {
            newCatechists.push(value);
          }
        });
        classes
          .doc(classe.id)
          .update({
            catechists: newCatechists,
          })
          .then(function () {
            alert("Dados enviados com sucesso!");
          });
        catechists.doc(catechist).update(
          {
            selected: false,
            classe: ''
          }
        );
          this.getData();

      }
    },
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
</style>
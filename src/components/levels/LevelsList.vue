<template>
  <div id="LevelsList">
    <div>
      <LevelsForm 
        v-if="showModal" 
        @close="showModal = false"
        v-bind:level="level"
      >
      </LevelsForm>
    </div>
<div
      class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow"
    >
      <div class="mr-auto p-2">
        <h6 class="mb-0 text-white lh-100">Lista de Níveis</h6>
        <small>Níveis para as turmas de catequese</small>
      </div>
      <button
        class="btn btn-primary p-2"
        id="show-modal"
        @click="setShowModal()"
      >
        Adicionar Nível
      </button>
    </div>
    <div class="my-3 p-3 bg-white rounded box-shadow"> 
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="level in levelsList" :key="level.id">
            <td>{{ level.name }}</td>
            <td>
              <button
                @click.prevent="edit(level)"

                class="btn btn-primary"
                >Editar
              </button>
              <button
                @click.prevent="deleteLevel(level.id)"
                class="btn btn-danger"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
          <small class="d-block text-right mt-3">
        <a href="#"></a>
      </small>
    </div>
  </div>
</template>

<script>
import { levels } from "../../db";
import LevelsForm from "./LevelsForm"

export default {
  name: "LevelsList",
  components: {
    LevelsForm
  },
  data() {
    return {
      levelsList: [],
      level: {
        id: '',
        name: '',
        group: '',
      },
      showModal: false,
    };
  },
  created() {
    this.getLevels();
  },
  methods: {
    getLevels() {
      levels
        .onSnapshot((snapshotChange) => {
          this.levelsList = [];
          snapshotChange.forEach((doc) => {
            this.levelsList.push({
              id: doc.id,
              name: doc.data().name,
              group: doc.data().group,
            });
            console.log(doc.id, " => ", doc.data());
          });
        });
    },
    deleteLevel(id) {
      if (window.confirm("Você tem certeza que deseja deletar?")) {
        levels
          .doc(id)
          .delete()
          .then(() => {
            console.log("Local deletado!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    setShowModal(){
      this.showModal = true;
      this.level = {
        grroup: "",
        name: "",
        created_by: "",
        created_at: "",
        updated_by: "",
        updated_at: "",
      };
    },
    edit(level){
      this.level = level;
      this.showModal = true;
    }
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
</style>
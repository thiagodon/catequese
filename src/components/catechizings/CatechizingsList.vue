<template>
  <div id="CatechizingsList">
    <div>
      <CatechizingsForm
        v-if="showModal"
        @close="showModal = false"
        v-bind:catechizing="catechizing"
      >
      </CatechizingsForm>
    </div>
    <div
      class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow"
    >
      <div class="mr-auto p-2">
        <h6 class="mb-0 text-white lh-100">Lista de Catequisandos</h6>
        <small>Cadastro de Catequizandos</small>
      </div>
      <button
        class="btn btn-primary p-2"
        id="show-modal"
        @click="setShowModal()"
      >
        Adicionar Catequizandos
      </button>
    </div>
    <div class="my-3 p-3 bg-white rounded box-shadow">
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Dt. Nasc.</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Comunidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="catechizing in catechizingsList" :key="catechizing.id">
              <td>{{ catechizing.name }}</td>
              <td>{{ catechizing.birth_date | formatDate }}</td>
              <td>{{ catechizing.phone }}</td>
              <td>{{ catechizing.email }}</td>
              <td>{{ catechizing.community }}</td>
              <td>
                <button @click.prevent="edit(catechizing)" class="btn btn-primary">
                  Editar
                </button>
                <button
                  @click.prevent="deleteCatechizing(catechizing.id)"
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
import { catechizings } from "../../db";
import CatechizingsForm from "./CatechizingsForm";

export default {
  name: "CatechizingsList",
  components: {
    CatechizingsForm,
  },
  data() {
    return {
      catechizingsList: [],
      catechizing: {
        id: "",
        name: "",
        birth_date: "",
        phone: "",
        email: "",
        community: "",
        note: "",
      },
      showModal: false,
    };
  },
  created() {
    this.getCatechizings();
  },
  methods: {
    getCatechizings() {
      catechizings.onSnapshot((snapshotChange) => {
        this.catechizingsList = [];
        snapshotChange.forEach((doc) => {
          this.catechizingsList.push({
            id: doc.id,
            name: doc.data().name,
            birth_date: doc.data().birth_date,
            phone: doc.data().phone,
            email: doc.data().email,
            community: doc.data().community,
            note: doc.data().note,
          });
          console.log(doc.id, " => ", doc.data());
        });
      });
    },
    deleteCatechizing(id) {
      if (window.confirm("Você tem certeza que deseja deletar?")) {
        catechizings
          .doc(id)
          .delete()
          .then(() => {
            console.log("Catequista deletado!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    setShowModal() {
      this.showModal = true;
      this.catechizing = {
        name: "",
        birth_date: "",
        phone: "",
        email: "",
        community: "",
        note: "",
        created_by: "",
        created_at: "",
        updated_by: "",
        updated_at: "",
      };
    },
    edit(catechizing) {
      this.catechizing = catechizing;
      this.showModal = true;
    },
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
</style>
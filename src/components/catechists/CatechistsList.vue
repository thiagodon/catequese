<template>
  <div id="CatechistsList">
    <div>
      <CatechistsForm
        v-if="showModal"
        @close="showModal = false"
        v-bind:catechist="catechist"
      >
      </CatechistsForm>
    </div>
    <div
      class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow"
    >
      <div class="mr-auto p-2">
        <h6 class="mb-0 text-white lh-100">Lista de Catequistas</h6>
        <small>Cadastro de Catequistas</small>
      </div>
      <button
        class="btn btn-primary p-2"
        id="show-modal"
        @click="setShowModal()"
      >
        Adicionar Catequista
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
              <th>Disponibilidade</th>
              <th>Comunidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="catechist in catechistsList" :key="catechist.id">
              <td>{{ catechist.name }}</td>
              <td>{{ catechist.birth_date | formatDate }}</td>
              <td>{{ catechist.phone }}</td>
              <td>{{ catechist.email }}</td>
              <td>{{ catechist.availability }}</td>
              <td>{{ catechist.community }}</td>
              <td>
                <button @click.prevent="edit(catechist)" class="btn btn-primary">
                  Editar
                </button>
                <button
                  @click.prevent="deleteCatechist(catechist.id)"
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
import { catechists } from "../../db";
import CatechistsForm from "./CatechistsForm";

export default {
  name: "CatechistsList",
  components: {
    CatechistsForm,
  },
  data() {
    return {
      catechistsList: [],
      catechist: {
        id: "",
        name: "",
        birth_date: "",
        phone: "",
        email: "",
        availability: "",
        community: "",
        note: "",
      },
      showModal: false,
    };
  },
  created() {
    this.getCatechists();
  },
  methods: {
    getCatechists() {
      catechists.onSnapshot((snapshotChange) => {
        this.catechistsList = [];
        snapshotChange.forEach((doc) => {
          this.catechistsList.push({
            id: doc.id,
            name: doc.data().name,
            birth_date: doc.data().birth_date,
            phone: doc.data().phone,
            email: doc.data().email,
            availability: doc.data().availability,
            community: doc.data().community,
            note: doc.data().note,
          });
          console.log(doc.id, " => ", doc.data());
        });
      });
    },
    deleteCatechist(id) {
      if (window.confirm("Você tem certeza que deseja deletar?")) {
        catechists
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
      this.catechist = {
        name: "",
        birth_date: "",
        phone: "",
        email: "",
        availability: "",
        community: "",
        note: "",
        created_by: "",
        created_at: "",
        updated_by: "",
        updated_at: "",
      };
    },
    edit(catechist) {
      this.catechist = catechist;
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
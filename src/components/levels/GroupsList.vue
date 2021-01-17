<template>
  <div id="GroupsList">
    <div>
      <GroupsForm
        v-if="showModal"
        @close="showModal = false"
        v-bind:group="group"
      >
      </GroupsForm>
    </div>
    <div
      class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow"
    >
      <div class="mr-auto p-2">
        <h6 class="mb-0 text-white lh-100">Lista de Níveis Mairoes</h6>
        <small>Cadastro de Níveis Maiores</small>
      </div>
      <button
        class="btn btn-primary p-2"
        id="show-modal"
        @click="setShowModal()"
      >
        Adicionar Nível Maior
      </button>
    </div>
    <div class="my-3 p-3 bg-white rounded box-shadow">
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ordem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="group in groupsList" :key="group.id">
              <td>{{ group.name }}</td>
              <td>{{ group.order }}</td>
              <td>
                <button @click.prevent="edit(group)" class="btn btn-primary">
                  Editar
                </button>
                <button
                  @click.prevent="deleteGroup(group.id)"
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
import { groups } from "../../db";
import GroupsForm from "./GroupsForm";

export default {
  name: "GroupsList",
  components: {
    GroupsForm,
  },
  data() {
    return {
      groupsList: [],
      group: {
        id: "",
        order: "",
        name: "",
      },
      showModal: false,
    };
  },
  created() {
    this.getGroups();
  },
  methods: {
    getGroups() {
      groups.orderBy("order").onSnapshot((snapshotChange) => {
        this.groupsList = [];
        snapshotChange.forEach((doc) => {
          this.groupsList.push({
            id: doc.id,
            name: doc.data().name,
            order: doc.data().order,
          });
          console.log(doc.id, " => ", doc.data());
        });
      });
    },
    deleteGroup(id) {
      if (window.confirm("Você tem certeza que deseja deletar?")) {
        groups
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
    setShowModal() {
      this.showModal = true;
      this.group = {
        order: "",
        name: "",
        created_by: "",
        created_at: "",
        updated_by: "",
        updated_at: "",
      };
    },
    edit(group) {
      this.group = group;
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
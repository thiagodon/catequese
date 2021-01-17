<template>
  <div id="LocationsList">
    <div>
      <LocationsForm
        v-if="showModal"
        @close="showModal = false"
        v-bind:location="location"
      >
      </LocationsForm>
    </div>
    <div
      class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow"
    >
      <div class="mr-auto p-2">
        <h6 class="mb-0 text-white lh-100">Lista de Locais</h6>
        <small>Comunidades que receberam turmas de catequese</small>
      </div>
      <button
        class="btn btn-primary p-2"
        id="show-modal"
        @click="setShowModal()"
      >
        Adicionar Local
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
            <tr v-for="location in locationsList" :key="location.id">
              <td>{{ location.name }}</td>
              <td>
                <button @click.prevent="edit(location)" class="btn btn-primary">
                  Editar
                </button>
                <button
                  @click.prevent="deleteLocation(location.id)"
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
import { locations } from "../../db";
import LocationsForm from "./LocationsForm";

export default {
  name: "LocationsList",
  components: {
    LocationsForm,
  },
  data() {
    return {
      locationsList: [],
      location: {
        id: "",
        name: "",
      },
      showModal: false,
    };
  },
  created() {
    this.getLocations();
  },
  methods: {
    getLocations() {
      locations.onSnapshot((snapshotChange) => {
        this.locationsList = [];
        snapshotChange.forEach((doc) => {
          this.locationsList.push({
            id: doc.id,
            name: doc.data().name,
          });
          console.log(doc.id, " => ", doc.data());
        });
      });
    },
    deleteLocation(id) {
      if (window.confirm("Você tem certeza que deseja deletar?")) {
        locations
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
      this.location = {
        name: "",
        created_by: "",
        created_at: "",
        updated_by: "",
        updated_at: "",
      };
    },
    edit(location) {
      this.location = location;
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
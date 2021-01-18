<template>
  <div id="RoomsList">
    <div>
      <RoomsForm
        v-if="showModal"
        @close="showModal = false"
        v-bind:room="room"
      >
      </RoomsForm>
    </div>
    <div
      class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow"
    >
      <div class="mr-auto p-2">
        <h6 class="mb-0 text-white lh-100">Lista de Salas</h6>
        <small>Salas Disponíveis para catequse</small>
      </div>
      <button
        class="btn btn-primary p-2"
        id="show-modal"
        @click="setShowModal()"
      >
        Adicionar Salas
      </button>
    </div>
    <div class="my-3 p-3 bg-white rounded box-shadow">
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Comunidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="room in roomsList" :key="room.id">
              <td>{{ room.name }}</td>
              <td>{{ room.location.name }}</td>
              <td>
                <button @click.prevent="edit(room)" class="btn btn-primary">
                  Editar
                </button>
                <button
                  @click.prevent="deleteRoom(room.id)"
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
import { rooms } from "../../db";
import RoomsForm from "./RoomsForm";

export default {
  name: "RoomsList",
  components: {
    RoomsForm,
  },
  data() {
    return {
      roomsList: [],
      room: {
        id: "",
        name: "",
        location: "",
        available: "",
        classe: "",
      },
      showModal: false,
    };
  },
  created() {
    this.getRooms();
  },
  methods: {
    getRooms() {
      rooms.onSnapshot((snapshotChange) => {
        this.roomsList = [];
        snapshotChange.forEach((doc) => {
          this.roomsList.push({
            id: doc.id,
            name: doc.data().name,
            location: doc.data().location,
            available: doc.data().available,
            classe: doc.data().classe,
          });
          console.log(doc.id, " => ", doc.data());
        });
      });
    },
    deleteRoom(id) {
      if (window.confirm("Você tem certeza que deseja deletar?")) {
        rooms
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
      this.room = {
        name: "",
        location: "",
        available: "",
        classe: "",
        created_by: "",
        created_at: "",
        updated_by: "",
        updated_at: "",
      };
    },
    edit(room) {
      this.room = room;
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
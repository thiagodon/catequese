<template>
  <div id="DaysList">
    <div>
      <DaysForm v-if="showModal" @close="showModal = false" v-bind:day="day">
      </DaysForm>
    </div>
    <div
      class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow"
    >
      <div class="mr-auto p-2">
        <h6 class="mb-0 text-white lh-100">Lista de Dias da Semana</h6>
        <small>Dias da Semana e Horários que acontecerão os encontros de catequese</small>
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
              <th>Dia da Semana</th>
              <th>Horário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in daysList" :key="day.id">
              <td>{{ day.day_week }}</td>
              <td>{{ day.schedule }}</td>
              <td>
                <button @click.prevent="edit(day)" class="btn btn-primary">
                  Editar
                </button>
                <button
                  @click.prevent="deleteLocation(day.id)"
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
import { days } from "../../db";
import DaysForm from "./DaysForm";

export default {
  name: "DaysList",
  components: {
    DaysForm,
  },
  data() {
    return {
      daysList: [],
      day: {
        id: "",
        day_week: "",
        schedule: "",
      },
      showModal: false,
    };
  },
  created() {
    this.getDays();
  },
  methods: {
    getDays() {
      days.onSnapshot((snapshotChange) => {
        this.daysList = [];
        snapshotChange.forEach((doc) => {
          this.daysList.push({
            id: doc.id,
            day_week: doc.data().day_week,
            schedule: doc.data().schedule,
          });
          console.log(doc.id, " => ", doc.data());
        });
      });
    },
    deleteLocation(id) {
      if (window.confirm("Você tem certeza que deseja deletar?")) {
        days
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
      this.day = {
        day_week: "",
        schedule: "",
        created_by: "",
        created_at: "",
        updated_by: "",
        updated_at: "",
      };
    },
    edit(day) {
      this.day = day;
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
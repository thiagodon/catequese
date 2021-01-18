<template>
  <div id="EnrollmentsList">
    <div>
      <EnrollmentsForm
        v-if="showModal"
        @close="showModal = false"
        v-bind:enrollment="enrollment"
      >
      </EnrollmentsForm>
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
            <tr v-for="enrollment in enrollmentsList" :key="enrollment.id">
              <td>{{ enrollment.name }}</td>
              <td>{{ enrollment.birth_date | formatDate }}</td>
              <td>{{ enrollment.phone }}</td>
              <td>{{ enrollment.email }}</td>
              <td>{{ enrollment.community }}</td>
              <td>
                <button @click.prevent="edit(enrollment)" class="btn btn-primary">
                  Editar
                </button>
                <button
                  @click.prevent="deleteEnrollment(enrollment.id)"
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
import { enrollments } from "../../db";
import EnrollmentsForm from "./EnrollmentsForm";

export default {
  name: "EnrollmentsList",
  components: {
    EnrollmentsForm,
  },
  data() {
    return {
      enrollmentsList: [],
      enrollment: {
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
    this.getEnrollments();
  },
  methods: {
    getEnrollments() {
      enrollments.onSnapshot((snapshotChange) => {
        this.enrollmentsList = [];
        snapshotChange.forEach((doc) => {
          this.enrollmentsList.push({
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
    deleteEnrollment(id) {
      if (window.confirm("Você tem certeza que deseja deletar?")) {
        enrollments
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
      this.enrollment = {
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
    edit(enrollment) {
      this.enrollment = enrollment;
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
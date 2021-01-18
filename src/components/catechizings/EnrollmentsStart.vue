<template>
  <div id="EnrollmentsList">
    <div
      class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow"
    >
      <div class="mr-auto p-2">
        <h6 class="mb-0 text-white lh-100">Matrículas</h6>
        <small>Matrículas dos Catequizandos</small>
      </div>
    </div>
    <div class="my-3 p-3 bg-white rounded box-shadow">

      <button 
        v-for="level in levelsList" :key="level.id"

        class="btn btn-primary p-2"
        id="show-modal"
        @click="setShowModal()"
      >
        {{level.name}}
      </button>
      
      <small class="d-block text-right mt-3">
        <a href="#"></a>
      </small>
    </div>
  </div>
</template>

<script>
import { levels } from "../../db";

export default {
  name: "EnrollmentsList",
  components: {
  },
  data() {
    return {
      levelsList: [],
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
    
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
</style>
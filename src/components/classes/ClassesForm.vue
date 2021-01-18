<template>
  <transition id="ClassesForm" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form>
            <div class="modal-header">
              <slot name="header"> Cadastro de Turmas </slot>
            </div>

            <div class="modal-body">

              <div class="form-group">
                <label for="name">Comunidade</label>
                <select class="form-control" v-model="classe.location">
                  <option
                    v-for="location in locationsList"
                    :key="location.id"
                    v-bind:value="location"
                  >
                    {{ location.name }}
                  </option>
                </select>
                <small id="emailHelp" class="form-text text-muted"
                  >Comunidade!</small
                >
              </div>

              <div class="form-group">
                <label for="name">Nível</label>
                <select class="form-control" v-model="classe.level">
                  <option
                    v-for="level in levelsList"
                    :key="level.id"
                    v-bind:value="level"
                  >
                    {{ level.name }}
                  </option>
                </select>
                <small id="emailHelp" class="form-text text-muted"
                  >Comunidade!</small
                >
              </div>

              <div class="form-group">
                <label for="name">Sala</label>
                <select class="form-control" v-model="classe.room">
                  <option
                    v-for="room in roomsList"
                    :key="room.id"
                    v-bind:value="room"
                  >
                    {{ room.name }} - {{ room.location }}
                  </option>
                </select>
                <small id="emailHelp" class="form-text text-muted"
                  >Sala para a turma!</small
                >
              </div>


              <div class="form-group">
                <label for="name">Dia da Semana e Horário</label>
                <select class="form-control" v-model="classe.day">
                  <option
                    v-for="day in daysList"
                    :key="day.id"
                    v-bind:value="day"
                  >
                    {{ day.day_week }} - {{ day.schedule }}
                  </option>
                </select>
                <small id="emailHelp" class="form-text text-muted"
                  >Dia da Semana e Horário para o Encontro!</small
                >
              </div>
              <div class="alert alert-warning" role="alert" v-if="msg">
                Campos não preenchidos!
              </div>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="add(classe)"
                >
                  Salvar Informações
                </button>
                <button class="btn btn-danger" @click.prevent="$emit('close')">
                  Cancelar
                </button>
              </slot>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { classes, locations, rooms, days, levels } from "../../db";
import firebase from "firebase/app";
require("firebase/auth");

export default {
  name: "ClassesForm",
  props: ["classe"],
  data() {
    return {
      msg: "",
      last_room: "",
      levelsList: [],
      locationsList: [],
      roomsList: [],
      daysList: [],
    };
  },
  created() {
    this.formsCreate();
    this.last_room = this.classe.romm;
  },
  methods: {
    formsCreate() {
      levels.onSnapshot((snapshotChange) => {
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

      rooms.where("available", "==", true).onSnapshot((snapshotChange) => {
        this.roomsList = [];
        snapshotChange.forEach((doc) => {
          this.roomsList.push({
            id: doc.id,
            name: doc.data().name,
            location: doc.data().location.name,
          });
          console.log(doc.id, " => ", doc.data());
        });
      });

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
    close() {
      this.$emit("close");
    },
    add() {
      this.msg = false;
      if (
        this.classe.level == "" || this.classe.location == "" ||
        this.classe.room == "" || this.classe.day == ""
      ) {
        this.msg = true;
        return;
      }
      if (this.classe.id) {
        classes
          .doc(this.classe.id)
          .update({
            level: this.classe.level,
            location: this.classe.location,
            room: this.classe.room,
            day: this.classe.day,
            updated_by: firebase.auth().currentUser.displayName,
            updated_at: firebase.firestore.Timestamp.fromDate(new Date()),
          })
          .then(function () {
            alert("Dados enviados com sucesso!");
            console.error("Document written with ID: ", this.classe.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      } else {
        classes
          .add({
            level: this.classe.level,
            location: this.classe.location,
            room: this.classe.room,
            day: this.classe.day,
            created_by: firebase.auth().currentUser.displayName,
            created_at: firebase.firestore.Timestamp.fromDate(new Date()),
          })
          .then(function (docRef) {
            alert("Dados enviados com sucesso!");
            console.error("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            // eslint-disable-next-lin
            console.error("Error adding document: ", error);
          });
      }
      this.close();
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
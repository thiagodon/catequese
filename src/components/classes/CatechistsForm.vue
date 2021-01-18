<template>
  <transition id="ClassesForm" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form>
            <div class="modal-header">
              <slot name="header">
                Escolha os catequistas para o nível: {{ classe.level.name }}
              </slot>
            </div>
            <div class="modal-body">
              <div class="text-uppercase text-bold">
                <ul class="list-group">
                  <li
                    v-for="catechist in catechistsSelected"
                    :key="catechist.id"
                    class="list-group-item"
                  >
                    {{ catechist.name }}
                  </li>
                </ul>
              </div>
              <table class="table table-striped table-hover fixed_header">
                <thead>
                  <tr>
                    <th></th>
                    <th style="width: 100%">Nome</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style="width: 100%"
                    v-for="catechist in catechistsList"
                    :key="catechist.id"
                  >
                    <td>
                      <label class="form-checkbox">
                        <input
                          type="checkbox"
                          :value="catechist"
                          v-model="catechistsSelected"
                        />
                        <i class="form-icon"></i>
                      </label>
                    </td>
                    <td style="width: 100%">{{ catechist.name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="add()"
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
import { catechists, classes } from "../../db";
import firebase from "firebase/app";
require("firebase/auth");

export default {
  name: "ClassesForm",
  props: ["classe"],
  data() {
    return {
      msg: "",
      catechistsSelected: [],
      catechistsList: [],
    };
  },
  created() {
    this.formsCreate();
  },
  methods: {
    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.items) {
          this.selected.push(this.items[i].id);
        }
      }
    },
    formsCreate() {
      catechists.where("selected", "==", false).orderBy("name", "asc").onSnapshot((snapshotChange) => {
        this.catechistsList = [];
        snapshotChange.forEach((doc) => {
          this.catechistsList.push({
            id: doc.id,
            name: doc.data().name,
          });
          console.log(doc.id, " => ", doc.data());
        });
      });
    },
    close() {
      this.$emit("close");
    },
    add() {
      if (this.catechistsSelected.lenght <= 0) {
        this.msg = true;
        return;
      }
      let catechistsSelected =  this.catechistsSelected;
      let classe =  this.classe;
      classes
        .doc(this.classe.id)
        .update({
          catechists: this.catechistsSelected,
          updated_by: firebase.auth().currentUser.displayName,
          updated_at: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(function () {
          catechistsSelected.forEach((element) => {
              catechists.doc(element.id).update({
                selected: true,
                classe: {
                  id: classe.id,
                  level: classe.level.name,
                  location: classe.location.name,
                  day: classe.day.day_week+" - "+classe.day.schedule,
                }
              }).then(function () {});
          });
          alert("Dados enviados com sucesso!");
        });
      this.close();

    },
    //   this.msg = false;
    //   if (
    //     this.classe.level == "" || this.classe.location == "" ||
    //     this.classe.room == "" || this.classe.day == ""
    //   ) {
    //     this.msg = true;
    //     return;
    //   }
    //   if (this.classe.id) {
    //     classes
    //       .doc(this.classe.id)
    //       .update({
    //         level: this.classe.level,
    //         location: this.classe.location,
    //         room: this.classe.room,
    //         day: this.classe.day,
    //         updated_by: firebase.auth().currentUser.displayName,
    //         updated_at: firebase.firestore.Timestamp.fromDate(new Date()),
    //       })
    //       .then(function () {
    //         alert("Dados enviados com sucesso!");
    //         console.error("Document written with ID: ", this.classe.id);
    //       })
    //       .catch(function (error) {
    //         console.error("Error adding document: ", error);
    //       });
    //   } else {
    //     classes
    //       .add({
    //         level: this.classe.level,
    //         location: this.classe.location,
    //         room: this.classe.room,
    //         day: this.classe.day,
    //         created_by: firebase.auth().currentUser.displayName,
    //         created_at: firebase.firestore.Timestamp.fromDate(new Date()),
    //       })
    //       .then(function (docRef) {
    //         alert("Dados enviados com sucesso!");
    //         console.error("Document written with ID: ", docRef.id);
    //       })
    //       .catch(function (error) {
    //         // eslint-disable-next-lin
    //         console.error("Error adding document: ", error);
    //       });
    //   }
    //   this.close();
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
.fixed_header tbody {
  display: block;
  overflow: auto;
  height: 15rem;
  width: 100%;
}
.fixed_header thead tr {
  display: block;
}
</style>
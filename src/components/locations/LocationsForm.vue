<template>
  <transition id="LocationsForm" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form>
            <div class="modal-header">
              <slot name="header"> Cadastro de Locais </slot>
            </div>

            <div class="modal-body">
              <div class="form-group">
                <label for="name">Nome</label>
                <input
                  type="text"
                  v-model="location.name"
                  class="form-control"
                  id="name"
                  aria-describedby="nome"
                  placeholder="Nome do Local"
                  required
                />
                <small id="emailHelp" class="form-text text-muted"
                  >Nome do Local!</small
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
                  @click.prevent="add(location)"
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
import { locations } from "../../db";
import firebase from "firebase/app";
require("firebase/auth");

export default {
  name: "LocationsForm",
  props: ["location"],
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    add() {
      this.msg = false;
      if (this.location.name == "") {
        this.msg = true;
        return;
      }
      if (this.location.id) {
        locations
          .doc(this.location.id)
          .update({
            name: this.location.name,
            updated_by: firebase.auth().currentUser.displayName,
            updated_at: firebase.firestore.Timestamp.fromDate(new Date()),
          })
          .then(function () {
            alert("Dados enviados com sucesso!");
            // eslint-disable-next-lin
            console.error("Document written with ID: ", this.location.id);
          })
          .catch(function (error) {
            // eslint-disable-next-lin
            console.error("Error adding document: ", error);
          });
      } else {
        locations
          .add({
            name: this.location.name,
            created_by: firebase.auth().currentUser.displayName,
            created_at: firebase.firestore.Timestamp.fromDate(new Date()),
          })
          .then(function (docRef) {
            alert("Dados enviados com sucesso!");
            // eslint-disable-next-lin
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
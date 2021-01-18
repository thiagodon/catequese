<template>
  <transition id="CatechizingForm" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form>
            <div class="modal-header">
              <slot name="header"> Cadastro de Catequizandos </slot>
            </div>

            <div class="modal-body">
        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" v-model="catechizing.name"  class="form-control" id="name" aria-describedby="name" placeholder="Seu name" required>
          <small id="emailHelp" class="form-text text-muted">Seu name completo!</small>
        </div>
        <div class="form-group">
          <label for="birth_date">Data de Nascimento</label>
          <input type="date" v-model="catechizing.birth_date" class="form-control" id="birth_date" placeholder="Data de Nascimento" required>
        </div>
        <div class="form-group">
          <label for="phone">Telefone</label>
          <input type="text" v-model="catechizing.phone"  class="form-control" id="phone" aria-describedby="phoneHelp" placeholder="Seu phone" required>
          <small id="phoneHelp" class="form-text text-muted">Insira quantos necessário!</small>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" v-model="catechizing.email"  class="form-control" id="email" aria-describedby="emailHelp" placeholder="Seu email" required>
          <small id="emailHelp" class="form-text text-muted">Seu email!</small>
        </div>
        <div class="form-group">
          <label for="community">Comunidade que você participa</label>
          <select v-model="catechizing.community" class="form-control form-control-sm" required>
            <option value=''></option>
            <option :selected="catechizing.community == 'Matriz'" value="Matriz">Matriz</option>
            <option :selected="catechizing.community == 'Guadalupe'" value="Guadalupe">Guadalupe</option>
            <option :selected="catechizing.community == 'São Miguel'" value="São Miguel">São Miguel</option>
            <option :selected="catechizing.community == 'São Pedro'" value="São Pedro">São Pedro</option>
            <option :selected="catechizing.community == 'Bpm Jesus'" value="Bom Jesus">Bom Jesus</option>
            <option :selected="catechizing.community == 'São Francisco'" value="São Francisco">São Francisco</option>
          </select>
        </div>
        <div class="form-group">
          <label for="obs">Campo livre para observações</label>
          <small id="obsHelp" class="form-text text-muted">Descreva quem você é, quanto tempo de caminhada, grau de escolaridade, grau de catequese, estado civil, etc!</small>
          <textarea type="text" v-model="catechizing.obs"  class="form-control" id="obs" aria-describedby="obsHelp" placeholder="Obs">
          </textarea>
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
                  @click.prevent="add(catechizing)"
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
import { catechizings } from "../../db";
import firebase from "firebase/app";
require("firebase/auth");

export default {
  name: "CatechizingForm",
  props: ["catechizing", "level"],
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
      if (this.catechizing.id){
        this.msg = false;
        if (this.catechizing.name == '' || this.catechizing.birth_date  == '' || this.catechizing.phone == '' ||
            this.catechizing.community == '' || this.catechizing.obs == '' )
        {
          this.msg = true;
          return;
        }
        catechizings.doc(this.catechizing.id).update({
          name: this.catechizing.name,
          birth_date: this.catechizing.birth_date,
          phone: this.catechizing.phone,
          email: this.catechizing.email, 
          community: this.catechizing.community,
          obs: this.catechizing.obs,
          updated_by: firebase.auth().currentUser.displayName,
          updated_at: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(function(docRef) {
          alert('Dados enviados com sucesso!')
          // eslint-disable-next-lin
          console.error("Document written with ID: ", docRef.id);
        });
      }else{
        this.msg = false;
        if (this.catechizing.name == '' || this.catechizing.birth_date  == '' || this.catechizing.phone == '' || 
            this.catechizing.community == '' || this.catechizing.obs == '' )
        {
          this.msg = true;
          return;
        }
        catechizings.add({
          name: this.catechizing.name,
          birth_date: this.catechizing.birth_date,
          phone: this.catechizing.phone,
          email: this.catechizing.email, 
          community: this.catechizing.community,
          obs: this.catechizing.obs,
          created_by: firebase.auth().currentUser.displayName,
          created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(function(docRef) {
          alert('Dados enviados com sucesso!')
          // eslint-disable-next-lin
          console.error("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
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
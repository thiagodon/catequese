<template>
  <transition id="CatechistsForm" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form>
            <div class="modal-header">
              <slot name="header"> Cadastro de Catequistas </slot>
            </div>

            <div class="modal-body">
        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" v-model="catechist.name"  class="form-control" id="name" aria-describedby="name" placeholder="Seu name" required>
          <small id="emailHelp" class="form-text text-muted">Seu name completo!</small>
        </div>
        <div class="form-group">
          <label for="birth_date">Data de Nascimento</label>
          <input type="date" v-model="catechist.birth_date" class="form-control" id="birth_date" placeholder="Data de Nascimento" required>
        </div>
        <div class="form-group">
          <label for="phone">Telefone</label>
          <input type="text" v-model="catechist.phone"  class="form-control" id="phone" aria-describedby="phoneHelp" placeholder="Seu phone" required>
          <small id="phoneHelp" class="form-text text-muted">Insira quantos necessário!</small>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" v-model="catechist.email"  class="form-control" id="email" aria-describedby="emailHelp" placeholder="Seu email" required>
          <small id="emailHelp" class="form-text text-muted">Seu email!</small>
        </div>
        <div class="form-group">
          <label for="availability">Disponibilidade</label>
          <select v-model="catechist.availability" class="form-control form-control-sm" required>
            <option value=''></option>
            <option :selected="catechist.availability == 'Sábado 15 horas'" value="Sábado 15 horas">Sábado 15 horas</option>
            <option :selected="catechist.availability == 'Sábado 16 horas'" value="Sábado 16 horas">Sábado 16 horas</option>
            <option :selected="catechist.availability == 'Sábado 17 horas'" value="Sábado 17 horas">Sábado 17 horas</option>
            <option :selected="catechist.availability == 'Domingo'" value="Domingo">Domingo</option>
          </select>
        </div>
        <div class="form-group">
          <label for="community">Comunidade que você participa</label>
          <select v-model="catechist.community" class="form-control form-control-sm" required>
            <option value=''></option>
            <option :selected="catechist.community == 'Matriz'" value="Matriz">Matriz</option>
            <option :selected="catechist.community == 'Guadalupe'" value="Guadalupe">Guadalupe</option>
            <option :selected="catechist.community == 'São Miguel'" value="São Miguel">São Miguel</option>
            <option :selected="catechist.community == 'São Pedro'" value="São Pedro">São Pedro</option>
            <option :selected="catechist.community == 'Bpm Jesus'" value="Bom Jesus">Bom Jesus</option>
            <option :selected="catechist.community == 'São Francisco'" value="São Francisco">São Francisco</option>
          </select>
        </div>
        <div class="form-group">
          <label for="obs">Campo livre para observações</label>
          <small id="obsHelp" class="form-text text-muted">Descreva quem você é, quanto tempo de caminhada, grau de escolaridade, grau de catequese, estado civil, etc!</small>
          <textarea type="text" v-model="catechist.obs"  class="form-control" id="obs" aria-describedby="obsHelp" placeholder="Obs">
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
                  @click.prevent="add(catechist)"
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
import { catechists } from "../../db";
import firebase from "firebase/app";
require("firebase/auth");

export default {
  name: "CatechistsForm",
  props: ["catechist"],
  data() {
    return {
      msg: "",
    };
  },
  created(){
    // let start = 0;
    // let end = 30
    // for (let i = start; i <= end; i++) {

    //     catechists.add({
    //       name: "Catequista"+" "+i,
    //       birth_date: i+"/05/1990",
    //       phone: 98672681+i,
    //       email: "email"+1+'@email.com', 
    //       created_by: firebase.auth().currentUser.displayName,
    //       created_at: firebase.firestore.Timestamp.fromDate(new Date()),
    //       selected: false
    //     })
    //     .then(function(docRef) {
    //       alert('Dados enviados com sucesso!')
    //       // eslint-disable-next-lin
    //       console.error("Document written with ID: ", docRef.id);
    //     })
    //     .catch(function(error) {
    //       // eslint-disable-next-lin
    //       console.error("Error adding document: ", error);
    //     });
    // }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    add() {
      if (this.catechist.id){
        this.msg = false;
        if (this.catechist.name == '' || this.catechist.birth_date  == '' || this.catechist.phone == '' || 
            this.catechist.email == '' || this.catechist.availability == '' ||
            this.catechist.community == '' || this.catechist.obs == '' )
        {
          this.msg = true;
          return;
        }
        catechists.doc(this.catechist.id).update({
          name: this.catechist.name,
          birth_date: this.catechist.birth_date,
          phone: this.catechist.phone,
          email: this.catechist.email, 
          availability: this.catechist.availability,
          community: this.catechist.community,
          obs: this.catechist.obs,
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
        if (this.catechist.name == '' || this.catechist.birth_date  == '' || this.catechist.phone == '' || 
            this.catechist.email == '' || this.catechist.availability == '' ||
            this.catechist.community == '' || this.catechist.obs == '' )
        {
          this.msg = true;
          return;
        }
        catechists.add({
          name: this.catechist.name,
          birth_date: this.catechist.birth_date,
          phone: this.catechist.phone,
          email: this.catechist.email, 
          availability: this.catechist.availability,
          community: this.catechist.community,
          obs: this.catechist.obs,
          created_by: firebase.auth().currentUser.displayName,
          created_at: firebase.firestore.Timestamp.fromDate(new Date()),
          selected: false,
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
<template>
    <div class="container">
        <form @submit.prevent="userRegistration">
            <h3>Cadastrar</h3>

            <div class="form-group">
                <label>Nome</label>
                <input type="text" class="form-control form-control-lg" v-model="user.name" />
            </div>

            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>

            <div class="form-group">
                <label>Senha</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">
               Cadastrar
            </button>

            <p class="forgot-password text-right">
                Já Existe 
                <router-link :to="{name: 'login'}">Entrar?</router-link>
            </p>
        </form>
    </div>
</template>


<script>
import firebase from "firebase/app";
require('firebase/auth');

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userRegistration() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.user.name
          })
          .then(() => {
            this.$router.push({ path: 'login'})
          });
      })
      .catch((error) => {
         alert(error.message);
      });
    }
  }
};
</script>
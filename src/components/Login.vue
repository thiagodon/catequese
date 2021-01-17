<template>
    <div class="container">
        <form @submit.prevent="userLogin">
            <h3>Acesso Coordenação</h3>

            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>

            <div class="form-group">
                <label>Senha</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Entrar</button>

            <!-- <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Esqueceu a senha ?</router-link>
            </p> -->
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
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userLogin() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
            this.$router.push('/home')
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
};
</script>
<template>
  <div id="app">
    <nav class="navbar navbar-expand-md fixed-top navbar-dark">
      <a class="navbar-brand" href="/"><img class="logo" src="./assets/logob.png" alt="Catequese Cristo Salvador"></a>
      <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Acesso Coordenação</router-link>
          </li>
          <li class="nav-item mr-3">
            <router-link class="nav-link" to="/">Recadastramento</router-link>
          </li>    
        </ul>
        <div class="my-2 my-lg-0">
          <div>
            <b-dropdown id="dropdown-1" :text=user.email class="m-md-2">
              <b-dropdown-item></b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item><a @click="logOut()" class="nav-link" v-if="user">Sair</a></b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </nav>

    <div class="nav-scroller bg-white box-shadow">
      <nav class="nav nav-underline">
        <router-link class="nav-link" to="/locais">Locais</router-link>
        <router-link class="nav-link" to="/niveis-maiores">Niveis Mariores</router-link>
        <router-link class="nav-link" to="/niveis">Niveis</router-link>
        <router-link class="nav-link" to="/dias">Dias e Horários</router-link>
        <router-link class="nav-link" to="/catequistas">Catequistas</router-link>
        <router-link class="nav-link" to="/catequizandos">Catequizandos</router-link>
        <router-link class="nav-link" to="/salas">Salas</router-link>
        <router-link class="nav-link" to="/turmas">Turmas</router-link>
        <router-link class="nav-link" to="/matriculas">Matrículas</router-link>
      </nav>
    </div>

    <main role="main" class="container">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import firebase from "firebase/app";
require('firebase/auth');
import $ from 'jquery'

export default {
  name: 'app',
  components: {
  },
  mounted: function() {
    $(function () {
      'use strict'

      $('[data-toggle="offcanvas"]').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
      })
    });
  }, 
  data() {
    return {
      user: null
    };
  },
  created(){
    this.user = firebase.auth().currentUser;
  },
  methods: {
    updateUser() {
      this.user = firebase.auth().currentUser;
    },
    logOut() {
      firebase.auth().signOut().then(() => {
        this.user = null;
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/login')
        })
      })
    }
  }
}

</script>

<style>
html,
body {
  overflow-x: hidden; /* Prevent scroll on narrow devices */
}

body {
  padding-top: 7rem;
}

@media (max-width: 767.98px) {
  .offcanvas-collapse {
    position: fixed;
    top: 56px; /* Height of navbar */
    bottom: 0;
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow-y: auto;
    background-color: var(--gray-dark);
    transition: -webkit-transform .3s ease-in-out;
    transition: transform .3s ease-in-out;
    transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  .offcanvas-collapse.open {
    -webkit-transform: translateX(-1rem);
    transform: translateX(-1rem); /* Account for horizontal padding on navbar */
  }
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  color: rgba(255, 255, 255, .75);
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.nav-underline .nav-link {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: .875rem;
  color: var(--secondary);
}

.nav-underline .nav-link:hover {
  color: var(--blue);
}

.nav-underline .active {
  font-weight: 500;
  color: var(--gray-dark);
}

.text-white-50 { color: rgba(255, 255, 255, .5); }

.bg-purple { background-color: var(--purple); }

.border-bottom { border-bottom: 1px solid #e5e5e5; }

.box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }

.lh-100 { line-height: 1; }
.lh-125 { line-height: 1.25; }
.lh-150 { line-height: 1.5; }
  .logo{
    height: 5rem;
  }
  .navbar{
    background-color: #0B173B !important;
    color: white;
  }
</style>

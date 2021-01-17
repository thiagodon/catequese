<template>
  <div id="HelloWorld">
      <h3>Recadastramento para Catequistas 2021</h3>
      <small id="telefoneHelp" class="form-text text-muted">Por favor, preencha todos os dados. Nos ajude a conhecê-lo através do Campo livre para observações!!!</small>
      <form>
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" v-model="catequista.nome"  class="form-control" id="nome" aria-describedby="nome" placeholder="Seu nome" required>
          <small id="emailHelp" class="form-text text-muted">Seu nome completo!</small>
        </div>
        <div class="form-group">
          <label for="data_nasc">Data de Nascimento</label>
          <input type="date" v-model="catequista.data_nasc" class="form-control" id="data_nasc" placeholder="Data de Nascimento" required>
        </div>
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input type="text" v-model="catequista.telefone"  class="form-control" id="telefone" aria-describedby="telefoneHelp" placeholder="Seu telefone" required>
          <small id="telefoneHelp" class="form-text text-muted">Insira quantos necessário!</small>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" v-model="catequista.email"  class="form-control" id="email" aria-describedby="emailHelp" placeholder="Seu email" required>
          <small id="emailHelp" class="form-text text-muted">Seu email!</small>
        </div>
        <div class="form-group">
          <label for="disponibilidade">Disponibilidade</label>
          <select v-model="catequista.disponibilidade" class="form-control form-control-sm" required>
            <option value=''></option>
            <option value=1>Sábado 15 horas</option>
            <option value=2>Sábado 16 horas</option>
            <option value=3>Sábado 17 horas</option>
            <option value=4>Domingo</option>
          </select>
        </div>
        <div class="form-group">
          <label for="comunidade">Comunidade que você participa</label>
          <select v-model="catequista.comunidade" class="form-control form-control-sm" required>
            <option value=''></option>
            <option value=1>Matriz</option>
            <option value=2>Guadalupe</option>
            <option value=3>São Miguel</option>
            <option value=4>São Pedro</option>
            <option value=5>Bom Jesus</option>
            <option value=6>São Francisco</option>
          </select>
        </div>
        <div class="form-group">
          <label for="obs">Campo livre para observações</label>
          <small id="obsHelp" class="form-text text-muted">Descreva quem você é, quanto tempo de caminhada, grau de escolaridade, grau de catequese, estado civil, etc!</small>
          <textarea type="text" v-model="catequista.obs"  class="form-control" id="obs" aria-describedby="obsHelp" placeholder="Obs">
          </textarea>
        </div>
        <div class="alert alert-warning" role="alert" v-if="msg">
          Campos não preenchidos!
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="add(catequista)">Enviar Informações</button>
      </form>
    </div>
</template>

<script>
import { catechists } from '../db';
export default {
  name: 'HelloWorld',
  data () {
    return {
      catequista: {
        nome: '',
        data_nasc: '',
        telefone: '',
        email: '', 
        disponibilidade: '',
        comunidade: '',
        obs: '',
      },
      msg: '',
    }
  },
  methods: {
    add() {
      this.msg = false;
      if (this.catequista.nome == '' || this.catequista.data_nasc  == '' || this.catequista.telefone == '' || 
          this.catequista.email == '' || this.catequista.disponibilidade == '' ||
          this.catequista.comunidade == '' || this.catequista.obs == '' )
      {
        this.msg = true;
        return;
      }
      catechists.add({
        nome: this.catequista.nome,
        data_nasc: this.catequista.data_nasc,
        telefone: this.catequista.telefone,
        email: this.catequista.email, 
        disponibilidade: this.catequista.disponibilidade,
        comunidade: this.catequista.comunidade,
        obs: this.catequista.obs,
        ano: 2021
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
      this.catechists = {
        nome: '',
        data_nasc: '',
        telefone: '',
        email: '', 
        disponibilidade: '',
        comunidade: '',
        obs: '',
      }
    }
  }
}
</script>

<style>
  /* .container{
    margin-left: 5%;
  }
  .navbar {
    width: 100%;
    display: inline-block;
    float: none !important;
    background-color: #0B173B !important;
    color: white;
    margin-bottom: 10px;
  }

  .navbar-itens {
    text-align: center;
    background-color: #0B173B !important;
    color: white;
    margin-bottom: 10px;
    padding: 10px;

  }
  .logo { 
    width: 300px;
  }
  form {
    margin-bottom: 3%;
  } */
</style>
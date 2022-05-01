<template>
  <div id="mainDiv">
    <div class="content">
      <div class="row">
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Adres email</label>
            <input type="email" class="form-control" id="txtEmail" aria-describedby="emailHelp" placeholder="Podaj email" v-model="email">
          </div>
        </div>

        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label for="exampleInputPassword1" minlength="8" required>Hasło</label>
              <input type="password" class="form-control" id="txtPassword" placeholder="Podaj hasło" v-model="passVal1">
          </div>
        </div>

        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <button type="submit" class="btn btn-success" id="btnLogIn" @click="login">Zaloguj się</button>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style>
</style>
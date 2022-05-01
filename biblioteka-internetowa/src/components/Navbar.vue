<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Readbook</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">

        <li class="nav-item">
          <router-link class="nav-link" to="/news">Aktualności <span class="sr-only">(current)</span></router-link>
        </li>
        
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Zarejestruj się</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/login">Zaloguj się</router-link>
        </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/search">Przeszukaj katalog</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/profile">Profil</router-link>
        </li>

      </ul>
    </div>
  </nav>

</template>

<script>

</script>
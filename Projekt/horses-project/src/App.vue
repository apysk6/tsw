<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Pokaz</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <template v-if="loggedIn">
            <li class="nav-item active">
              <router-link :to="{ name: 'classes', params: {isManaging: true } }">
                <a class="nav-link">Klasy</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/judges">
                <a class="nav-link">Sędziowie</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/horses">
                <a class="nav-link">Konie</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/import">
                <a class="nav-link">Zarządzaj pokazem</a>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logout()">Wyloguj</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/login">
                <a class="nav-link">Logowanie</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'classes', params: {isManaging: false } }">
                <a class="nav-link">Panel Kibica</a>
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <router-view id="views"/>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
      this.$router.go(0);
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .nav-bars {
    background: cornflowerblue;
    position: fixed;
    width: 100%;
    padding: 10px;
    color: white;

    a {
      color: white;
      text-decoration: none;
    }
  }

  #header-nav {
    top: 0;
    left: 0;
  }
}

#views {
  margin-top: 5%;
}
</style>

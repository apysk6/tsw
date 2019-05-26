<template>
  <div id="app">
    <div id="header-nav" class="nav-bars">
      <router-link to="/judges">Sędziowie</router-link>|
      <router-link to="/horses">Konie</router-link>|
      <router-link to="/classes">Klasy</router-link>
    </div>
    <router-view id="views"/>
  </div>
</template>

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

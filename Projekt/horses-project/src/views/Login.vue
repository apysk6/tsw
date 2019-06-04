<template>
  <div class="login-form" v-if="notLogged">
    <ActionMessage/>
    <div class="property">
      <label>Login</label>
      <input
        type="text"
        v-model="user.login"
        class="form-control"
        placeholder="Wprowadź login użytkownika."
      >
    </div>
    <div class="property">
      <label>Hasło</label>
      <input
        type="text"
        v-model="user.password"
        class="form-control"
        placeholder="Wprowadź hasło użytkownika."
      >
    </div>
    <div v-if="validationMessages.length">
      <b-badge
        variant="danger"
        :key="message"
        v-for="message in validationMessages"
        class="error-badge"
      >{{ message }}</b-badge>
    </div>
    <div class="buttonsPanel">
      <button type="button" class="btn loginButton" variant="success" @click="login()">Zaloguj</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import ActionMessage from "@/components/ActionMessage.vue";

export default {
  name: "Login",
  data() {
    return {
      user: {
        login: "",
        password: ""
      },
      validationMessages: [],
      notLogged: null
    };
  },
  components: { ActionMessage },
  mounted() {
      this.notLogged = !store.getters.getLoggedIn();
  },
  methods: {
    login: function() {
      this.validationMessages = [];
      if (this.user.login && this.user.password) {
        this.$store.dispatch("login", this.user);
        setTimeout(() => {
          if (store.getters.getLoggedIn()) {
            this.$router.go(0);
          }
        }, 100);
      } else {
        if (!this.user.login) {
          this.validationMessages.push("Login użytkownika jest wymagany!");
        }

        if (!this.user.password) {
          this.validationMessages.push("Hasło użytkownika jest wymagane!");
        }
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 20%;
  margin: auto;
  border: 1px solid #b1b2b5;
  border-radius: 5px;
  padding: 10px;
}

.property {
  margin-bottom: 10px;
}

.loginButton {
  margin-top: 10px;
  background-color: #2f3a4c;
  color: #e6e9ef;
}
</style>
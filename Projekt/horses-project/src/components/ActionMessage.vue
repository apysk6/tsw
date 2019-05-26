<template>
  <div class="alerts">
    <b-alert v-if="message" show>{{ message }}</b-alert>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";

export default {
  name: "ActionMessage",
  computed: {
    message() {
      return this.$store.state.actionMessage;
    }
  }
};
</script>

<style>
    .alerts {
        margin-top: 10px;
    }
</style>
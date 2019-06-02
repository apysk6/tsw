<template>
  <div>
    <HorsesIndex/>
    <router-link :to="{ name: 'addHorse'}">
      <button type="button" id="addButton" class="btn btn-success" variant="success">Dodaj</button>
    </router-link>
  </div>
</template>

<script>
import HorsesIndex from "@/components/HorsesIndex.vue";
export default {
  name: "horses",
  components: {
    HorsesIndex
  }
};
</script>

<style scoped>
#addButton {
  margin-left: 37%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
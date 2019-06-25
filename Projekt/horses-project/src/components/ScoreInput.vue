<template>
  <input
    @change="resultChanged"
    type="number"
    v-model="inputVal"
    oninput="validity.valid||(value='0');"
    :tabindex="index"
    step="0.5"
  >
</template>

<script>
export default {
  name: "ScoreInput",
  props: ["value", "index", "horse"],
  data() {
    return { inputVal: this.value };
  },
  methods: {
    resultChanged: function() {
      delete this.horse.wynik.rozjemca;
      this.horse.isDraw = false;
    }
  },
  watch: {
    inputVal(val) {
      if (val < 0) val = 0;
      else if (val > 20) val = 20;
      this.inputVal = val;
      this.$emit("input", val);
    }
  }
};
</script>

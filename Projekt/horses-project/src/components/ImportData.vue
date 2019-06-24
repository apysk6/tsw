<template>
  <div class="container">
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>Importuj dane</h1>
      <div class="dropbox">
        <input
          type="file"
          multiple
          :disabled="isSaving"
          @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          class="input-file"
        >
        <p v-if="isInitial">
          Przeciągnij plik .JSON zawierający dane o pokazie
          <br>lub kliknij, aby wybrać plik ręcznie.
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: "app",
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      finished: false
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    }
  },
  methods: {
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(file) {
      this.currentStatus = STATUS_SAVING;
      this.$store.dispatch("importData", file);
      this.$router.go(-1);
    },
    filesChange(fieldName, fileList) {
      return new Promise((resolve, reject) => {
        let file = fileList[0];
        let text = "";
        var reader = new FileReader();

        reader.onload = function() {
          text = reader.result;
          resolve(text);
        };

        reader.readAsText(file);
      }).then(file => {
        this.save(JSON.parse(file));
      });
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: rgb(184, 207, 214);
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>

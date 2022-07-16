<template>
  <div class="my-4">
    <img alt="Pinterest logo" src="../assets/images/pinterest.png" width="200" height="200">

    <h1 class="my-2 font-weight-bold" style="color: #CB2027">Pinterest Downloader</h1>

    <div class="wrapper">
      <form @submit.prevent="generateDownloadLink" class="py-2">
        <div class="form-group">
          <label for="url" class="d-block w-full text-left font-weight-bold">Video URL:</label>
          <input
              id="url"
              v-model="url"
              type="text"
              class="form-control p-3"
              :class="[hasError ? 'border-danger' : '']"
              placeholder="Please enter valid video URL i.e: https://pin.it/5sfd2T64"
          >
          <small v-if="hasError" class="form-text text-danger text-left">{{ errors[0] }}</small>
        </div>

        <div class="d-flex flex-row justify-content-start">
          <button class="btn btn-danger mr-2" type="button" @click="resetForm">Reset</button>
          <button class="btn btn-primary" type="submit" :disabled="loading">
            <span v-if="loading" class="spinner-border text-light spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </span>
            Generate
          </button>
        </div>
      </form>

      <div v-if="thumbnail" class="d-flex flex-row mt-5">
        <div class="mr-4">
          <img :src="thumbnail" class="img-thumbnail" width="200" height="200" alt="thumbnails"/>
        </div>

        <div class="border" style="width: 100%">
          <p class="form-text font-weight-bold text-left mt-2 mx-2">Video: {{ filename }}</p>

          <div class="d-flex justify-content-between p-2" >

            <p>Format: <b>720.mp4</b> (Size: <b>2.8MB</b>)</p>
            <button type="button" class="btn btn-sm btn-info" @click="download">Download Now</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { DownloadService } from "@/services/download-service";
// import { saveAs } from 'file-saver';
export default {
  name: "PinterestDownloader",
  data() {
    return {
      download_service: new DownloadService(),
      loading: false,
      hasError: false,
      errors: [],

      url: '',
      // should be coming from response we can make and object too here
      file_url: '',
      filename: '',
      thumbnail: '',
    }
  },
  components: {},
  methods: {
    resetForm() {
      this.url = '';
      this.filename = '';
      this.thumbnail = '';
      this.file_url = '';
      this.hasError = false;
      this.errors = [];
    },
    async generateDownloadLink() {
      this.hasError = false;
      this.errors = [];

      if (!this.url) {
        this.hasError = true;
        this.errors.push('Video URL is required!')
        return;
      }

      this.loading = true;

      setTimeout(() => {
        this.filename = 'FL-127a6e661381617b321f3b64f9e96b08.mp4';
        this.thumbnail = 'https://i.pinimg.com/videos/thumbnails/originals/9b/82/da/9b82daa0b3b7f9e740aa8b9fa74528ef.0000000.jpg';

        this.loading = false;
      }, 1000);

      // try {
      //   await this.download_service.create(this.url);
      // } catch (e) {
      //   console.log(e, 'Something went wrong!')
      // }

    },

    async download() {
      let FileSaver = require('file-saver');
      console.log(FileSaver)
      await FileSaver.saveAs(this.url, this.filename);
      this.resetForm();
    }
  }
}
</script>

<style scoped>

</style>
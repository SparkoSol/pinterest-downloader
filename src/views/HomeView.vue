<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">

    <div class="wrapper mb-5">
      <h1 class="title">Pinterest Downloader</h1>

      <form @submit.prevent="submitForm" class="py-2">
        <div class="form-group">
          <label for="url" class="d-block w-full text-left font-weight-bold">Video URL:</label>
          <input v-model="url" type="text" class="form-control p-3" id="url" placeholder="Enter URL">
          <small v-if="error" class="form-text text-danger">{{ error }}</small>
        </div>

        <div>
          <button class="btn btn-primary" type="submit">Download</button>
        </div>
      </form>

      <div class="d-flex flex-row">
        <div class="mr-4">
          <img src="../assets/images/market.jpg" alt="thumbnails" width="200" height="200"/>
          <p class="form-text font-weight-bold">XYZ File</p>
        </div>

        <div class="border" style="width: 100%">
          <div class="d-flex justify-content-between p-2" style="width: 100%" v-for="i in 5" :key="i">
            <p>Format: <b>720.mp4</b> (Size: <b>2.8MB</b>)</p>
            <button type="button" class="btn btn-sm btn-info">Download Now</button>
          </div>
        </div>


      </div>
    </div>

    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
import { DownloadService } from "@/services/download-service";
export default {
  name: 'HomeView',
  data() {
    return {
      download_service: new DownloadService(),
      url: '',
      error: '',
    }
  },
  components: {},
  methods: {
    async submitForm() {
      this.error = '';
      if (!this.url) {
        this.error = 'Url is required!'
        return;
      }

      console.log(this.url, 'url')
      console.log('Form submitted!')
      await this.download_service.create(this.url)
    }
  }
}
</script>

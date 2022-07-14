<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <div class="wrapper">
      <h1 class="title">Pinterest Downloader</h1>
      <form @submit.prevent="submitForm" ref="form">
        <div>
          <label for="url">
            Video URL:
            <input v-model="url" id="url"/>
          </label>
        </div>
        <span v-if="error" style="color: red">{{ error }}</span>

        <div>
          <button class="btn" type="submit">Download</button>
        </div>
      </form>
    </div>

    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      url: '',
      error: '',
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    submitForm() {
      if(!this.url) {
        this.error = 'Url is required!'
        return;
      }

      console.log('Form submitted!')
    }
  }
}
</script>

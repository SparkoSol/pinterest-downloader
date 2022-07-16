<template>
  <div class="my-4">
    <h1 class="my-2 font-weight-bold">Social Downloader</h1>

    <div class="wrapper">
      <div class="row">
        <div class="col-3">
          <router-link to="/pinterest">
            <img alt="Pinterest logo" src="../assets/images/pinterest.png" width="200" height="200">
          </router-link>
        </div>

        <div class="col-3">
          <router-link to="#">
            <img alt="Instagram logo" src="../assets/images/instagram.png" width="200" height="200">
          </router-link>
        </div>

        <div class="col-3">
          <router-link to="#">
            <img alt="Facebook logo" src="../assets/images/facebook.png" width="200" height="200">
          </router-link>
        </div>

        <div class="col-3">
          <router-link to="#">
            <img alt="Youtube logo" src="../assets/images/youtube.png" width="200" height="200">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

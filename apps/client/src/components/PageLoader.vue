<template>
  <div class="loader">
    <img :src="loadingImg" alt="Loading..." />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingImg: "https://cdn.auth0.com/blog/hello-auth0/loader.svg",
    };
  },
};
</script>
<style>
.loader {
  height: 5rem;
  width: 5rem;

  margin: auto;

  animation: spin 2s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

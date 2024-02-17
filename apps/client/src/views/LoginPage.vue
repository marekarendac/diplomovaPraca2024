<template>
  <BlankLayout>
    <div class="center">
      <div class="button-container">
        <h2 class="title">Prihlásenie do systému</h2>
        <Login />
      </div>
    </div>
  </BlankLayout>
</template>

<script>
import BlankLayout from "@/components/BlankLayout.vue";
import Login from "@/components/Buttons/Login.vue";

export default {
  components: {
    Login,
    BlankLayout,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.center {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.button-container {
  position: relative; /* Add relative positioning */
  display: flex;
  flex-direction: column; /* Stack the title and the button vertically */
  align-items: center; /* Center the items */
  border: 1px solid #000; /* Add a border */
  padding: 100px; /* Add some padding */
  background-color: rgba(
    0,
    0,
    0,
    0.1
  ); /* Add a slightly shady background color */
}

.title {
  position: absolute; /* Position the title absolutely */
  top: 25px; /* Position it 1px from the top */
  margin: 0; /* Remove the default margin */
}
</style>

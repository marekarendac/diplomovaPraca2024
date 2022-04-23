<template>
  <div>
    <h2>Post Details</h2>
    <table></table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Meno</th>
        <th>Priezvisko</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in postDetails" :key="post.id">
        <td>{{ post.id }}</td>
        <td>{{ post.firstName }}</td>
        <td>{{ post.lastName }}</td>
      </tr>
    </tbody>
  </div>
</template>

<script>
import Api from "@/services/Api.js";
export default {
  data() {
    return {
      postDetails: [],
    };
  },
  mounted() {
    this.getPostDetails();
  },
  methods: {
    getPostDetails() {
      Api.get("/employees").then((response) => {
        this.formatPostDetails(response.data);
      });
    },
    formatPostDetails(posts) {
      for (let key in posts) {
        this.postDetails.push({ ...posts[key], id: key });
      }
      console.log(this.postDetails);
    },
  },
};
</script>

<style></style>

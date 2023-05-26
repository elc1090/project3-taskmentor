<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/view">View</router-link>
      <router-link to="/edit/1">Edit</router-link>
    </nav> -->
    <router-view></router-view>
  </div>
</template>
<script>

export default {
    components: {
    },
    data() {
        return {
        };
    }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
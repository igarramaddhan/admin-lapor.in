<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>Lapor.in</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="this.$localStorage.token != null" @click="logout" flat color="red">Logout</v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  },
  methods: {
    logout() {
      this.$localStorage.token = null;
    }
  }
};
</script>

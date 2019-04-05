<template>
  <v-container fill-height>
    <v-card class="dark--text" width="100%">
      <v-card-title primary-title>
        <div class="headline">Register</div>
      </v-card-title>
      <div class="Card-Content">
        <v-form @submit.prevent="register" v-model="valid">
          <v-text-field v-model="email" label="E-mail" outline required :rules="emailRules"></v-text-field>
          <v-text-field
            v-model="fullname"
            label="Full Name"
            outline
            required
            :rules="fullnameRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            outline
            required
            :rules="passwordRules"
          ></v-text-field>
          <v-btn
            large
            block
            type="submit"
            color="primary"
            :loading="loading"
            :disabled="loading||!valid"
          >Register</v-btn>
        </v-form>
      </div>
    </v-card>
    <v-snackbar v-model="snackbar" color="error" :bottom="true" :timeout="3000">
      {{ error }}
      <v-btn flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      fullname: "",
      loading: false,
      snackbar: false,
      error: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid"
      ],
      fullnameRules: [v => !!v || "Full Name is required"],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password need to be 8 characters or more"
      ]
    };
  },
  methods: {
    async register() {
      this.loading = true;
      if (!this.valid) return;
      try {
        const res = await this.$client.post("/register", {
          email: this.email,
          password: this.password,
          fullname: this.fullname
        });
        localStorage.setItem("api-token", res.data.token);
        this.$router.replace("/");
      } catch ({ response }) {
        this.error = response.data.message;
        this.snackbar = true;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.Card-Content {
  padding: 16px;
}
</style>

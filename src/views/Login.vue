<template>
  <v-container fill-height>
    <v-card class="dark--text" width="100%">
      <v-card-title primary-title>
        <div class="headline">Login</div>
      </v-card-title>
      <div class="Card-Content">
        <v-form @submit.prevent="login" v-model="valid">
          <v-text-field v-model="email" label="Email" outline required :rules="emailRules"></v-text-field>
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
          >Login</v-btn>
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
      passwordRules: [
        v => !!v || "Password is required"
        // v => v.length >= 8 || "Password need to be 8 characters or more"
      ]
    };
  },
  methods: {
    async login() {
      this.loading = true;
      if (!this.valid) return;
      try {
        const res = await this.$client.post("/login", {
          email: this.email,
          password: this.password
        });
        this.$localStorage.token = res.data.token;
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

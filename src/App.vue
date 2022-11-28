<template>
  <v-app>
    <v-app-bar app color="cyan lighten-5">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>
      <!-- <v-btn
          href="/"
          text
          color="secondary"
        >
          <span class="mr-2">Home</span>
        </v-btn> -->
      <router-link to="/test"
        ><v-btn text>
          <span>Test</span>
        </v-btn>
      </router-link>
      <router-link to="/forms">
        <v-btn text>
          <span>Forms</span>
        </v-btn>
      </router-link>
      <router-link to="/studet"
        ><v-btn text>
          <span>Student</span>
        </v-btn></router-link
      >
      <router-link to="/login" v-if="!this.$store.state.user"
        ><v-btn text>
          <span>Login</span>
        </v-btn></router-link
      >

      <v-btn text v-if="this.$store.state.user" @click="LogOut">
        <span>Log out</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    LogOut() {
      this.$store.commit("logout");
    },
  },
};
</script>
<style lang="sass">
@import '@/assets/styles/main.scss'
</style>

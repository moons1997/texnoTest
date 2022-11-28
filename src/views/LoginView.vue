<template>
  <v-container>
    <v-card color="#E0F7FA" class="mx-auto" max-width="800">
      <div class="forms">
        <div class="forms-name mb-2">
          <i>login:test</i>
          <custom-input
            v-model="data.login"
            :label="'Login'"
            placeholder="Enter login"
            ref="login"
            required
          />
        </div>
        <div class="forms-password">
          <div class="input">
            <i>password:123456</i>
            <custom-input
              :type="type"
              v-model="data.password"
              :label="'Password'"
              placeholder="Enter password"
              ref="password"
              required
            />
          </div>
          <div class="btn" @click="ShowHiddenPassword">
            {{ type == "password" ? "show" : "hidden" }} password
          </div>
        </div>

        <div class="forms-button">
          <button class="custom-button mt-2" type="submitt" @click="AddForms">
            Login
          </button>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
<script>
import CustomInput from "@/components/CustomInput.vue";
import mixin from "@/mixins/index.js";
export default {
  mixins: [mixin],
  components: {
    CustomInput,
  },
  data() {
    return {
      data: {
        login: "",
        password: "",
      },
      type: "password",
    };
  },
  created() {
    if (this.$store.state.user) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    ShowHiddenPassword() {
      if (this.type == "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    AddForms() {
      this.CheckValidation(this.data);
      if (this.Check(this.data)) {
        this.$store.commit("login", {
          login: this.data.login,
          password: this.data.password,
        });
        if (!this.$store.state.user) {
          alert("Invalid login or password");
        } else {
          this.$router.push({ name: "home" });
        }
      }
    },
  },
};
</script>
<style lang="scss">
.forms {
  margin-top: 3rem;
  padding: 3rem;
  &-password {
    display: flex;
    align-items: flex-end;
    width: 100%;
    .input {
      width: 80%;
    }
    .btn {
      width: 20%;
      margin-bottom: 5px;
      margin-left: 10px;
      font-size: 14px;
      cursor: pointer;
      color: red;
    }
  }
  &-button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

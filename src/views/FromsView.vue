<template>
  <v-container>
    <v-card color="#E0F7FA" class="mx-auto" max-width="800">
      <div class="forms">
        <div class="forms-name">
          <custom-input
            v-model="data.name"
            :label="'Name'"
            placeholder="Name"
            ref="name"
            required
          />
        </div>
        <div class="forms-phone">
          <custom-input
            v-model="data.phone"
            :label="'Phone'"
            placeholder="enter phone number"
            mask="+### ## ### ## ##"
            ref="phone"
            required
          />
        </div>
        <div class="forms-passport">
          <custom-input
            v-model="data.passport"
            label="Passport"
            placeholder="Enter passport"
            mask="AA#######"
            ref="passport"
            required
          />
        </div>
        <div class="forms-pinfl">
          <custom-input
            v-model="data.pinfl"
            label="PINFL"
            placeholder="Enter PINFL"
            mask="##############"
            ref="pinfl"
            required
          />
        </div>
        <div class="forms-birthday">
          <custom-input
            v-model="data.birthday"
            label="Birth day"
            placeholder="Enter birth day"
            ref="birthday"
            required
            type="date"
          />
        </div>
        <div class="forms-button">
          <button class="custom-button mt-2" type="submitt" @click="AddForms">
            Add forms
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
        phone: "",
        name: "",
        passport: "",
        pinfl: "",
        birthday: "",
      },
    };
  },
  created() {
    // console.log(this.$data);
    // this.displayMessage();
  },
  methods: {
    AddForms() {
      this.CheckValidation(this.data);
      if (this.Check(this.data)) {
        alert("succes forms");
      }
    },
  },
};
</script>
<style lang="scss">
.forms {
  margin-top: 3rem;
  padding: 3rem;

  &-button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

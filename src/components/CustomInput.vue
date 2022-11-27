<template>
  <div :class="`custom-input ${ErrorClass ? 'error-input' : ''}`">
    <label for="input"
      >{{ label }}
      <span v-if="required" style="color: red; font-size: 14px">*</span></label
    >
    <input
      v-if="type != 'date'"
      :type="type"
      :placeholder="placeholder"
      v-mask="mask"
      id="input"
      :value="value"
      @input="updateValue($event.target.value)"
      @focus="onFocus"
      @keyup="onKeyup"
      @blur="onBlur"
    />
    <input
      v-if="type == 'date'"
      :type="type"
      :placeholder="placeholder"
      v-mask="mask"
      id="input"
      :value="value"
      @input="updateValue($event.target.value)"
      @focus="onFocus"
      @keyup="onKeyup"
      @blur="onBlur"
    />
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {},
    mask: { type: String, default: "" },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      inputVal: false,
    };
  },
  computed: {
    ErrorClass: {
      get() {
        if (this.inputVal) {
          if (this.required) {
            return !this.value;
          }
        }
      },
      set(val) {},
    },
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
    onFocus() {
      this.$emit("focus", this.value);
    },
    onBlur($event) {
      // this.inputVal = true
      this.$emit("blur", $event);
    },
    checkInput() {
      this.inputVal = true;
    },
    onKeyup($event) {
      // this.checkInput()
      this.$emit("keyup", $event);
    },
  },
};
</script>
<style lang="scss">
.custom-input {
  label {
    font-size: 16px;
  }
  input {
    border: 1px solid #a0a0a1;
    outline: none;
    border-radius: 5px;
    padding: 5px 12px;
    width: 100%;
    font-size: 14px;
    &::placeholder {
      font-size: 12px;
    }
  }
}
.custom-input.error-input {
  input {
    border: 1px solid #e7385e;
  }
}
</style>

export default {
  methods: {
    CheckValidation(data) {
      const self = this;
      Object.keys(data).forEach(function (item) {
        self.$refs[item]?.checkInput();
      });
    },
    Check(data) {
      let validated = false;
      const fields = [];
      Object.keys(data)?.forEach((item) => {
        Object.keys(this.$refs)?.forEach((item2) => {
          if (item === item2) {
            if (!data[item]) {
              fields.push("false");
            } else {
              fields.push("true");
            }
          }
        });
      });
      validated = fields.every((el) => el == "true");
      return validated;
    },
  },
};

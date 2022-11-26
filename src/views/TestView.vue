<template>
  <v-container>
    <v-btn color="primary" elevation="2" @click="dialog = true">
      Create Test
    </v-btn>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                >
                Open Dialog
                </v-btn>
            </template> -->

      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create test</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <v-container>
          <v-card class="pa-2 pt-5" outlined tile>
            <v-row>
              <v-col md="4">
                <div class="custom-input">
                  <label for="question">Question</label>
                  <input
                    type="text"
                    placeholder="Question"
                    v-model="tempQuiz.text"
                    id="question"
                  />
                </div>

                <div class="answer-item">
                  <v-row>
                    <v-col md="1">a</v-col>
                    <v-col md="11">
                      <v-text-field
                        label="Answer"
                        placeholder="Placeholder"
                        outlined
                        dense
                        v-model="tempAnswer.text"
                      ></v-text-field>
                      <!-- :append-outer-icon="'mdi-plus'"
                        @click:append-outer="AddQuiz" -->
                    </v-col>
                    <!-- <v-col md="1">
                      <input type="radio" name="answer" />
                    </v-col> -->
                  </v-row>
                </div>
                <v-row justify="center">
                  <v-col md="1">a</v-col>
                </v-row>
              </v-col>
            </v-row>
            <div></div>
          </v-card>
        </v-container>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
export default {
  //   components: {  },
  data() {
    return {
      dialog: false,
      Quiz: [],
      tempQuiz: {
        id: 0,
        text: "",
        answers: [],
        type: 0,
      },
      tempAnswer: {
        id: 0,
        text: "",
        correct: false,
      },
    };
  },
  methods: {
    Print() {
      console.log("AAAA", this.tempQuiz.text);
    },
    AddQuiz() {
      console.log("AAAA", this.tempAnswer.text);
      this.tempAnswer.id = this.tempQuiz.answers.length + 1;
      this.tempQuiz.answers.push(this.tempAnswer);

      this.tempAnswer = {
        id: 0,
        text: "",
        correct: false,
      };
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
</style>

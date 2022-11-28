<template>
  <v-container>
    <div>
      <v-btn color="primary" elevation="2" @click="dialog = true" class="mr-2">
        Create Test
      </v-btn>
      <v-btn color="success" elevation="2" @click="QuizFinsh"> Finsh </v-btn>
    </div>

    <div class="user-class">
      <div
        class="uquize-item mb-2"
        v-for="(quize, index) in quizes"
        :key="quize.id + 'q'"
      >
        <v-card class="mx-auto p-2" color="#E3F2FD" max-width="600">
          <div class="uquize-item__question">
            <b>{{ quize.text }}</b>
          </div>
          <div
            class="answer-item"
            v-for="(answer, idx) in quize.answers"
            :key="answer.id + 'b'"
            v-show="quize.type != 3"
          >
            <div class="answer-item__mark">{{ alphabet[idx] }}.</div>
            <div class="answer-item__answer ml-2">
              {{ answer.text }}
            </div>
            <div
              class="answer-item__corect custom-checkbox"
              v-if="quize.type == 2"
            >
              <input
                type="checkbox"
                id="checkbox"
                v-model="answer.userAnswer"
              />
            </div>
            <div
              class="answer-item__corect custom-radio"
              v-if="quize.type == 1"
            >
              <input
                type="radio"
                name="answer"
                :value="idx"
                :checked="answer.userAnswer"
                @input="CorectAnswer(idx, 'user', index)"
              />
            </div>
          </div>
          <div class="answer-text mb-2" v-if="quize.type == 3">
            <custom-input
              v-model="quize.answers[0].userAnswer"
              placeholder="Text answer"
            />
          </div>
        </v-card>
      </div>
    </div>

    <v-dialog v-model="finish" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Quize result
        </v-card-title>

        <v-card-text class="mt-2">
          <div class="text-h1 text-center">
            {{ result.countCorrectAnswer }}/{{ quizes.length }}
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="(finish = false), (result.countCorrectAnswer = 0)"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create test</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-card class="pa-2 pt-5" outlined tile>
            <v-row>
              <v-col md="4">
                <div class="question">
                  <custom-input
                    v-model="tempQuiz.text"
                    placeholder="Question"
                    label="Question"
                  />
                </div>

                <div class="forms-course mt-2">
                  <custom-select
                    v-model="tempQuiz.type"
                    :label="'Type quize'"
                    placeholder="Enter type quize"
                    :options="quizTypes"
                    @changeSelect="ChangeQuizeType"
                  />
                </div>

                <div class="quiz-text">Variants</div>

                <div class="answer-text mb-2" v-if="tempQuiz.type == 3">
                  <custom-input
                    v-model="tempQuiz.answers[0].corerectTxt"
                    placeholder="Text answer"
                  />
                </div>

                <div
                  class="answer-item"
                  v-for="(answer, idx) in tempQuiz.answers"
                  :key="answer.id + 'b'"
                  v-show="tempQuiz.type != 3"
                >
                  <div class="answer-item__mark">{{ alphabet[idx] }}</div>
                  <div class="answer-item__answer">
                    <custom-input v-model="answer.text" placeholder="Answer" />
                  </div>
                  <div
                    class="answer-item__corect custom-checkbox"
                    v-if="tempQuiz.type == 2"
                  >
                    <input
                      type="checkbox"
                      id="checkbox"
                      v-model="answer.correct"
                    />
                    {{ answer.correct ? "correct" : "not correct" }}
                  </div>
                  <div
                    class="answer-item__corect custom-radio"
                    v-if="tempQuiz.type == 1"
                  >
                    <input
                      type="radio"
                      name="answer"
                      :value="idx"
                      :checked="answer.correct"
                      @input="CorectAnswer(idx)"
                    />
                    {{ answer.correct ? "correct" : "not correct" }}
                  </div>
                </div>

                <div
                  class="add-answer"
                  @click="AddAnswer"
                  v-show="tempQuiz.type != 3"
                >
                  Add answer
                </div>
                <div class="add-quize">
                  <button class="custom-button" @click="AddQuiz">
                    {{ editedIndex1 > -1 ? "Edit" : "Add" }} quize
                  </button>
                </div>
              </v-col>
            </v-row>
            <div></div>
          </v-card>
        </v-container>

        <v-divider></v-divider>
        <v-alert
          :value="alert"
          border="top"
          type="warning"
          transition="scale-transition"
        >
          Quize answer not empty!
        </v-alert>
        <v-container>
          <div class="quiz-text">Quizes</div>
          <div
            class="quiz-item"
            v-for="(item, index) in quizes"
            :key="item.id + 'f'"
          >
            <div class="quiz-item__text">{{ item.text }}</div>
            <div class="quiz-item__actions">
              <span class="actions-edit" @click="Edit(item, index)">Edit</span>
              <span class="actions-delete" @click="Delete(item, index)"
                >Delete</span
              >
            </div>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import CustomInput from "@/components/CustomInput.vue";
import CustomSelect from "@/components/CustomSelect.vue";

export default {
  components: { CustomInput, CustomSelect },
  data() {
    return {
      dialog: false,
      finish: false,
      result: {
        countQuize: 0,
        countCorrectAnswer: 0,
      },
      quizTypes: [
        { id: 1, text: "Single answer" },
        { id: 2, text: "More answer" },
        { id: 3, text: "Text answer" },
      ],
      alert: false,
      quizes: [],
      editedIndex1: -1,
      tempQuiz: {
        id: 0,
        text: "",
        type: 1,
        answers: [
          {
            id: 0,
            text: "",
            correct: true,
            corerectTxt: "",
            userAnswer: null,
          },
        ],
      },
      alphabet: [
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
      ],
    };
  },
  created() {
    var localQuizes = localStorage.getItem("quizes");
    this.quizes = this.quizes.length > 0 ? this.quizes : JSON.parse(localQuizes)
      // JSON.parse(localQuizes).length > 0 ? JSON.parse(localQuizes) : [];
      
    this.result.countQuize = this.quizes.length;
  },
  methods: {
    AddAnswer() {
      this.tempQuiz.answers.push({
        id: this.tempQuiz.answers.length + 1,
        text: "",
        correct: false,
        corerectTxt: "",
        userAnswer: null,
      });
    },
    CorectAnswer(idx, type, indexQ) {
      if (type == "user") {
        for (
          let index = 0;
          index < this.quizes[indexQ].answers.length;
          index++
        ) {
          if (index == idx) {
            this.quizes[indexQ].answers[index].userAnswer = true;
            // alert("true");
          } else {
            this.quizes[indexQ].answers[index].userAnswer = false;
            // alert("false");
          }
        }
      } else {
        for (let index = 0; index < this.tempQuiz.answers.length; index++) {
          if (index == idx) {
            this.tempQuiz.answers[index].correct = true;
            // alert("true");
          } else {
            this.tempQuiz.answers[index].correct = false;
            // alert("false");
          }
        }
      }
    },
    ChangeQuizeType(item) {
      if (this.tempQuiz.type == 3) {
        this.tempQuiz.answers = [];
        this.tempQuiz.answers.push({
          id: 0,
          text: "",
          correct: true,
          corerectTxt: "",
          userAnswer: null,
        });
      }
    },
    AddQuiz() {
      if (this.editedIndex1 > -1) {
        Object.assign(this.quizes[this.editedIndex1], this.tempQuiz);
        this.editedIndex1 = -1;
        localStorage.setItem("quizes", JSON.stringify(this.quizes));
        this.ClearTempQuize();
      } else {
        this.tempQuiz.id = this.quizes.length + 1;
        this.tempQuiz.answers.map((answer) => {
          if (
            (answer.text === "" &&
              this.tempQuiz.text === "" &&
              this.tempQuiz.type != 3) ||
            (answer.corerectTxt === "" &&
              this.tempQuiz.text === "" &&
              this.tempQuiz.type == 3)
          ) {
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
            }, 2000);
            return false;
          }
        });
        this.quizes.push(JSON.parse(JSON.stringify(this.tempQuiz)));
        localStorage.setItem("quizes", JSON.stringify(this.quizes));
        this.ClearTempQuize();
      }
    },
    Edit(item, index) {
      this.editedIndex1 = this.quizes.indexOf(item);
      this.tempQuiz = Object.assign({}, item);
    },
    Delete(item, index) {
      this.quizes.splice(index, 1);
      localStorage.setItem("quizes", JSON.stringify(this.quizes));
    },
    ClearTempQuize() {
      this.tempQuiz = {
        id: 0,
        text: "",
        type: 1,
        answers: [
          {
            id: 0,
            text: "",
            correct: true,
            corerectTxt: "",
            userAnswer: null,
          },
        ],
      };
    },
    CheckSingleAnswerQuiz(answers){
      let res = false;
      answers.map((answer) => {
        if (answer.userAnswer == true && answer.correct == true) {
          res =  true
        }
      })
      return res
    },
    CheckMoreAnswerQuiz(answers){
      let res = false;
      let counter = 0;
      let countCorrect = answers.filter(item => item.correct == true).length
      answers.map((answer) => {
        if (answer.userAnswer == true && answer.correct == true) {
          counter += 1
        }
      })
      res = counter == countCorrect
      return res
    },
    CheckTextAnswerQuiz(answers){
      let res = false;
      answers.map((answer) => {
         if (answer.userAnswer?.toUpperCase() == answer.corerectTxt.toUpperCase()) {
          res = true
         }
      })
      return res;
    },
    QuizFinsh() {
      this.finish = true;
      this.result.countCorrectAnswer = 0;
      this.quizes.map((quize) => {
        switch (parseInt(quize.type)) {
            case 1:
              if(this.CheckSingleAnswerQuiz(quize.answers)){
                this.result.countCorrectAnswer += 1;
              }
              break;
            case 2:
              if( this.CheckMoreAnswerQuiz(quize.answers)){
                this.result.countCorrectAnswer += 1;
              }
              break;
            case 3:
              if(this.CheckTextAnswerQuiz(quize.answers)){
                this.result.countCorrectAnswer += 1;
              }
              break;
        }
        // quize.answers.map((answer) => {
        //   switch (quize.type) {
        //     case 1:
        //       if (answer.userAnswer == true && answer.correct == true) {
        //         this.result.countCorrectAnswer += 1;
        //       }
        //       break;
        //     case 2:
        //       // if (answer.userAnswer == true && answer.correct == true) {
        //       //   alert(answer.text);
        //       // }
        //       break;
        //     case 3:
        //       if (answer.userAnswer.toUpperCase() == answer.corerectTxt.toUpperCase()) {
        //         this.result.countCorrectAnswer += 1;
        //       }
        //       break;
        //   }
        // });
      });
    },
  },
};
</script>
<style lang="scss">
.answer-item {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 7px;
  &__mark {
    width: 3%;
    font-weight: 500;
  }
  &__answer {
    width: 75%;
    margin-right: 10px;
  }
  &__correct {
    width: 15%;
    font-size: 14px;
  }
}
.quiz-text {
  margin-top: 25px;
  font-weight: bold;
  margin-bottom: 5px;
}
.add-answer {
  font-size: 12px;
  color: #4c4c4e;
  cursor: pointer;
  font-weight: 500;
  margin-top: 8px;
}
.add-quize {
  display: flex;
  justify-content: flex-end;
}

.quiz-item {
  display: flex;
  padding: 5px 12px;
  border-bottom: 1px solid #a0a0a1;
  border-radius: 5px;
  font-size: 14px;
  &__text {
    width: 75%;
  }
  &__actions {
    width: 25%;
  }
  .actions-edit {
    margin-right: 10px;
    cursor: pointer;
  }
  .actions-delete {
    color: #e7385e;
    cursor: pointer;
  }
}
</style>

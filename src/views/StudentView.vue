<template>
  <v-container>
    <v-row>
      <v-col md="6"
        ><v-card color="#E0F7FA" class="mx-auto" max-width="800">
          <div class="forms" v-if="is_added">
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
            <div class="forms-course">
              <custom-select
                v-model="data.courseId"
                :label="'Course'"
                placeholder="Enter course number"
                ref="course"
                required
                :options="courseList"
                @changeSelect="ChangeCourse"
              />
            </div>
            <div class="forms-button">
              <button
                class="custom-button mt-2"
                type="submitt"
                @click="AddStudet"
              >
                Add student
              </button>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col md="6">
        <div class="student-list">
          <div class="text-h4">Students</div>
          <div class="student-list__filter mb-2">
            <div class="mr-2">
              <custom-input
                v-model="filter.name"
                placeholder="filter by name"
              />
            </div>
            <div class="mr-2">
              <custom-select
                v-model="filter.courseId"
                placeholder="filter by course"
                :options="courseList"
              />
            </div>
            <div>
              <button class="custom-button" @click="RefreshFilter">Refresh</button>
            </div>
            <!-- <div>
              <button class="custom-button">Filter</button>
            </div> -->
          </div>

          <v-simple-table dense border="1">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Course</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in FilteredList()" :key="item.name + 'st'">
                  <td>{{ item.name }}</td>
                  <td>{{ item.course }}</td>
                  <td>
                    <div class="actions">
                      <span class="actions-edit" @click="Edit(item, index)">
                        Edit
                      </span>
                      <span class="actions-delete" @click="Delete(item, index)">
                        Delete
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CustomInput from "@/components/CustomInput.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import mixin from "@/mixins/index.js";
export default {
  mixins: [mixin],
  components: {
    CustomInput,
    CustomSelect,
  },
  data() {
    return {
      courseList: [
        { id: 1, text: "course 1" },
        { id: 2, text: "course 2" },
        { id: 3, text: "course 3" },
        { id: 4, text: "course 4" },
      ],
      studetns: [],
      data: {
        phone: "",
        name: "",
        courseId: 1,
        course: "course 1",
      },
      filter: {
        name: "",
        courseId: null,
      },
      editedIndex1: -1,
      is_added: true,
    };
  },
  created() {
    // console.log(this.$data);
    // this.displayMessage();
  },
  methods: {
    RefreshFilter(){
      this.filter = {
        name: "",
        courseId: null,
      }
    },
    FilteredList(type) {
        return this.studetns.filter((item) =>
          {
            if(!!this.filter.name){
              return item.name.toLowerCase().includes(this.filter.name.toLowerCase())
            }else if(!!this.filter.courseId){
              return parseInt(item.courseId) == parseInt(this.filter.courseId)
            }else{
              return item
            }
          }
        )
        // : this.studetns.filter((item) =>
        //    parseInt(item.courseId) == parseInt(this.filter.courseId)
        //  );
    },
    AddStudet() {
      this.CheckValidation(this.data);
      if (this.Check(this.data)) {
        this.is_added = false;
        if (this.editedIndex1 > -1) {
          Object.assign(this.studetns[this.editedIndex1], this.data);
          this.editedIndex1 = -1;
        } else {
          this.studetns.push(JSON.parse(JSON.stringify(this.data)));
        }
      }
      this.ClearData();
      setTimeout(() => {
        this.is_added = true;
      }, 0);
    },
    ClearData() {
      this.data = {
        phone: "",
        name: "",
        course: "course 1",
        courseId: 1,
      };
    },
    ChangeCourse(idate) {
      this.data.course = this.courseList.filter(
        (item) => item.id == idate.target.value
      )[0].text;
    },
    Edit(item, index) {
      this.editedIndex1 = this.studetns.indexOf(item);
      this.data = Object.assign({}, item);
    },
    Delete(item, index) {
      this.studetns.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.student-list {
  margin-top: 3rem;
  &__filter {
    display: flex;
    // max-width: 50%;
    justify-content: flex-end;
  }
}
.forms {
  margin-top: 3rem;
  padding: 3rem;

  &-button {
    display: flex;
    justify-content: flex-end;
  }
}
table {
  border: 1 px solid red;
}
thead {
  background-color: #e0f7fa;
  border-bottom: 1px solid red;
}
.filter-row {
  background-color: #e0f7fa;
}
</style>

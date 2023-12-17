<template>
  <div>
    <br />
    <center>
      <h1>{{ realTime }}</h1>
    </center>
    <br />
    <div class="d-flex justify-space-between">
      <h1>Selamat datang {{ dataUser.nama }}, di aplikasi todoApps Waizly</h1>
      <v-btn @click="dialogLogout = true">logout</v-btn>
    </div>
    <br />

    <div class="mb-2 d-flex justify-space-between">
      <h2>Marked Task</h2>
    </div>
    <v-divider class="mt-2 mb-4"></v-divider>
    <v-row v-if="listTaskMark.length > 0">
      <v-col v-for="item in listTaskMark" :key="item.id_task" cols="12" sm="4">
        <v-card class="pa-3">
          <h3>{{ item.nama }}</h3>
          <div>{{ item.deskripsi }}</div>
          <div class="mt-2">
            <div class="d-flex justify-space-between">
              <div>progress</div>
              <div>{{ item.progress }}%</div>
            </div>
            <v-progress-linear
              class="mt-1"
              :value="item.progress"
              color="indigo darken-2"
            ></v-progress-linear>
          </div>
          <div class="mt-4 d-flex justify-space-between">
            <div class="d-flex">
              <v-icon
                @click="
                  (tempTaskUpdate = JSON.parse(JSON.stringify(item))),
                    (dialogHapusTask = true)
                "
                >mdi-delete</v-icon
              >
              <v-icon
                @click="putTask(item, 'false')"
                v-if="item.pin == 'true'"
                large
                >mdi-bookmark-box</v-icon
              >
              <v-icon @click="putTask(item, 'true')" v-else large
                >mdi-bookmark-box-outline</v-icon
              >
            </div>
            <v-btn
              @click="
                (tempTaskUpdate = JSON.parse(JSON.stringify(item))),
                  (dialogUpdate = true)
              "
              class="ml-2"
              >update</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-card v-else class="py-4 text-center">
      <h4>Tidak ditemukan data task</h4>
    </v-card>
    <br />
    <div class="mb-2 d-flex justify-space-between">
      <h2>Your Task</h2>
      <div>
        <v-btn @click="dialogTambahTask = true" small
          ><v-icon>mdi-plus</v-icon>task</v-btn
        >
      </div>
    </div>
    <v-divider></v-divider>
    <v-row v-if="listTaskAll.length > 0" class="mt-2">
      <v-col v-for="item in listTaskAll" :key="item.id_task" cols="12" sm="4">
        <v-card class="pa-3">
          <h3>{{ item.nama }}</h3>
          <div>{{ item.deskripsi }}</div>
          <div class="mt-2">
            <div class="d-flex justify-space-between">
              <div>progress</div>
              <div>{{ item.progress }}%</div>
            </div>
            <v-progress-linear
              class="mt-1"
              :value="item.progress"
              color="indigo darken-2"
            ></v-progress-linear>
          </div>
          <div class="mt-4 d-flex justify-space-between">
            <div class="d-flex">
              <v-icon
                @click="
                  (tempTaskUpdate = JSON.parse(JSON.stringify(item))),
                    (dialogHapusTask = true)
                "
                >mdi-delete</v-icon
              >
              <v-icon
                @click="putTask(item, 'false')"
                v-if="item.pin == 'true'"
                large
                >mdi-bookmark-box</v-icon
              >
              <v-icon @click="putTask(item, 'true')" v-else large
                >mdi-bookmark-box-outline</v-icon
              >
            </div>
            <v-btn
              @click="
                (tempTaskUpdate = JSON.parse(JSON.stringify(item))),
                  (dialogUpdate = true)
              "
              class="ml-2"
              >update</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-card v-else class="py-4 text-center">
      <h4>Tidak ditemukan data task</h4>
    </v-card>
    <v-dialog v-model="dialogUpdate" width="700px">
      <v-card v-if="tempTaskUpdate" class="pa-2">
        <div class="d-flex align-center justify-space-between">
          <h3>Update Task</h3>
          <div>
            <v-icon @click="dialogUpdate = false">mdi-close</v-icon>
          </div>
        </div>
        <div class="pa-2 mt-4">
          <v-text-field
            label="nama"
            v-model="tempTaskUpdate.nama"
            :rules="[(v) => !!v || 'Nama wajib diisi']"
            outlined
          >
          </v-text-field>
          <v-textarea
            label="deskripsi"
            v-model="tempTaskUpdate.deskripsi"
            :rules="[(v) => !!v || 'deskripsi wajib diisi']"
            outlined
          >
          </v-textarea>
          <v-text-field
            label="progress"
            v-model="tempTaskUpdate.progress"
            type="number"
            :rules="[(v) => !!v || 'Progress wajib diisi']"
            outlined
          >
          </v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn>cancel</v-btn>
            <v-btn @click="putTask()">kirim</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogTambahTask" width="700px">
      <v-card class="pa-2">
        <div class="d-flex align-center justify-space-between">
          <h3>Tambah Task</h3>
          <div>
            <v-icon @click="dialogTambahTask = false">mdi-close</v-icon>
          </div>
        </div>
        <div class="pa-2 mt-4">
          <v-text-field
            label="nama"
            v-model="nama"
            :rules="[(v) => !!v || 'Nama wajib diisi']"
            outlined
          >
          </v-text-field>
          <v-textarea
            label="deskripsi"
            v-model="deskripsi"
            :rules="[(v) => !!v || 'deskripsi wajib diisi']"
            outlined
          >
          </v-textarea>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn>cancel</v-btn>
            <v-btn @click="postTask()">kirim</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogLogout" width="400px">
      <v-card class="pa-2">
        <div class="d-flex align-center justify-space-between">
          <h3>Logout</h3>
          <div>
            <v-icon @click="dialogLogout = false">mdi-close</v-icon>
          </div>
        </div>
        <center>
          <div class="my-4">Apakah anda yakin ingin keluar ?</div>
        </center>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small>cancel</v-btn>
          <v-btn small @click="logout()">ya, keluar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogHapusTask" width="400px">
      <v-card class="pa-2">
        <div class="d-flex align-center justify-space-between">
          <h3>Hapus Task</h3>
          <div>
            <v-icon @click="dialogHapusTask = false">mdi-close</v-icon>
          </div>
        </div>
        <center>
          <div class="my-4">Apakah anda yakin ingin hapus ?</div>
        </center>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small>cancel</v-btn>
          <v-btn small @click="putHapusTask()">ya, hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data: () => ({
    dialogUpdate: false,
    dialogTambahTask: false,
    dialogHapusTask: false,
    dialogLogout: false,
    nama: "",
    deskripsi: "",
    dataUser: null,
    listTaskAll: [],
    listTaskMark: [],
    tempTaskUpdate: null,
    realTime: null,
  }),
  methods: {
    async postTask() {
      let formData = new FormData();

      formData.set("id_user", this.dataUser.id_user);
      formData.set("nama", this.nama);
      formData.set("deskripsi", this.deskripsi);

      await this.$axios
        .post("/task/v1/task/create", formData, {
          headers: { Authorization: "Bearer " + this.dataUser.token },
        })
        .then((response) => {
          let { data } = response;
          //   this.setAlert({
          //     status: true,
          //     color: 'success',
          //     text: data.api_message,
          //   })
          this.dialogTambahTask = false;
          this.getTaskAll();
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    async putTask(item, data) {
      let formData = new FormData();

      if (item) {
        formData.set("id_task", item.id_task);
        formData.set("pin", data);
      } else {
        formData.set("id_task", this.tempTaskUpdate.id_task);
        formData.set("nama", this.tempTaskUpdate.nama);
        formData.set("deskripsi", this.tempTaskUpdate.deskripsi);
        formData.set("progress", this.tempTaskUpdate.progress);
      }

      await this.$axios
        .put("/task/v1/task/update", formData, {
          headers: { Authorization: "Bearer " + this.dataUser.token },
        })
        .then((response) => {
          let { data } = response;
          //   this.setAlert({
          //     status: true,
          //     color: 'success',
          //     text: data.api_message,
          //   })
          this.dialogUpdate = false;
          this.getTaskAll();
          this.getTaskMark();
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    async getTaskAll() {
      await this.$axios
        .get("/task/v1/task/gettask", {
          params: {
            id_user: this.dataUser.id_user,
          },
          headers: { Authorization: "Bearer " + this.dataUser.token },
        })
        .then((response) => {
          let { data } = response.data;
          //   this.listDeposit = data
          console.log("data task all", data);
          this.listTaskAll = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    async getTaskMark() {
      await this.$axios
        .get("/task/v1/task/gettask", {
          params: {
            id_user: this.dataUser.id_user,
            pin: "true",
          },
          headers: { Authorization: "Bearer " + this.dataUser.token },
        })
        .then((response) => {
          let { data } = response.data;
          //   this.listDeposit = data
          console.log("data task mark", data);
          this.listTaskMark = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    async putHapusTask() {
      let formData = new FormData();

      formData.set("id_task", this.tempTaskUpdate.id_task);

      await this.$axios
        .post("/task/v1/task/delete", formData, {
          headers: { Authorization: "Bearer " + this.dataUser.token },
        })
        .then((response) => {
          let { data } = response;
          //   this.setAlert({
          //     status: true,
          //     color: 'success',
          //     text: data.api_message,
          //   })
          this.dialogHapusTask = false;
          this.getTaskAll();
          this.getTaskMark();
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    async getTimeLive() {
      //   async function updateRealTime() {
      try {
        const response = await fetch("http://worldtimeapi.org/api/ip");
        const data = await response.json();

        if (response.ok) {
          const currentTime = new Date(data.datetime);
          const hours = currentTime.getHours();
          const minutes = currentTime.getMinutes();
          const seconds = currentTime.getSeconds();

          const formattedTime = `${String(hours).padStart(2, "0")}:${String(
            minutes
          ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
          //   console.log("hahahahbhbhbhb", formattedTime);
          this.realTime = formattedTime;
          //   console.log("hahaha", data);
        } else {
          console.error(
            `Failed to fetch time: ${data.error || response.statusText}`
          );
        }
      } catch (error) {
        console.error(`Error fetching time: ${error.message}`);
      }
      //   }
    },
    logout() {
      this.$cookies.remove("user");
      this.$router.push("/frontend/login");
    },
  },
  created() {
    this.dataUser = this.$cookies.get("user");
    console.log("haya", this.dataUser);
    this.getTaskAll();
    this.getTaskMark();
    setInterval(() => {
      this.getTimeLive();
    }, 1000);
  },
};
</script>

<style></style>

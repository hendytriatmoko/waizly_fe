<template>
  <div>
    <br />
    <center>
      <v-card class="pa-4" style="width: 600px">
        <h2>Login todoApps Waizly</h2>
        <br />
        <v-text-field label="email" v-model="email" outlined> </v-text-field>
        <v-text-field
          label="password"
          v-model="passwordLogin"
          :type="eyePasswordLogin ? 'password' : 'text'"
          :append-icon="eyePasswordLogin ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="eyePasswordLogin = !eyePasswordLogin"
          outlined
        >
        </v-text-field>
        <div>
          belum punya akun ?
          <span
            @click="dialogDaftar = true"
            style="cursor: pointer; color: light-blue"
            >daftar disini</span
          >
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="postLogin()"> Login </v-btn>
        </v-card-actions>
      </v-card>
    </center>
    <v-dialog v-model="dialogDaftar" width="600px">
      <v-card class="pa-2">
        <div class="d-flex align-center justify-space-between">
          <h3>Register todoApps Waizly</h3>
          <div>
            <v-icon @click="dialogDaftar = false">mdi-close</v-icon>
          </div>
        </div>
        <div class="pa-2 mt-4">
          <v-form v-model="formValid">
            <v-text-field
              label="nama"
              v-model="nama"
              :rules="[(v) => !!v || 'Nama wajib diisi']"
              outlined
            >
            </v-text-field>
            <v-text-field
              label="email"
              outlined
              v-model="email"
              :rules="[(v) => !!v || 'Email wajib diisi']"
            >
            </v-text-field>
            <v-text-field
              label="nomor hp"
              type="number"
              v-model="no_hp"
              :rules="[
                (v) => !!v || 'Nomor HP wajib diisi (Min 10, Max 13)',
                (v) =>
                  (v && v.length >= 10) ||
                  'Nomor HP wajib diisi (Min 10, Max 13)',
              ]"
              outlined
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              label="password"
              :type="eyePassword ? 'password' : 'text'"
              :append-icon="eyePassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="eyePassword = !eyePassword"
              outlined
            >
            </v-text-field>
            <v-text-field
              v-model="konfirmasiPassword"
              :rules="[
                (v) => !!v || 'Nomor HP wajib diisi (Min 10, Max 13)',
                (v) => v === password || 'password belum sama',
              ]"
              label="konfirmasi password"
              :type="eyeKonfPassword ? 'password' : 'text'"
              :append-icon="eyeKonfPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="eyeKonfPassword = !eyeKonfPassword"
              outlined
            >
            </v-text-field>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="postRegister()" :disabled="!formValid">
              Daftar
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    dialogDaftar: false,
    formValid: false,
    nama: "",
    email: "",
    no_hp: "",
    password: "",
    passwordLogin: "",
    eyePasswordLogin: true,
    eyePassword: true,
    eyeKonfPassword: true,
    konfirmasiPassword: "",
    timeBefore: "12:01:20am",
  }),
  methods: {
    async postRegister() {
      let formData = new FormData();

      formData.append("nama", this.nama);
      formData.append("email", this.email);
      formData.append("no_hp", this.no_hp);

      formData.append("password", this.konfirmasiPassword);
      // formData.append("id_one_signal", this.$root.$children[0].notif);

      await this.$axios
        .post("/user/v1/user/create", formData)
        .then((response) => {
          //   let { data } = response.data;
          //   console.log("data user login nih", data);
          //   this.$cookies.set("user", JSON.stringify(data[0]));
          //   this.$router.push("/frontend");
          this.postLogin("direct");
          //   this.setAlert({
          //     status: true,
          //     color: 'success',
          //     text: 'Selamat Datang ' + this.user.nama,
          //   })
        })
        .catch((error) => {
          let responses = error.response.data;
          //   this.setAlert({
          //     status: true,
          //     color: 'error',
          //     text: responses.api_message,
          //   })
        });
    },
    async postLogin(direct) {
      let formData = new FormData();

      if (direct) {
        formData.append("email", this.email);
        formData.append("password", this.konfirmasiPassword);
      } else {
        formData.append("email", this.email);
        formData.append("password", this.passwordLogin);
      }
      // formData.append("id_one_signal", this.$root.$children[0].notif);

      await this.$axios
        .post("/user/v1/user/signin", formData)
        .then((response) => {
          let { data } = response.data;
          console.log("data user login nih", data);
          this.$cookies.set("user", JSON.stringify(data[0]));
          this.$router.push("/frontend");
          //   this.setAlert({
          //     status: true,
          //     color: 'success',
          //     text: 'Selamat Datang ' + this.user.nama,
          //   })
        })
        .catch((error) => {
          let responses = error.response.data;
          //   this.setAlert({
          //     status: true,
          //     color: 'error',
          //     text: responses.api_message,
          //   })
        });
    },
  },
  created() {},
};
</script>

<style></style>

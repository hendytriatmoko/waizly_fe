<template>
  <div>
    <!-- solving basic start -->
    <div>
      <center>
        <v-row dense>
          <v-col cols="12" sm="12">
            <h1>Solving Basic</h1>
          </v-col>
          <v-col cols="12" sm="4">
            <div>
              <v-btn :href="'/solving-basic/test-1'">Solving basic 1</v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div>
              <v-btn :href="'/solving-basic/test-2'">Solving basic 2</v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div>
              <v-btn :href="'/solving-basic/test-3'">Solving basic 3</v-btn>
            </div>
          </v-col>
        </v-row>
      </center>
    </div>
    <!-- solving basic end -->
    <br /><br />
    <!-- implementation test start -->
    <div>
      <center>
        <h1>Implementation Test</h1>
        <v-row dense>
          <v-col cols="12" sm="6">
            <div>
              <v-btn>Backend</v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>
              <v-btn :href="'/frontend'">Frontend</v-btn>
            </div>
          </v-col>
        </v-row>
      </center>
    </div>
    <!-- implementation test end -->
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

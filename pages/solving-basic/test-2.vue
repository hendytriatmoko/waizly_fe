<template>
  <div>
    <br />
    <v-row align="center" justify="center">
      <v-col cols="12" sm="5">
        <v-card class="pa-2">
          <h2>Input length of array</h2>
          <v-text-field
            v-model="lengthArray"
            outlined
            type="number"
            class="mt-2"
            :rules="lengthRules"
            label="length array"
          >
          </v-text-field>
          <h2>Input numbers array in the column</h2>
          <v-text-field
            @keyup="getStart()"
            v-model="stringnumber"
            outlined
            class="mt-2"
            label="Number Array"
          >
          </v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="hitungPlusMinusZero()"
              :disabled="number.length == lengthArray ? false : true"
              >send</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="hitung" cols="12" sm="7">
        <v-card class="pa-2">
          <h2>Output positive negative and zero</h2>
          <br />

          <v-card outlined class="pa-3">
            <div>
              <div>
                {{ hasil.positive.hasilPositive + " (positive)" }}
              </div>
              <div>
                {{ hasil.negative.hasilNegative + " (negative)" }}
              </div>
              <div>
                {{ hasil.zero.hasilZero + " (zero)" }}
              </div>
            </div>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Test2",
  data: () => ({
    lengthArray: 1,
    lengthRules: [(v) => v > 0 || "failed number input"],
    stringnumber: "",
    number: [],
    hasil: [
      {
        countPositive: 0,
        hasilPositive: 0,
      },
      {
        countNegative: 0,
        hasilNegative: 0,
      },
      {
        countZero: 0,
        hasilZero: 0,
      },
    ],
    hitung: false,
  }),
  methods: {
    getStart() {
      this.hitung = false;
      let myNum = this.stringnumber.split(" ");
      this.number = myNum
        .filter((element) => !isNaN(parseInt(element)) && element !== "")
        .map((element) => parseInt(element));

      // console.log("this.stringnumber", this.stringnumber);
      // console.log("myNum", myNum);
      // console.log("this.number", this.number);
    },
    hitungPlusMinusZero() {
      this.hasil = {
        positive: {
          countPositive: 0,
          hasilPositive: 0,
        },
        negative: {
          countNegative: 0,
          hasilNegative: 0,
        },
        zero: {
          countZero: 0,
          hasilZero: 0,
        },
      };

      for (let i = 0; i < this.number.length; i++) {
        if (this.number[i] > 0) {
          this.hasil.positive.countPositive++;
        } else if (this.number[i] < 0) {
          this.hasil.negative.countNegative++;
        } else {
          this.hasil.zero.countZero++;
        }
      }
      this.hasil.positive.hasilPositive = (
        this.hasil.positive.countPositive / this.number.length
      ).toFixed(6);
      this.hasil.negative.hasilNegative = (
        this.hasil.negative.countNegative / this.number.length
      ).toFixed(6);
      this.hasil.zero.hasilZero = (
        this.hasil.zero.countZero / this.number.length
      ).toFixed(6);
      // console.log("hasil", this.hasil);
      this.hitung = true;
    },
  },
};
</script>

<style></style>

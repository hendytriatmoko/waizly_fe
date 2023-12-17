<template>
  <div>
    <br />
    <v-row align="center" justify="center">
      <v-col cols="12" sm="5">
        <v-card class="pa-2">
          <h2>Input 5 numbers in the column</h2>
          <v-text-field
            @keyup="getStart()"
            v-model="stringnumber"
            outlined
            class="mt-2"
            label="5 Number"
          >
          </v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="hitungMinMax()"
              :disabled="number.length == 5 ? false : true"
              >send</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="hasil" cols="12" sm="7">
        <v-card class="pa-2">
          <h2>Output min max sum value 4 of 5 integers</h2>
          <v-card outlined class="pa-3">{{
            sumFirstFour + " " + sumLastFour
          }}</v-card>
          <br />
          <h2>Sum everything except ...</h2>

          <v-card outlined class="pa-3">
            <div v-for="item in sumExcept" :key="item.except">
              <div>
                {{
                  "Sum Everything except " +
                  item.except +
                  ", the sum is " +
                  item.data +
                  " = " +
                  Number(item.sum ? item.sum : 0).toLocaleString("id-ID")
                }}
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
  name: "Test1",
  data: () => ({
    stringnumber: "",
    number: [],
    except: "",
    sumFirstFour: 0,
    sumLastFour: 0,
    sumExcept: [],
    hasil: false,
  }),
  methods: {
    getStart() {
      this.hasil = false;
      let myNum = this.stringnumber.split(" ");
      this.number = myNum
        .filter(
          (element) =>
            !isNaN(parseInt(element)) &&
            element !== "" &&
            element > 0 &&
            element <= 1000000000
        )
        .map((element) => parseInt(element));

      // console.log("this.stringnumber", this.stringnumber);
      // console.log("myNum", myNum);
      // console.log("this.number", this.number);
    },
    hitungMinMax() {
      // Menghitung jumlah 4 elemen pertama
      this.sumFirstFour = this.number
        .slice(0, 4)
        .reduce((acc, current) => acc + current, 0);

      // Menghitung jumlah 4 elemen terakhir
      this.sumLastFour = this.number
        .slice(-4)
        .reduce((acc, current) => acc + current, 0);

      // hitung jumlah dengan elemen terkecuali
      let sumExceptTemp = [];
      for (let i = 0; i < this.number.length; i++) {
        var temp = {
          sum: 0,
          data: this.number
            .filter((element) => element !== this.number[i])
            .join(" + "),
          except: this.number[i],
        };
        temp.sum = this.number.reduce((acc, current) => {
          return current !== this.number[i] ? acc + current : acc;
        }, 0);
        sumExceptTemp.push(temp);
      }
      this.sumExcept = sumExceptTemp.filter((obj, index, self) => {
        return index === self.findIndex((o) => o.except === obj.except);
      });

      // console.log("this.sumExcept", this.sumExcept);
      this.hasil = true;
    },
  },
  created() {},
};
</script>

<style></style>

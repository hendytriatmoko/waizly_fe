<template>
  <div>
    <br />
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-card class="pa-2">
          <h2>Input time format 12 hours clock</h2>
          <div>format: hh:mm:ssAM or hh:mm:ss:PM</div>
          <v-text-field
            v-model="timeBefore"
            outlined
            class="mt-2"
            @keyup="cekFormat()"
            :rules="[timeValid || 'format belum sesuai']"
            label="time format"
          >
          </v-text-field>
          <div v-if="loadOlah">
            <h2>Format on 24 hours clock</h2>
            <v-card outlined class="pa-3">
              <div>
                {{
                  timeFormatNew.hours +
                  ":" +
                  timeFormatNew.minutes +
                  ":" +
                  timeFormatNew.seconds
                }}
              </div>
            </v-card>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Test3",
  data: () => ({
    timeBefore: "12:01:20am",
    timeAfter: "",
    timeValid: false,
    rulesTime: [
      (v) => v.length >= 10 || "format belum sesuai",
      (v) => v.length <= 10 || "format belum sesuai",
    ],
    timeFormat: {
      hours: null,
      minutes: null,
      seconds: null,
      ampm: null,
    },
    timeFormatNew: null,
    loadOlah: false,
  }),
  methods: {
    cekFormat() {
      this.loadOlah = false;
      // Memecah string waktu menjadi bagian-bagian
      let [time, period] = this.timeBefore.split(/([APMapm]{2})/);

      // Memisahkan jam, menit, dan detik
      let [hours, minutes, seconds] = time.split(":").map(Number);

      // Menentukan AM/PM
      let ampm = period ? period.toUpperCase() : period;

      if (
        hours &&
        (minutes || minutes >= 0) &&
        (seconds || seconds >= 0) &&
        ampm &&
        this.timeBefore.length == 10
      ) {
        if (
          hours > 0 &&
          hours <= 12 &&
          minutes >= 0 &&
          minutes <= 59 &&
          seconds >= 0 &&
          seconds <= 59
        ) {
          // console.log("valid");
          this.timeValid = true;
        } else {
          // console.log("tidak valid");
          this.timeValid = false;
        }
      } else {
        // console.log("tidak valid");
        this.timeValid = false;
      }
      this.isiFormat(hours, minutes, seconds, ampm);
    },
    isiFormat(hours, minutes, seconds, ampm) {
      if (this.timeValid) {
        this.timeFormat = {
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          ampm: ampm,
        };
        this.olahFormat();
      } else {
        this.timeFormat = {
          hours: null,
          minutes: null,
          seconds: null,
          ampm: null,
        };
      }
    },
    olahFormat() {
      this.timeFormatNew = JSON.parse(JSON.stringify(this.timeFormat));
      // console.log("yes jalan", this.timeFormat);
      if (this.timeFormat.ampm == "AM") {
        // console.log("ini am");
        if (this.timeFormat.hours == 12) {
          this.timeFormatNew.hours -= 12;
        }
      } else {
        // console.log("ini pm");
        if (this.timeFormat.hours != 12) {
          this.timeFormatNew.hours += 12;
        }
      }

      this.timeFormatNew.hours = this.formatJam(this.timeFormatNew.hours);
      this.timeFormatNew.minutes = this.formatJam(this.timeFormatNew.minutes);
      this.timeFormatNew.seconds = this.formatJam(this.timeFormatNew.seconds);

      this.loadOlah = true;
      // console.log("this.timeFormat", this.timeFormat);
      // console.log("this.timeFormatNew", this.timeFormatNew);
    },
    formatJam(jam) {
      return jam < 10 ? "0" + jam : jam.toString();
    },
  },
  created() {
    this.cekFormat();
  },
};
</script>

<style></style>

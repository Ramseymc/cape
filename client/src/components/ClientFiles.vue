<!-- 
          TYPE: Component
          NAME: ClientFiles
       PURPOSE: Dialog box to view files uploaded to a sale
          DATE: July 2021
          AUTH: Connor McLean, Wayne Bruton
 -->
<template>
  <v-container>
    <div class="about">
      <br /><br /><br />
      <v-row justify="center">
        <v-dialog v-model="dialogFiles" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Client Files</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].fileOTP !== null &&
                      fileData[0].fileOTP !== '' &&
                      fileData[0].fileOTP !== 'undefined'
                    "
                  >
                    <span>OTP</span>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                    v-if="
                      fileData[0].fileOTP !== null &&
                      fileData[0].fileOTP !== '' &&
                      fileData[0].fileOTP !== 'undefined'
                    "
                  >
                    <v-spacer></v-spacer>
                    <a
                      :href="`${url}${fileData[0].fileOTP}`"
                      download
                      target="_blank"
                      style="text-decoration: none"
                    >
                      <v-icon color="green">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].fileId !== null &&
                      fileData[0].fileId !== '' &&
                      fileData[0].fileId !== 'undefined'
                    "
                  >
                    <span>ID/Passport</span>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                    v-if="
                      fileData[0].fileId !== null &&
                      fileData[0].fileId !== '' &&
                      fileData[0].fileId !== 'undefined'
                    "
                  >
                    <v-spacer></v-spacer>
                    <a
                      :href="`${url}${fileData[0].fileId}`"
                      download
                      target="_blank"
                      style="text-decoration: none"
                    >
                      <v-icon color="green">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].fileBank !== null &&
                      fileData[0].fileBank !== '' &&
                      fileData[0].fileBank !== 'undefined'
                    "
                  >
                    <span>Bank Statement</span>
                  </v-col>

                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                    v-if="
                      fileData[0].fileBank !== null &&
                      fileData[0].fileBank !== '' &&
                      fileData[0].fileBank !== 'undefined'
                    "
                  >
                    <v-spacer></v-spacer>
                    <a
                      :href="`${url}${fileData[0].fileBank}`"
                      download
                      target="_blank"
                      style="text-decoration: none"
                    >
                      <v-icon color="green">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <!-- PaySlip -->
                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].filePaySlip !== null &&
                      fileData[0].filePaySlip !== '' &&
                      fileData[0].filePaySlip !== 'undefined'
                    "
                  >
                    <!-- <span>Payslip</span> -->
                    <span>Payslip</span>
                  </v-col>

                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                    v-if="
                      fileData[0].filePaySlip !== null &&
                      fileData[0].filePaySlip !== '' &&
                      fileData[0].filePaySlip !== 'undefined'
                    "
                  >
                    <li
                      v-for="(file, index) in this.arrPaySlipFiles"
                      :key="`file-${index}`"
                    >
                      <v-spacer></v-spacer>
                      <a
                        :href="`${url}${file}`"
                        download
                        target="_blank"
                        style="text-decoration: none"
                      >
                        <v-icon color="green">mdi-file-pdf-box</v-icon>
                      </a>
                    </li>
                  </v-col>

                  <!-- FICA -->
                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].fileFica !== null &&
                      fileData[0].fileFica !== '' &&
                      fileData[0].fileFica !== 'undefined'
                    "
                  >
                    <span>Proof of Address</span>
                  </v-col>

                  <ul>
                    <v-col
                      cols="4"
                      sm="4"
                      md="4"
                      v-if="
                        fileData[0].fileFica !== null &&
                        fileData[0].fileFica !== '' &&
                        fileData[0].fileFica !== 'undefined'
                      "
                    >
                      <li
                        v-for="(file, index) in this.arrFicaFiles"
                        :key="`file-${index}`"
                      >
                        <v-spacer></v-spacer>
                        <a
                          :href="`${url}${file}`"
                          download
                          target="_blank"
                          style="text-decoration: none"
                        >
                          <v-icon color="green">mdi-file-pdf-box</v-icon>
                        </a>
                      </li>
                    </v-col>
                  </ul>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeClientFiles">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// import axios from "axios";
export default {
  name: "clientfiles",

  props: {
    dialogFiles: Boolean,
    fileData: Array,
  },
  data() {
    return {
      snackbar: false,
      snackBarmessage: "Successfully Posted!!",
      url: "",
      arrFicaFiles: [],
      arrPaySlipFiles: [],
    };
  },
  methods: {
    closeClientFiles() {
      this.$emit("closeForm", false);
    },
  },
  mounted() {
    this.url = `${process.env.VUE_APP_BASEURL}/uploads/`;

    //THIS A THOUGHT - THEN POPULATE NTO A LOOP (YOU MAY NEED A FEW ANCHOR TAGS)
    let ficaSplit = this.fileData[0].fileFica;
    try {
      this.arrFicaFiles = ficaSplit.split(","); // set local array
      this.arrFicaFiles = Array.from(new Set(this.arrFicaFiles)); // removes duplicates
    } catch {
      this.arrFicaFiles.push(this.fileData[0].fileFica);
      console.log("Cannot split this item, pushing single file");
    }

    let paySlipSplit = this.fileData[0].filePaySlip;
    try {
      this.arrPaySlipFiles = paySlipSplit.split(","); // set local array
      this.arrPaySlipFiles = Array.from(new Set(this.arrPaySlipFiles)); // removes duplicates
    } catch {
      this.arrPaySlipFiles.push(this.fileData[0].filePaySlip);
      console.log("Cannot split this item, pushing single file");
    }

    setTimeout(() => {
      console.log("ClientFiles: ", this.fileData);
    }, 4000);
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
span {
  padding: 0;
  margin: 0;
  text-align: left;
}
</style>

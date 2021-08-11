<template>
  <!-- 
          TYPE: Component
          NAME: singOffOTP
       PURPOSE: Dialog form to replace the OTP with the updated final signed version
          DATE: July 2021
          AUTH: Connor McLean, Wayne Bruton
 -->
  <v-container>
    <div class="about">
      <br /><br /><br />
      <v-row justify="center">
        <v-dialog v-model="dialogFiles" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Sign Off OTP</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
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
                    <span>Signed OTP</span>
                  </v-col>

                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].fileOTP === null ||
                      fileData[0].fileOTP === '' ||
                      fileData[0].fileOTP === 'undefined'
                    "
                  >
                    <span>No OTP Document uploaded yet</span>
                  </v-col>

                  <!-- this will be a new file upload for fileOTP -->
                  <v-col
                    cols="6"
                    sm="8"
                    md="8"
                    lg="8"
                    v-if="
                      fileData[0].fileOTP !== null &&
                      fileData[0].fileOTP !== '' &&
                      fileData[0].fileOTP !== 'undefined'
                    "
                  >
                    <v-spacer></v-spacer>

                    <v-file-input
                      v-model="fileOTP"
                      label="Upload OTP"
                      accept="image/png, image/jpeg, image/bmp, image/jpg, application/pdf"
                      filled
                      hint="OTP"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeSignOffForm">
                Close
              </v-btn>
              <v-btn
                text
                @click="updateClientOTP"
                color="primary"
                elevation="3"
                outlined
                rounded
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "signoffotp",

  props: {
    dialogFiles: Boolean,
    fileData: Array,
  },
  data() {
    return {
      snackbar: false,
      snackBarmessage: "Successfully Signed Off!",
      url: "",
      arrFicaFiles: [],
      arrPaySlipFiles: [],
      fileOTP: null,
    };
  },

  methods: {
    async updateClientOTP() {
      let formData = new FormData();

      if (this.fileOTP !== null) {
        formData.append("fileOTP", this.fileOTP);
        formData.append("id", this.fileData[0].id);
      }
      await axios({
        method: "post",
        url: `${this.url}/updateClientOTP`,
        data: formData,
      }).then(
        (response) => {
          console.log(response.data);

          this.snackbar = true;
          console.log("SignOff.vue - closing form");
          // close the form after completing
          this.closeSignOffForm();
        },

        (error) => {
          console.log(error);
        }
      );
    },
    closeSignOffForm() {
      this.$emit("closeForm", false);
    },
  },
  mounted() {
    this.url = `${this.$store.state.url}`;
    console.log("signOffOTP Mounted EditData= ", this.fileData[0]);

    setTimeout(() => {
      console.log("ClientFiles: ", this.fileData);
    }, 4000);
  },
};
</script>

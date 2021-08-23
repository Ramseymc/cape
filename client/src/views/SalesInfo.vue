<template>
  <!-- 
          TYPE: View
          NAME: SalesInfo
       PURPOSE: a list of the sales with actions (update, delete, edit, view files)
          DATE: July 2021
          AUTH: Connor McLean, Wayne Bruton
 -->
  <v-container>
    <v-row justify="center">
      <div class="about">
        <br /><br /><br />

        <v-card class="mx-auto" max-width="1500" width="1000">
          <v-toolbar color="#0F0F0F" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>Sales</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              prepend-icon="mdi-magnify"
              placholder="Search"
              label="Search"
              v-model="search"
            ></v-text-field>
          </v-toolbar>

          <v-list two-line>
            <v-list-item-group active-class="blue--text" multiple>
              <template v-for="item in salesFiltered">
                <v-list-item :key="item.id">
                  <v-list-item-content>
                    <v-list-item v-if="showActions">
                      <v-btn :id="item.id" text @click="deleteItem($event)"
                        ><v-icon color="brown"> mdi-delete</v-icon></v-btn
                      >
                      <v-btn :id="item.id" text @click="editItem($event)"
                        ><v-icon :color="item.iconColor"
                          >mdi-table-edit</v-icon
                        ></v-btn
                      >

                      <v-btn :id="item.id" text @click="emailItem($event)"
                        ><v-icon :color="item.emailIconColor"
                          >mdi-email-outline</v-icon
                        ></v-btn
                      >

                      <v-btn :id="item.id" text @click="showFiles($event)"
                        ><v-icon color="black">mdi-eye</v-icon></v-btn
                      >
                    </v-list-item>
                    <div style="display: flex; justify-content: flex-start">
                      <v-list-item-subtitle
                        v-text="item.block"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="item.unit"
                      ></v-list-item-subtitle>

                      <v-list-item-subtitle
                        v-text="item.lastname"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="item.firstname"
                      ></v-list-item-subtitle>
                    </div>

                    <!-- Person Two Details -->
                    <div style="display: flex; justify-content: flex-start"
                    >
                      <v-list-item-subtitle 
                        :v-text="''"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="''"
                      ></v-list-item-subtitle>
                      
                      <v-list-item-subtitle
                        v-text="item.personTwoLastName"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="item.personTwoFirstName"
                      ></v-list-item-subtitle>
                    </div>

                    <v-stepper elevation="0">
                      <v-stepper-header>
                        <v-stepper-step
                          step="0"
                          complete
                          :id="item.id"
                          color="blue darken-2"
                          editable
                          @click="showActions = !showActions"
                        >
                        </v-stepper-step>
                        <v-stepper-step
                          step="1"
                          complete
                          :id="item.id"
                          :color="item.step1colour"
                          @click="openSignOff($event)"
                        >
                          Info Received
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                          step="2"
                          color="indigo"
                          :complete="item.signedOff > 0"
                        >
                          Signed
                        </v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step step="3" :id="item.id" color="green">
                          Awaiting confirmation
                        </v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step step="4" :id="item.id" color="green">
                          Next
                        </v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step step="5" :id="item.id" color="green">
                          Next
                        </v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step step="6" :id="item.id" color="green">
                          Next
                        </v-stepper-step>
                      </v-stepper-header>
                    </v-stepper>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
    </v-row>
    <ClientUpdate
      v-if="salesEditData.length > 0"
      :dialog="clientDialog"
      :editData="salesEditData"
      @closeForm="closeClientForm"
    />
    <ClientFiles
      v-if="clientFilesData.length > 0"
      :dialogFiles="clientFileDialog"
      :fileData="clientFilesData"
      @closeForm="closeClientFiles"
    />
    <SignOff
      v-if="signOffData.length > 0"
      :dialogFiles="signOffDialog"
      :fileData="signOffData"
      @closeForm="closeSignOffForm"
    />
  </v-container>
</template>

<script>
import axios from "axios";
let url = process.env.VUE_APP_BASEURL
import ClientUpdate from "../components/ClientUpdate.vue";
import ClientFiles from "../components/ClientFiles.vue";
import SignOff from "../components/signOffOTP.vue";

export default {
  name: "salesinfo",
  //name: "apartment",
  components: {
    ClientUpdate,
    ClientFiles,
    SignOff,
  },
  data() {
    return {
      showActions: false,
      blockValue: null, //From Dropdown
      unitValue: null,
      flatPic: require("../assets/unfurnished-flat.jpg"),
      items: [],
      blocks: [],
      clientDialog: Boolean,
      dialog: null,
      el: "#v-for-object",
      sales: [],
      // url: "",
      salesEditData: [],
      search: "",

      personTwo1: "Person",
      personTwo2: "Two",
      // client Files dialog
      clientFileDialog: false,
      clientFilesData: [],
      dialogFiles: null,

      signOffDialog: false,
      signOffData: [],
    };
  },
  computed: {
    salesFiltered() {
      if (this.search === "") {
        return this.sales;
      } else {
        return this.sales.filter((el) => {
          return (
            !this.search ||
            el.block.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            el.unit.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            el.firstname.toLowerCase().indexOf(this.search.toLowerCase()) >
              -1 ||
            el.lastname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          );
        });
      }
    },
  },
  async mounted() {
    // this.url = this.$store.state.url;
    this.initialData();
  },
  methods: {
    editItem(event) {
      let targetId = event.currentTarget.id; //Spot on
      this.salesEditData = this.sales.filter((el) => {
        return el.id === parseInt(targetId);
      });
      this.clientDialog = true;
    },
    async emailItem(event) {
      let targetId = event.currentTarget.id;
      console.log("Target Id", targetId);
      console.log("Email Item SalesEditData = ", this.sales);
      let emailInfo = this.sales.filter((el) => {
        return el.id == parseInt(targetId);
      });

      let data = {
        info: emailInfo,
      };

      await axios({
        method: "post",
        url: `${url}/sendSalesInfoEmail`,
        data: data,
      })
        .then(
          (response) => {
            console.log("CLIENT-SIDE: RESPONSE DATA: ", response.data);
            if (response.data.success === true) {
              this.initialData();
            }
          },
          (error) => {
            console.log("the Error", error);
          }
        )
        .catch((e) => {
          console.log("THERE IS AN ERROR", e);
        });
    },
    async initialData() {
      let data = {
        id: "",
      };
      await axios({
        method: "post",
        url: `${url}/getClientInfoForSalesInfo`,
        data: data,
      })
        .then(
          (response) => {
            console.log("CLIENT-SIDE: RESPONSE DATA: ", response.data[0]);

            this.sales = response.data[0];
            this.sales.forEach((el) => {
              el.fileOTPurl = `${this.url}/uploads/${el.fileOTP}`;
              // console.log("FileId", el.fileId);
              if (
                el.fileOTP === "" ||
                el.fileOTP === "undefined" ||
                el.fileId === "" ||
                el.fileId === "undefined" ||
                el.fileBank === "" ||
                el.fileBank === "undefined" ||
                el.filePaySlip === "" ||
                el.filePaySlip === "undefined" ||
                el.fileFica === "" ||
                el.fileFica === "undefined"
              ) {
                el.iconColor = "red";
                el.step1colour = "lime lighten-2";
              } else {
                el.iconColor = "green";
                el.step1colour = "green accent-3";
              }
              if (el.salesEmailSent === "Y") {
                el.emailIconColor = "green darken-1";
              } else {
                el.emailIconColor = "orange lighten-2";
              }
            });
          },
          (error) => {
            console.log("the Error", error);
          }
        )
        .catch((e) => {
          console.log("THERE IS AN ERROR", e);
        });
    },
    async deleteItem(event) {
      // get the id of clicked item (its element has an 'id' which we binded to it during the data call)
      let targetValue = event.currentTarget.id;
      let data = {
        id: targetValue,
      };
      await axios({
        method: "post",
        url: `${url}/deleteSalesRecord`,
        data: data,
      })
        .then(
          (response) => {
            console.log("CLIENT-SIDE: RESPONSE DATA: ", response.data);
            this.initialData();
          },
          (error) => {
            console.log("Error Deleting", error);
          }
        )
        .catch((e) => {
          console.log("THERE IS AN ERROR", e);
        });
    },
    async showFiles(event) {
      console.log(event);
      let targetVal = event.currentTarget.id;
      this.clientFilesData = this.sales.filter((el) => {
        return el.id === parseInt(targetVal);
      });
      console.log(  "File Dialog"    );
      this.clientFileDialog = true;
    },
    async openSignOff(event) {
      console.log(event);
      let targetVal = event.currentTarget.id;
      console.log(targetVal);
      this.signOffData = this.sales.filter((el) => {
        return el.id === parseInt(targetVal);
      });
      this.signOffDialog = true;
    },
    checkForAllFiles() {
      let files = [];
      let contains = [];
      if (this.fileOPT !== null) {
        contains.push("fileOTP");
        files.push(this.fileOPT); // append mimetype here?
      }
      if (this.fileId !== null) {
        contains.push("fileId");
        files.push(this.fileId);
      }
      if (this.fileBank !== null) {
        contains.push("fileBank");
        files.push(this.fileBank);
      }
      if (this.filePaySlip) {
        this.filePaySlip.forEach((el) => {
          contains.push("filePaySlip");
          files.push(el);
        });
      } else {
        console.log("No File");
      }

      if (this.fileFica) {
        this.fileFica.forEach((el) => {
          contains.push("fileFica");
          files.push(el);
        });
      } else {
        console.log("No File");
      }

      console.log("Check for all files, files = ", files);
    },
    closeClientForm(event) {
      this.clientDialog = event;
      this.initialData();
    },
    getClientInfo() {
      this.clientDialog = !this.clientDialog;
    },
    getClientFiles() {
      this.clientFileDialog = !this.clientFileDialog;
    },
    getSignOff() {
      this.signOffDialog = !this.signOffDialog;
    },
    closeSignOffForm(event) {
      this.signOffDialog = event;
      this.initialData();
    },
    closeClientFiles(event) {
      console.log("THE EVENT", event);
      this.clientFileDialog = event;
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="about">
    <v-row class="text-center">
      <v-col cols="10" offset="1">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          @current-items="getFiltered"
          sort-by="calories"
          dense
          class="elevation-1"
          :items-per-page="itemsPerPage"
        >
          <template v-slot:item.sold="{ item }">
            <v-chip :color="getColor(item.sold)" small dark>
              {{ item.sold }}
            </v-chip>
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Investor Input</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              Quinate Amount: {{ dataTotals }}
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                clearable
              ></v-text-field>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="1200px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!-- <v-col cols="12" sm="6" md="3">
                          <v-text-field
                          
                            v-model="editedItem.unitName"
                            label="Unit"
                          ></v-text-field>
                        </v-col> -->
                        <v-col cols="12" sm="6" md="3">
                          <v-autocomplete
                            v-model="editedItem.unitName"
                            :items="units"
                            outlined
                            dense
                            chips
                            small-chips
                            item-text="unitName"
                            clearable
                            label="Unit"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            v-model="editedItem.investor_code"
                            label="Code"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            v-model="editedItem.investor"
                            label="Investor"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            type="number"
                            v-model="editedItem.pledged"
                            label="Pledged"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-menu
                            v-model="la_email_dateMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.la_email_date"
                                label="Email Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                clearable
                                @click:clear="clearla_email_date"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              @change="la_email_dateChange"
                              v-model="la_email_date"
                              @input="la_email_dateMenu = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-menu
                            v-model="la_sign_dateMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.la_sign_date"
                                label="LA Signed Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                clearable
                                @click:clear="clearla_sign_date"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              @change="la_sign_dateChange"
                              v-model="la_sign_date"
                              @input="la_sign_dateMenu = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            type="number"
                            v-model="editedItem.attorney_inv_amount"
                            label="Momentum"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-menu
                            v-model="fica_inv_dateMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.fica_inv_date"
                                label="Momentum Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                clearable
                                @click:clear="clearfica_inv_date"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              @change="fica_inv_dateChange"
                              v-model="fica_inv_date"
                              @input="fica_inv_dateMenu = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            type="number"
                            v-model="editedItem.amount"
                            label="Quinate"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-menu
                            v-model="quinteDateMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.quinteDate"
                                label="Quinate Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                clearable
                                @click:clear="clearquinteDate"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              @change="quinteDateChange"
                              v-model="quinteDate"
                              @input="quinteDateMenu = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-autocomplete
                            v-model="editedItem.drawNumber"
                            :items="draws"
                            outlined
                            dense
                            chips
                            small-chips
                            item-text="drawNumber"
                            clearable
                            label="Draw"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            type="number"
                            v-model="editedItem.drawAdjustment"
                            label="Draw Adjust"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            type="number"
                            v-model="editedItem.trust_account_interest"
                            label="Trust Interest"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            type="number"
                            v-model="editedItem.supplementary_interest"
                            label="Supplementary Interest"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            type="number"
                            v-model="editedItem.interest_rate"
                            label="Investor Interest"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            type="number"
                            v-model="editedItem.opc_comm"
                            label="OPC Rate"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-menu
                            v-model="repayment_dateMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.repayment_date"
                                label="Repayment Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                clearable
                                @click:clear="clearrepayment_date"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              @change="repayment_dateChange"
                              v-model="repayment_date"
                              @input="repayment_dateMenu = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon color="green" class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="red" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary">
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-snackbar v-model="snackbar" top color="amber">
        {{ snackbarMessage }}
        <v-btn color="pink" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-row>
  </div>
</template>

<script>
import * as dayjs from "dayjs";
import axios from "axios";
let url = process.env.VUE_APP_BASEURL;
export default {
  name: "InvestorData",
  components: {},
  metaInfo: {
    title: "About us",
    titleTemplate: "CPC - %s",
    meta: [
      {
        name: `description`,
        content: `About CPC here.`
      }
    ],
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  data() {
    return {
      itemsPerPage: 10,
      dataTotals: 0,
      search: "",
      snackbar: false,
      snackbarMessage: "",
      dialog: false,
      dialogDelete: false,
      sold: [],
      unitType: [],
      // la_email_date: new Date().toISOString().substr(0, 10),
      la_email_date: "2020-06-04",
      la_email_dateMenu: false,
      la_sign_date: new Date().toISOString().substr(0, 10),
      la_sign_dateMenu: false,
      fica_inv_date: new Date().toISOString().substr(0, 10),
      fica_inv_dateMenu: false,
      quinteDate: new Date().toISOString().substr(0, 10),
      quinteDateMenu: false,
      repayment_date: new Date().toISOString().substr(0, 10),
      repayment_dateMenu: false,
      draws: [],
      units: [],

      headers: [
        {
          text: "Unit",
          align: "start",
          sortable: false,
          value: "unitName",
          width: 60
        },
        { text: "Code", value: "investor_code", width: 60 },
        { text: "Name", value: "investor", width: 140 },
        { text: "Pledged", value: "pledged", width: 90, align: "end" },
        // { text: "email", value: "la_email_date", width: 120 },
        // { text: "signed", value: "la_sign_date", width: 120 },

        {
          text: "Momentum",
          value: "attorney_inv_amount",
          width: 90,
          align: "end"
        },
        { text: "Inv Date", value: "fica_inv_date", width: 120 },
        {
          text: "Quinate Amount",
          value: "amount",
          width: 90,
          align: "end"
        },
        { text: "Quinate Date", value: "quinteDate", width: 120 },
        { text: "Draw", value: "drawNumber", width: 90 },
        { text: "Draw Adj", value: "drawAdjustment", width: 90 },
        // { text: "Int Rate", value: "interest_rate", width: 60 },
        // { text: "Trust Rate", value: "trust_account_interest", width: 60 },
        // {
        //   text: "Supplementary Rate",
        //   value: "supplementary_interest",
        //   width: 60
        // },
        // { text: "OPC", value: "opc_comm", width: 60 },
        { text: "Repay", value: "repayment_date", width: 120 },
        { text: "Actions", value: "actions", sortable: false, width: 100 }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        amount: 0,
        attorney_inv_amount: 0,
        development: 0,
        draw: null,
        drawAdjustment: 0,
        drawNumber: null,
        fica_inv_date: "",
        id: 0,
        interest_rate: 0,
        investor: "",
        investor_code: "",
        la_email_date: "",
        la_sign_date: "",
        opc_comm: 0,
        pledged: 0,
        quinteDate: "",
        repayment_date: "",
        supplementary_interest: 0,
        trust_account_interest: 0,
        unit: 0,
        unitName: ""
      },
      defaultItem: {
        amount: 0,
        attorney_inv_amount: 0,
        development: 0,
        draw: null,
        drawAdjustment: 0,
        drawNumber: null,
        fica_inv_date: "",
        id: 0,
        interest_rate: 0,
        investor: "",
        investor_code: "",
        la_email_date: "",
        la_sign_date: "",
        opc_comm: 0,
        pledged: 0,
        quinteDate: "",
        repayment_date: "",
        supplementary_interest: 0,
        trust_account_interest: 0,
        unit: 0,
        unitName: ""
      }
    };
  },
  mounted() {
    this.la_email_date = new Date().toISOString().substr(0, 10);
    console.log(this.la_email_date);
    this.initialData();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    search(val) {
      if (val !== "" && val !== null) {
        return (this.itemsPerPage = -1);
      } else {
        return (this.itemsPerPage = 10);
      }
    },
    dialog(val) {
      if (
        this.formTitle === "Edit Item" &&
        this.editedItem.la_email_date !== ""
      ) {
        this.la_email_date = new Date(this.editedItem.la_email_date)
          .toISOString()
          .substr(0, 10);
      }
      if (
        this.formTitle === "Edit Item" &&
        this.editedItem.la_sign_date !== ""
      ) {
        this.la_sign_date = new Date(this.editedItem.la_sign_date)
          .toISOString()
          .substr(0, 10);
      }
      if (
        this.formTitle === "Edit Item" &&
        this.editedItem.fica_inv_date !== ""
      ) {
        this.fica_inv_date = new Date(this.editedItem.fica_inv_date)
          .toISOString()
          .substr(0, 10);
      }
      if (this.formTitle === "Edit Item" && this.editedItem.quinteDate !== "") {
        this.quinteDate = new Date(this.editedItem.quinteDate)
          .toISOString()
          .substr(0, 10);
      }
      if (
        this.formTitle === "Edit Item" &&
        this.editedItem.repayment_date !== ""
      ) {
        this.repayment_date = new Date(this.editedItem.repayment_date)
          .toISOString()
          .substr(0, 10);
      }

      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  methods: {
    async initialData() {
      let data = {
        id: this.$store.state.development.id
      };
      await axios({
        method: "post",
        url: `${url}/getInvestmentData`,
        data: data
      })
        .then(
          response => {
            console.log(response.data);
            this.desserts = response.data[0];
            this.desserts.forEach(el => {
              el.amount = el.amount.toFixed(2);
              el.pledged = el.pledged.toFixed(2);
              el.attorney_inv_amount = el.attorney_inv_amount.toFixed(2);
              if (el.fica_inv_date !== null) {
                el.fica_inv_date = dayjs(el.fica_inv_date).format("YYYY-MM-DD");
              } else {
                el.fica_inv_date = "";
              }
              if (el.la_email_date !== null) {
                el.la_email_date = dayjs(el.la_email_date).format("YYYY-MM-DD");
              } else {
                el.la_email_date = "";
              }
              if (el.la_sign_date !== null) {
                el.la_sign_date = dayjs(el.la_sign_date).format("YYYY-MM-DD");
              } else {
                el.la_sign_date = "";
              }
              if (el.quinteDate !== null) {
                el.quinteDate = dayjs(el.quinteDate).format("YYYY-MM-DD");
              } else {
                el.quinteDate = "";
              }
              if (el.repayment_date !== null) {
                el.repayment_date = dayjs(el.repayment_date).format(
                  "YYYY-MM-DD"
                );
              } else {
                el.repayment_date = "";
              }
              el.interest_rate = (el.interest_rate * 100).toFixed(2);
              el.opc_comm = (el.opc_comm * 100).toFixed(2);
              el.supplementary_interest = (
                el.supplementary_interest * 100
              ).toFixed(2);
              el.trust_account_interest = (
                el.trust_account_interest * 100
              ).toFixed(2);
              el.drawAdjustment = el.drawAdjustment.toFixed(2);
            });
            this.draws = response.data[1];
            if (this.$store.state.development.id === 1) {
              this.units = response.data[2].filter(el => {
                return el.subsection <= 6 && !el.unitName.includes(".");
              });
            } else {
              this.units = response.data[2];
            }
            this.units.sort((a, b) => (a.unitName > b.unitName ? 1 : -1));
            console.log(this.units);
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // if (this.editedItem.la_email_date === null) {
      //   this.editedItem.la_email_date = ""
      //   // this.la_email_date = new Date().toISOString().substr(0,10)
      // }
      // console.log(new Date().toISOString().substr(0,10))
      // console.log(this.editedItem.la_email_date)
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    // ADD DELETE TEXT HERE
    async deleteItemConfirm() {
      let data = {
        id: this.desserts.filter((el, index) => {
          return index === this.editedIndex;
        })[0].id
      };
      await axios({
        method: "post",
        url: `${url}/deleteInvestmentData`,
        data: data
      })
        .then(
          response => {
            if (response.data.affectedRows === 1) {
              this.snackbarMessage = "Record succesfully Deleted!";
              this.desserts.splice(this.editedIndex, 1);
              this.closeDelete();
            } else {
              this.snackbarMessage = "Error, please try again";
            }
            this.snackbar = true;
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedItem.drawNumber !== null) {
        let draw = this.draws.filter(el => {
          return el.drawNumber === this.editedItem.drawNumber;
        });
        this.editedItem.draw = draw[0].id;
      }
      let unit = this.units.filter(el => {
        return el.unitName === this.editedItem.unitName;
      });
      this.editedItem.unit = unit[0].id;

      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        await axios({
          method: "post",
          url: `${url}/editInvestmentData`,
          data: this.editedItem
        })
          .then(
            response => {
              console.log(response.data);
              if (response.data.affectedRows === 1) {
                this.snackbarMessage = "Input succesfully updated!";
              } else {
                this.snackbarMessage = "Error, please try again";
              }
              this.snackbar = true;
            },
            error => {
              console.log(error);
            }
          )
          .catch(e => {
            console.log(e);
          });
      } else {
        this.editedItem.development = this.$store.state.development.id;
        await axios({
          method: "post",
          url: `${url}/insertinvestorDetails`,
          data: this.editedItem
        })
          .then(
            response => {
              console.log(response.data);
              if (response.data.affectedRows === 1) {
                this.snackbarMessage = "Input succesfully updated!";
                this.desserts.push(this.editedItem);
                this.initialData();
              } else {
                this.snackbarMessage = "Error, please try again";
              }
              this.snackbar = true;
            },
            error => {
              console.log(error);
            }
          )
          .catch(e => {
            console.log(e);
          });
      }
      this.close();
    },
    getColor(sold) {
      if (sold === "Yes") return "green";
      else return "orange";
    },
    getFiltered(e) {
      if (this.search === "" || this.search === null) {
        this.dataTotals = this.convertToString(
          this.desserts.reduce((prev, curr) => {
            return parseFloat(curr.amount) + prev;
          }, 0)
        );
      } else {
        this.dataTotals = this.convertToString(
          e.reduce((prev, curr) => {
            return parseFloat(curr.amount) + prev;
          }, 0)
        );
      }
    },
    clearla_email_date() {
      this.editedItem.la_email_date = "";
      this.la_email_date = new Date().toISOString().substr(0, 10);
    },
    clearla_sign_date() {
      this.editedItem.la_sign_date = "";
      this.la_sign_date = new Date().toISOString().substr(0, 10);
    },
    clearfica_inv_date() {
      this.editedItem.fica_inv_date = "";
      this.fica_inv_date = new Date().toISOString().substr(0, 10);
    },
    clearquinteDate() {
      this.editedItem.quinteDate = "";
      this.quinteDate = new Date().toISOString().substr(0, 10);
    },
    clearrepayment_date() {
      this.editedItem.repayment_date = "";
      this.repayment_date = new Date().toISOString().substr(0, 10);
    },
    la_email_dateChange() {
      this.editedItem.la_email_date = this.la_email_date;
    },
    la_sign_dateChange() {
      this.editedItem.la_sign_date = this.la_sign_date;
    },
    fica_inv_dateChange() {
      this.editedItem.fica_inv_date = this.fica_inv_date;
    },
    quinteDateChange() {
      this.editedItem.quinteDate = this.quinteDate;
    },
    repayment_dateChange() {
      this.editedItem.repayment_date = this.repayment_date;
    }
  }
};
</script>

<style scoped>
.corner {
  background-color: orange;
  cursor: pointer;
}
svg {
  height: 80vh;
}
rect:hover {
  cursor: pointer;
}
path:hover {
  cursor: pointer;
}
</style>

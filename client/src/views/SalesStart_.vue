<template>
  <div>
    <v-row class="text-center">
      <v-col cols="10" offset="1" mb-4>
        <v-card class="mx-auto" max-width="100vw">
          <v-img height="350" :src="flatPic"></v-img>

          <v-card-title>Choose your options</v-card-title>

          <v-card-text>
            <div style="display: flex">
              <v-autocomplete
                style="margin-right: 8px;"
                v-model="blockValue"
                :items="blocks"
                dense
                filled
                item-text="subsectionName"
                label="Choose Block"
                @change="chooseUnit"
              ></v-autocomplete>
              <!-- </div>
        <div> -->
              <v-autocomplete
                style="margin-left: 8px;"
                v-model="unitValue"
                :items="items"
                dense
                filled
                item-text="unitName"
                label="Choose Unit"
                @change="unitChosen"
              ></v-autocomplete>
              <v-btn
                style="margin-left:20px;"
                v-if="blockValue && unitValue"
                text
                @click="getClientInfo"
                color="primary"
                elevation="3"
                large
                outlined
                rounded
                >Create Sale</v-btn
              >
            </div>
          </v-card-text>
          <!-- <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              v-if="blockValue && unitValue"
              text
              @click="getClientInfo"
              color="primary"
              elevation="3"
              large
              outlined
              rounded
              >Create Sale</v-btn
            >

            <v-spacer></v-spacer>
          </v-card-actions> -->
          <v-divider class="mx-4"></v-divider>
        </v-card>
      </v-col>
    </v-row>
    <ClientInfo
      v-if="clientDialog"
      :blockValue="blockValue"
      :unitValue="unitValue"
      :dialog="clientDialog"
      :planType="planType"
      :unitId="unitId"
      @closeForm="closeClientForm"
    />
  </div>
</template>

<script>
import axios from "axios";
import ClientInfo from "../components/ClientInfo.vue";
let url = process.env.VUE_APP_BASEURL;

export default {
  name: "salesstart",
  components: {
    ClientInfo
  },
  data() {
    return {
      blockValue: null, //From Dropdown
      unitValue: null,
      unitId: null,
      flatPic: require("../assets/unfurnished-flat.jpg"),
      items: [],
      blocks: [],
      clientDialog: false,
      planType: ""
    };
  },
  async mounted() {
    let data = {
      id: this.$store.state.development.id
    };
    await axios({
      method: "post",
      // method: "get",
      url: `${url}/getblocksforoptionsA`,
      // url: `${url}/ooo`,
      data: data
    })
      .then(
        response => {
          console.log(response.data);
          this.blocks = response.data.filter(el => {
            return el.subsectionName !== "Common Area";
          });

          console.log(this.blocks);
        },
        error => {
          console.log("the Error", error);
        }
      )
      .catch(e => {
        console.log("THERE IS AN ERROR", e);
      });
  },
  methods: {
    unitChosen() {
      let unitId = this.items.filter(el => {
        return el.unitName === this.unitValue;
      })[0].id;
      console.log(unitId);
      this.unitId = unitId;
    },
    closeClientForm(event) {
      this.clientDialog = event;
    },
    async getClientInfo() {
      let data = {
        unitValue: this.unitValue
      };
      await axios({
        method: "post",
        url: `${url}/getUnitPlanTypes`,
        data: data
      }).then(
        response => {
          console.log(response.data[0].unit_type);
          this.planType = response.data[0].unit_type;
          this.clientDialog = !this.clientDialog;

          // little box saying 'Posted Successfully
          // this.snackbar = true;
          // close the form after completing
          // this.closeClientInfo();
        },
        error => {
          console.log(error);
        }
      );
    },
    async chooseUnit() {
      let filteredData = this.blocks.filter(el => {
        return el.subsectionName === this.blockValue;
      });
      let data = {
        id: this.$store.state.development.id,
        subsection: filteredData[0].id,
        subsectionName: filteredData[0].subsectionName
        //subsectionName:
      };
      console.log(data);
      console.log(process.env.VUE_APP_BASEURL);
      // console.log("filteredData for getting subsectionname:", filteredData),
      await axios({
        method: "post",
        url: `${url}/getAvailableUnits`,
        data: data
      })
        .then(
          response => {
            let filteredData = response.data.filter(el => {
              return el.unitName.substring(2, 1) !== ".";
            });
            this.items = filteredData;
            console.log("XXXX", this.items);
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.img {
  padding: 20px 20px 20px 0;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.centerimg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
}
.auto {
  padding: 5px 5px 5px 5px;
}
</style>

<template>
  <!-- 
          TYPE: View
          NAME: SalesStart
       PURPOSE: Landing Page for 'Sales'
          DATE: July 2021
          AUTH: Connor McLean, Wayne Bruton
 -->
  <div>
    <ClientInfo
      :blockValue="blockValue"
      :unitValue="unitValue"
      :dialog="clientDialog"
      @closeForm="closeClientForm"
    />

    <v-card class="mx-auto" max-width="100vw">
      <v-img height="350" :src="flatPic"></v-img>

      <v-card-title>Choose your options</v-card-title>

      <v-card-text>
        <div style="display: flex">
          <v-autocomplete
            v-model="blockValue"
            :items="blocks"
            dense
            filled
            item-text="subsectionName"
            label="Choose Block"
            @change="chooseUnit"
          ></v-autocomplete>
        </div>
        <div>
          <v-autocomplete
            v-model="unitValue"
            :items="items"
            dense
            filled
            item-text="unitName"
            label="Choose Unit"
          ></v-autocomplete>
        </div>
      </v-card-text>
      <v-card-actions>
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
      </v-card-actions>
      <v-divider class="mx-4"></v-divider>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import ClientInfo from "../components/ClientInfo.vue";

export default {
  name: "salesstart",
  components: {
    ClientInfo,
  },
  data() {
    return {
      blockValue: null, //From Dropdown
      unitValue: null,
      flatPic: require("../assets/unfurnished-flat.jpg"),
      items: [],
      blocks: [],
      clientDialog: false,
    };
  },
  async mounted() {
    let data = {
      id: this.$store.state.development.id,
    };
    await axios({
      method: "post",
      url: `http://localhost:3000/getblocksForOptions`,
      data: data,
    })
      .then(
        (response) => {
          console.log(response.data);
          this.blocks = response.data;
          console.log(response.data);
        },
        (error) => {
          console.log("the Error", error);
        }
      )
      .catch((e) => {
        console.log("THERE IS AN ERROR", e);
      });
  },
  methods: {
    closeClientForm(event) {
      this.clientDialog = event;
    },
    getClientInfo() {
      this.clientDialog = !this.clientDialog;
    },
    async chooseUnit() {
      let filteredData = this.blocks.filter((el) => {
        return el.subsectionName === this.blockValue;
      });
      let data = {
        id: this.$store.state.development.id,
        subsection: filteredData[0].id,
        subsectionName: filteredData[0].subsectionName,
        //subsectionName:
      };
      console.log("filteredData for getting subsectionname:", filteredData),
        await axios({
          method: "post",
          url: `http://localhost:3000/getUnitsForOptions`,
          data: data,
        })
          .then(
            (response) => {
              let filteredData = response.data.filter((el) => {
                return el.unitName.substring(2, 1) !== ".";
              });
              this.items = filteredData;
            },
            (error) => {
              console.log(error);
            }
          )
          .catch((e) => {
            console.log(e);
          });
    },
  },
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

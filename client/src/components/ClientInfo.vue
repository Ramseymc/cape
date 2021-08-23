<template>
  <v-container>
    <div class="about">
      <br /><br /><br />
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="900px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Client Info</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="4" offset="1" row>
                    <v-radio-group v-model="person" @change="naturalTrust">
                      <v-radio
                        label="Person"
                        color="black"
                        value="person"
                      ></v-radio>
                      <v-radio
                        label="Company / Trust"
                        color="red darken-3"
                        value="Legal"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" offset="1">
                    <v-radio-group
                      v-model="buyers"
                      row
                      v-if="person === 'person'"
                    >
                      <v-radio
                        label="1 Person"
                        color="black"
                        value="1"
                      ></v-radio>
                      <v-radio
                        label="2 People"
                        color="red darken-3"
                        value="2"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <hr color="red" />
                  </v-col>
                  <!-- <div style="width: 100%;"> -->
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-if="person === 'Legal'"
                    style="background-color: lightgrey"
                  >
                    <v-text-field
                      label="Trust / Company name*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-if="person === 'Legal'"
                    style="background-color: lightgrey"
                  >
                    <v-text-field
                      label="Trust / Company Number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    style="background-color: lightgrey"
                  >
                    <v-radio-group
                      v-model="marital"
                      row
                      v-if="person === 'person'"
                    >
                      <v-radio
                        label="Not married"
                        color="black"
                        value="Not married"
                      ></v-radio>
                      <v-radio
                        label="Married - ANC"
                        color="red darken-3"
                        value="Married - ANC"
                      ></v-radio>
                      <v-radio
                        label="Married - COP"
                        color="red darken-3"
                        value="Married - COP"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    style="background-color: lightgrey"
                  >
                    <v-text-field
                      v-model="firstName"
                      :label="firstNameLabel"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    style="background-color: lightgrey"
                  >
                    <v-text-field
                      v-model="lastName"
                      :label="lastNameLabel"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" style="background-color: lightgrey">
                    <v-text-field
                      v-model="iDNumber"
                      label="ID Number*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" style="background-color: lightgrey">
                    <v-text-field
                      v-model="email"
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6" style="background-color: lightgrey">
                    <span>Mobile - Required</span>
                    <VuePhoneNumberInput
                      id="phoneNumber1"
                      v-model="mobile.phoneNumber"
                      ref="mobile"
                      clearable
                      default-country-code="ZA"
                      show-code-on-list
                      :only-countries="['ZA']"
                      @update="mobileStuff"
                    />
                  </v-col>
                  <v-col cols="6" style="background-color: lightgrey">
                    <span>Landline</span>
                    <VuePhoneNumberInput
                      id="phoneNumber2"
                      v-model="landline.phoneNumber"
                      ref="landline"
                      clearable
                      default-country-code="ZA"
                      show-code-on-list
                      :only-countries="['ZA']"
                      @update="mobileStuff"
                    />
                  </v-col>
                  <v-col cols="6" style="background-color: lightgrey">
                    <v-textarea
                      v-model="postaladdress"
                      label="Postal Address"
                      required
                      placeholder="Postal Address"
                      rows="4"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="6" style="background-color: lightgrey">
                    <v-textarea
                      v-model="residentialAddress"
                      label="Residential Address"
                      required
                      placeholder="Residential Address"
                      rows="4"
                    ></v-textarea>
                  </v-col>

                  <!-- </div> -->
                  <v-col
                    cols="12"
                    v-if="
                      (person === 'person' && buyers === '2') ||
                      person === 'Legal'
                    "
                  >
                    <hr color="red" />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-if="
                      (person === 'person' && buyers === '2') ||
                      person === 'Legal'
                    "
                    style="background-color: lightblue"
                  >
                    <span v-if="person === 'person' && buyers === '2'"
                      ><strong>2nd Purchaser</strong></span
                    >
                    <span v-else-if="person === 'Legal'"
                      ><strong>Trustee / Director</strong></span
                    >
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    style="background-color: lightblue"
                    v-if="person === 'person' && buyers === '2'"
                  >
                    <v-radio-group
                      v-model="personTwoMarital"
                      row
                      v-if="person === 'person' && buyers === '2'"
                    >
                      <v-radio
                        label="Not married"
                        color="black"
                        value="Not married"
                      ></v-radio>
                      <v-radio
                        label="Married - ANC"
                        color="red darken-3"
                        value="Married - ANC"
                      ></v-radio>
                      <v-radio
                        label="Married - COP"
                        color="red darken-3"
                        value="Married - COP"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    v-if="
                      (person === 'person' && buyers === '2') ||
                      person === 'Legal'
                    "
                    style="background-color: lightblue"
                  >
                    <v-text-field
                      v-model="personTwoFirstName"
                      :label="firstNameLabel"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    v-if="
                      (person === 'person' && buyers === '2') ||
                      person === 'Legal'
                    "
                    style="background-color: lightblue"
                  >
                    <v-text-field
                      v-model="personTwoLastName"
                      :label="lastNameLabel"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                    v-if="
                      (person === 'person' && buyers === '2') ||
                      person === 'Legal'
                    "
                    style="background-color: lightblue"
                  >
                    <v-text-field
                      v-model="personTwoIDNumber"
                      label="ID Number*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                    v-if="
                      (person === 'person' && buyers === '2') ||
                      person === 'Legal'
                    "
                    style="background-color: lightblue"
                  >
                    <v-text-field
                      v-model="personTwoEmail"
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="6"
                    v-if="
                      (person === 'person' && buyers === '2') ||
                      person === 'Legal'
                    "
                    style="background-color: lightblue"
                  >
                    <span>Mobile - Required</span>
                    <VuePhoneNumberInput
                      id="phoneNumber1"
                      v-model="personTwoMobile"
                      ref="mobile"
                      clearable
                      default-country-code="ZA"
                      show-code-on-list
                      :only-countries="['ZA']"
                      @update="mobileStuff"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    v-if="
                      (person === 'person' && buyers === '2') ||
                      person === 'Legal'
                    "
                    style="background-color: lightblue"
                  >
                    <span>Landline</span>
                    <VuePhoneNumberInput
                      id="phoneNumber2"
                      v-model="personTwoLandline"
                      ref="landline"
                      clearable
                      default-country-code="ZA"
                      show-code-on-list
                      :only-countries="['ZA']"
                      @update="mobileStuff"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    v-if="
                      (person === 'person' && buyers === '2') ||
                      person === 'Legal'
                    "
                    style="background-color: lightblue"
                  >
                    <v-textarea
                      v-model="personTwoPostalAddress"
                      label="Postal Address"
                      required
                      placeholder="Postal Address"
                      rows="4"
                    ></v-textarea>
                  </v-col>
                  <v-col
                    cols="6"
                    v-if="
                      (person === 'person' && buyers === '2') ||
                      person === 'Legal'
                    "
                    style="background-color: lightblue"
                  >
                    <v-textarea
                      v-model="personTwoResidentialAddress"
                      label="Residential Address"
                      required
                      placeholder="Residential Address"
                      rows="4"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <hr color="red" />
                  </v-col>

                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <v-switch
                      v-model="cashDeal"
                      :label="cashDeal ? 'Cash Deal' : 'Bonded'"
                    ></v-switch>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <label v-if="cashDeal"> <b> Balance </b> </label>

                    <label v-if="!cashDeal">
                      <b> Bond Amount Required </b>
                    </label>
                    <v-text-field
                      v-model="balanceRem"
                      type="number"
                      value="0"
                      :label="cashDeal ? Balance : BondAmountRequired"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Deposit</b></strong>
                    <v-text-field
                      v-model="deposit"
                      type="number"
                      value="0"
                      label="Deposit"
                      required
                      @change="changePricing"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Deposit Date Paid</b></strong>
                    <v-text-field
                      v-model="depositDate"
                      type="date"
                      value="0"
                      label="Deposit Date"
                      required
                    ></v-text-field>
                  </v-col>

                  <!-- second row -->
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <v-text-field
                      v-model="basePriceStr"
                      label="Base Price"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <v-text-field
                      v-model="parkingPriceStr"
                      label="Parking"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <v-text-field
                      v-model="extrasStr"
                      label="Extras"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow;"
                  >
                    <v-text-field
                      v-model="deductionsStr"
                      label="Deductions"
                      readonly
                    ></v-text-field>
                  </v-col> -->
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <v-text-field
                      v-model="contractPriceStr"
                      label="Contract Price"
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <v-btn @click="changePricing">ReCalc</v-btn>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Mood</b></strong>
                    <v-radio-group v-model="mood">
                      <v-radio
                        label="Allure"
                        color="black"
                        value="Mood1"
                      ></v-radio>
                      <v-radio
                        label="Serene"
                        color="red darken-3"
                        value="Mood2"
                      ></v-radio>
                    </v-radio-group>
                    <small>*indicates required field</small>
                  </v-col>
                  <v-col
                    cols="6"
                    sm="6"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Flooring</b></strong>
                    <v-radio-group v-model="flooring">
                      <v-radio
                        label="Tiles"
                        color="black"
                        value="Tiles"
                      ></v-radio>
                      <v-radio
                        label="Laminate"
                        color="red darken-3"
                        value="Laminate"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>

                  <v-col
                    cols="4"
                    sm="4"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Floorplan</b></strong>
                    <v-radio-group v-model="floorplan" row>
                      <v-radio
                        v-for="plan in plans"
                        :key="plan"
                        :label="plan"
                        color="black"
                        :value="plan"
                        @click="changePriceIfEnclosed"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Parking</b></strong>
                    <v-text-field
                      v-model="parkingNumber"
                      type="number"
                      value="0"
                      min="0"
                      max="4"
                      label="Additional Parking"
                      required
                      @input="changePricing"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Bay N0:</b></strong>
                    <v-text-field label="Bay Number"></v-text-field>
                  </v-col>
                  <!-- <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow;"
                  >
                     <strong><b>Extras</b></strong>
                    <v-text-field
                      v-model="extras"
                      type="number"
                      value="0"
                      
                      label="Extras"
                      required
                      @change="changePricing"
                    ></v-text-field>
                  </v-col> -->

                  <!-- <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow;"
                  >
                    <strong><b>Deductions</b></strong>
                    <v-text-field
                      v-model="deductions"
                      type="number"
                      value="0"
                      label="Deductions"
                      required
                      @change="changePricing"
                    ></v-text-field>
                  </v-col> -->

                  <!-- row end -->
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <v-switch
                      v-model="gasStove"
                      @change="changePriceIfGas"
                      :label="gasStove ? 'Gas Stove' : 'Standard Stove'"
                    ></v-switch>
                  </v-col>

                  <v-col
                    cols="2"
                    sm="2"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong
                      ><b>Beds: {{ this.beds }}</b></strong
                    >
                    <!-- <v-text-field
                      v-model="beds"
                      type="number"
                      value="0"
                      min="0"
                      max="4"
                      label="Beds"
                      required
                      @change="changePricing"
                    ></v-text-field> -->
                  </v-col>
                  <v-col
                    cols="2"
                    sm="2"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong
                      ><b>Bath: {{ this.bath }}</b></strong
                    >
                    <!-- <v-text-field
                      v-model="bath"
                      type="number"
                      value="0"
                      min="0"
                      max="4"
                      label="Bath"
                      required
                      @change="changePricing"
                    ></v-text-field> -->
                  </v-col>
                  <v-col
                    cols="2"
                    sm="2"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Garden Size:</b></strong>
                    <v-text-field
                      v-model="gardenSize"
                      type="number"
                      value="0"
                      min="0"
                      max="4"
                      label="Garden Size"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Garden Number:</b></strong>
                    <v-text-field
                      v-model="gardenNumber"
                      type="text"
                      label="Garden Number"
                      required
                    ></v-text-field>
                  </v-col>
                  <!-- row end -->

                  <v-col
                    cols="12"
                    sm="12"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Notes</b></strong>
                    <v-textarea label="Notes" rows="2"></v-textarea>
                  </v-col>

                  <v-col cols="12">
                    <hr color="red" />
                  </v-col>
                  <label> File Uploads </label>
                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="fileOTP"
                      label="OTP"
                      accept="image/png, image/jpeg, image/bmp, image/jpg, application/pdf"
                      filled
                      hint="OTP"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="fileId"
                      label="Upload ID/Passport Photo"
                      filled
                      hint="Upload ID/Passport Photo"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="fileFica"
                      label="Proof of address documentation"
                      filled
                      multiple
                      hint="Proof of address documentation"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="fileBank"
                      label="Upload Bank Statements"
                      filled
                      hint="Upload Bank Statements"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="filePaySlip"
                      label="Upload latest 3 months payslips"
                      filled
                      multiple
                      hint="Upload latest 3 months payslips"
                      persistent-hint
                    ></v-file-input>

                    <v-col cols="12">
                      <hr color="red" />
                    </v-col>
                    <label v-if="person === 'person' && buyers === '2'">
                      Person 2 File Uploads
                    </label>

                    <label v-if="person === 'Legal'">
                      Director / Trustee Uploads
                    </label>
                    <!-- <v-col cols="12" sm="12" 
                  v-if="(person === 'person' && buyers === '2') ||
                        person === 'Legal'
                    ">
                    <v-file-input
                      v-model="p2fileOTP"
                      label="OTP"
                      accept="image/png, image/jpeg, image/bmp, image/jpg, application/pdf"
                      filled
                      hint="OTP"
                      persistent-hint
                    ></v-file-input>
                  </v-col> -->
                    <v-col
                      cols="12"
                      sm="12"
                      v-if="
                        (person === 'person' && buyers === '2') ||
                        person === 'Legal'
                      "
                    >
                      <v-file-input
                        v-model="personTwoFileID"
                        label="Upload ID/Passport Photo"
                        filled
                        hint="Upload ID/Passport Photo"
                        persistent-hint
                      ></v-file-input>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      v-if="
                        (person === 'person' && buyers === '2') ||
                        person === 'Legal'
                      "
                    >
                      <v-file-input
                        v-model="personTwoFileFica"
                        label="Proof of address documentation"
                        filled
                        multiple
                        hint="Proof of address documentation"
                        persistent-hint
                      ></v-file-input>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      v-if="
                        (person === 'person' && buyers === '2') ||
                        person === 'Legal'
                      "
                    >
                      <v-file-input
                        v-model="personTwoFileBank"
                        label="Upload Bank Statements"
                        filled
                        hint="Upload Bank Statements"
                        persistent-hint
                      ></v-file-input>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      v-if="
                        (person === 'person' && buyers === '2') ||
                        person === 'Legal'
                      "
                    >
                      <v-file-input
                        v-model="personTwoFilePaySlip"
                        label="Upload latest 3 months payslips"
                        filled
                        multiple
                        hint="Upload latest 3 months payslips"
                        persistent-hint
                      ></v-file-input>
                    </v-col>
                  </v-col>
                  <v-col cols="6" style="background-color: lightsalmon">
                    <v-text-field
                      v-model="salesAgent"
                      label="Sales Agent"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6" style="background-color: lightsalmon">
                    <span>Mobile</span>
                    <VuePhoneNumberInput
                      v-model="salesAgentPhone"
                      id="phoneNumber3"
                      ref="mobile"
                      clearable
                      default-country-code="ZA"
                      show-code-on-list
                      :only-countries="['ZA']"
                    />
                  </v-col>
                </v-row>
              </v-container>

              <!-- <p>
                These documents pertain to persons applying in their personal
                capacity.
              </p>
              <p>
                Purchases being made in the name of a company / trust or any
                other legal person may require additional information and
                uploads. The Bond Originator will decide thereon.
              </p> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                @click="closeClientInfo"
                color="primary"
                elevation="3"
                outlined
                rounded
              >
                Close
              </v-btn>
              <v-btn
                text
                @click="insertClientData"
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
      <v-snackbar top v-model="snackbar">
        {{ snackBarmessage }}
        <v-btn color="red" text @click="snackbar = false"> Close </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
let url = process.env.VUE_APP_BASEURL;

export default {
  name: "salesstart",
  components: {
    VuePhoneNumberInput,
  },

  props: {
    dialog: Boolean,
    blockValue: String,
    unitValue: String,
    unitId: Number,
    planType: String,
  },

  data() {
    return {
      gardenSize: "",
      gardenNumber: "",
      beds: "",
      bath: "",
      balanceRem: "",
      deposit: "",
      depositDate: "",

      BondAmountRequired: "",
      Balance: "",

      gasStove: false,
      gasStoveCost: 0,
      cashDeal: false,

      contractPrice: 0,
      contractPriceStr: "",
      basePrice: 0,
      basePriceStr: "",
      parkingNumber: 0,
      parking: 0,
      parkingPrice: 25000,
      parkingPriceStr: "",
      extras: 0,
      extrasStr: "",
      deductions: 0,
      deductionsStr: "",
      notes: "",

      marital: "Not married",
      firstNameLabel: "First Name*",
      lastNameLabel: "Last Name*",
      person: "person",
      buyers: "1",
      snackbar: false,
      snackBarmessage: "Successfully Posted!!",
      firstName: "",
      lastName: "",
      iDNumber: "",
      email: "",
      bankName: "",
      accountNumber: "",
      accountType: "",
      postaladdress: "",
      residentialAddress: "",
      mood: "Mood1",
      flooring: "Laminate",
      floorplan: "",
      floorPlans: [],
      floorplancost: 0,
      plans: [],
      fileOTP: null,
      fileId: null,
      fileBank: null,
      filePaySlip: null,
      fileFica: null,
      salesAgent: "",
      salesAgentPhone: "",
      personTwoFirstName: "",
      personTwoLastName: "",
      personTwoIDNumber: "",
      personTwoEmail: "",
      personTwoBankName: "",
      personTwoAccountNumber: "",
      personTwoAccountType: "",
      personTwoFileID: null,
      personTwoFileBank: null,
      personTwoFilePaySlip: null,
      personTwoFileFica: null,
      personTwoMarital: "",
      personTwoMobile: "",
      personTwoLandline: "",
      personTwoPostalAddress: "",
      personTwoResidentialAddress: "",
      //url: "",
      mobile: {
        countryCode: "ZA",
        isValid: false,
        phoneNumber: "",
      },
      landline: {
        countryCode: "ZA",
        isValid: false,
        phoneNumber: "",
      },
    };
  },
  // created() {
  //   console.log("AWESOME AWESOMENESS",this.planType)
  // },
  async mounted() {
    // planType is undefined
    this.plans = this.planType.split(",");
    console.log("platype=", this.planType);
    this.floorplan = this.planType[0];
    console.log("AWESOME AWESOMENESS planType = ", this.planType);
    let data = {
      unit: this.unitId,
    };
    await axios({
      method: "post",
      url: `${url}/getSalesDataForSale`,
      data: data,
    }).then(
      (response) => {
        console.log(response.data);
        this.floorPlans = response.data[1];
        this.basePrice = response.data[0][0].base_price;

        this.parking = response.data[0][0].parking;
        this.extras = response.data[0][0].extras;
        this.deductions = response.data[0][0].deductions;

        this.beds = response.data[0][0].beds;
        this.bath = response.data[0][0].bath;

        this.deductionsStr = this.convertToString(this.deductions);
        this.basePriceStr = this.convertToString(this.basePrice);
        this.parkingPriceStr = this.convertToString(this.parking);
        this.extrasStr = this.convertToString(this.extras);
        console.log(
          "ZZZZ",
          this.basePrice + this.parking + this.extras - this.deductions
        );
        this.contractPrice =
          this.basePrice + this.parking + this.extras - this.deductions;
        this.contractPriceStr = this.convertToString(this.contractPrice);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  methods: {
    convertToString(factor) {
      //CONVERTS NUMBERS TO STRING WTH "R"
      if (typeof factor === "string" || factor instanceof String) {
        factor = parseFloat(factor);
      }
      let str = factor.toFixed(2).toString().split("").reverse();
      if (str.length > 9) {
        str.splice(9, 0, " ");
      }
      if (str.length > 6) {
        str.splice(6, 0, " ");
      }
      str.reverse().unshift("R");
      str = str.join("");
      return str;
    },
    changePriceIfEnclosed() {
      console.log(this.floorplan);
      let chosenFloorplan = this.floorPlans.filter((el) => {
        return this.floorplan === el.plan;
      });
      console.log(chosenFloorplan[0]);
      this.floorplancost = chosenFloorplan[0].enclosedValue;
      this.finaliseCosts();
    },
    changePriceIfGas() {
      console.log(this.gasStove);
      if (this.gasStove) {
        this.gasStoveCost = 12000;
      } else {
        this.gasStoveCost = 0;
      }
      this.finaliseCosts();
    },
    finaliseCosts() {
      this.extras = this.floorplancost + this.gasStoveCost;
      this.extrasStr = this.convertToString(this.extras);
        this.contractPrice =
        parseFloat(this.basePrice) +
        parseFloat(this.parking) +
        parseFloat(this.extras) -
        parseFloat(this.deductions);
      this.contractPriceStr = this.convertToString(this.contractPrice);
    },
    changePricing() {
      this.parking =
        parseFloat(this.parkingNumber) * parseFloat(this.parkingPrice);
      this.deductionsStr = this.convertToString(this.deductions);
      // this.basePriceStr = this.convertToString(this.basePrice)
      this.parkingPriceStr = this.convertToString(this.parking);
      this.finaliseCosts()

      // this.extrasStr = this.convertToString(this.extras);
      // console.log(this.basePrice + this.parking + this.extras - this.deductions)
      // this.contractPrice =
      //   parseFloat(this.basePrice) +
      //   parseFloat(this.parking) +
      //   parseFloat(this.extras) -
      //   parseFloat(this.deductions);
      // this.contractPriceStr = this.convertToString(this.contractPrice);

    },
    naturalTrust() {
      console.log("AWESOME", this.planType);
      if (this.person === "Legal") {
        this.firstNameLabel = "Director / Trustee First Name*";
        this.lastNameLabel = "Director / Trustee Last Name*";
      } else {
        this.firstNameLabel = "First Name*";
        this.lastNameLabel = "Last Name*";
      }
      this.buyers = "1";
    },
    mobileStuff(event) {
      // this.mobileResults = event;
      console.log("landline", event);
      console.log("mobile", event);
    },

    closeClientInfo() {
      this.$emit("closeForm", false);
    },
    async insertClientData() {
      // console.log(this.firstName);
      let files = [];
      let contains = [];
      if (this.fileOTP !== null) {
        contains.push("fileOTP");
        files.push(this.fileOTP); // append mimetype here?
      }
      if (this.fileId !== null) {
        contains.push("fileId");
        files.push(this.fileId);
      }
      if (this.personTwoFileID !== null) {
        contains.push("personTwoFileID");
        files.push(this.personTwoFileID);
      }

      if (this.fileBank !== null) {
        contains.push("fileBank");
        files.push(this.fileBank);
      }
      if (this.personTwoFileBank !== null) {
        contains.push("personTwoFileBank");
        files.push(this.personTwoFileBank);
      }

      if (this.filePaySlip) {
        this.filePaySlip.forEach((el) => {
          contains.push("filePaySlip");
          files.push(el);
        });
      } else {
        console.log("No File");
      }
      if (this.personTwoFilePayslip) {
        this.personTwoFilePayslip.forEach((el) => {
          contains.push("personTwoFilePayslip");
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
      if (this.personTwoFileFica) {
        this.personTwoFileFica.forEach((el) => {
          contains.push("personTwoFileFica");
          files.push(el);
        });
      } else {
        console.log("No File");
      }

      let formData = new FormData();
      for (var x = 0; x < files.length; x++) {
        formData.append("documents", files[x]);
      }
      console.log("formData = ", formData);
      // formData.append("documents", files)
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("iDNumber", this.iDNumber);
      formData.append("marital", this.marital);
      formData.append("email", this.email);
      formData.append("bankName", this.bankName);
      formData.append("accountNumber", this.accountNumber);
      formData.append("accountType", this.accountType);
      formData.append("block", this.blockValue);
      formData.append("unit", this.unitValue);
      formData.append("mood", this.mood);
      formData.append("flooring", this.flooring);
      formData.append("floorplan", this.floorplan);
      formData.append("mobile", this.mobile.phoneNumber);
      formData.append("landline", this.landline.phoneNumber);
      formData.append("postalAddress", this.postaladdress);
      formData.append("residentialAddress", this.residentialAddress);

      // personTwo
      formData.append("personTwoFirstName", this.personTwoFirstName);
      formData.append("personTwoLastName", this.personTwoLastName);
      formData.append("personTwoIDNumber", this.personTwoIDNumber);
      formData.append("personTwoMarital", this.personTwoMarital);
      formData.append("personTwoEmail", this.personTwoEmail);
      formData.append("personTwoBankName", this.personTwoBankName);
      formData.append("personTwoAccountNumber", this.personTwoAccountNumber);
      formData.append("personTwoAccountType", this.personTwoAccountType);
      // formData.append("personTwoFileID", this.personTwoFileID);
      // formData.append("personTwoFileBank", this.personTwoFileBank);
      // formData.append("personTwoFilePaySlip", this.personTwoFilePaySlip);
      // formData.append("personTwoFileFica", this.personTwoFileFica);
      formData.append("personTwoMobile", this.personTwoMobile);
      formData.append("personTwoLandline", this.personTwoLandline);
      formData.append("personTwoPostalAddress", this.personTwoPostalAddress);
      formData.append(
        "personTwoResidentialAddress",
        this.personTwoResidentialAddress
      );
      // personTwoFirstName, personTwoLastName, personTwoIDNumber, personTwoEmail, personTwoBankName, personTwoAccountNumber, personTwoAccountType, personTwoFileID, personTwoFileBank, personTwoFilePaySlip, personTwoFileFica, personTwoMobile, personTwoLandline, personTwoPostalAddress, personTwoResidentialAddress

      formData.append("salePerson", this.person);
      formData.append("saleBuyers", this.buyers);

      if (this.person === "person") {
        if (this.buyers === "1") {
          formData.append("saleType", "NaturalSingle");
        }
        if (this.buyers === "2") {
          formData.append("saleType", "NaturalMultiple");
        }
      } else {
        formData.append("saleType", "Legal");
      }

      formData.append("salesAgent", this.salesAgent);
      formData.append("salesAgentPhone", this.salesAgentPhone);

      // append the saleType from (person)
      formData.append("contains", contains);

      formData.append("contract_price", this.contractPrice);
      formData.append("base_price", this.basePrice);
      formData.append("parking", this.parking);
      formData.append("extras", this.extras);
      formData.append("deductions", this.deductions);
      formData.append("notes", this.notes);

      formData.append("cashDeal", this.cashDeal);
      formData.append("balanceRem", this.balanceRem);

      formData.append("deposit", this.deposit);
      formData.append("depositDate", this.depositDate);
      formData.append("gasStove", this.gasStove);

      // formdata append enclosedBalcony - how?

      console.log("files:", files);
      console.log("contains:", contains);

      await axios({
        method: "post",
        url: `${url}/createClient`,
        data: formData,
      }).then(
        (response) => {
          console.log(response.data);
          // little box saying 'Posted Successfully
          this.snackbar = true;
          // close the form after completing
          this.closeClientInfo();
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
.test {
  background-color: lightgoldenrodyellow;
}
</style>


  <!-- 
          TYPE: Component
          NAME: ClientUpdate
       PURPOSE: Dialog form to maintain(update) a client sales 
          DATE: July 2021
          AUTH: Connor McLean, Wayne Bruton
 -->
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
                    <v-radio-group v-model="editData[0].salePerson" @change="naturalTrust">
                      <v-radio
                        label="Individual"
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
                      v-model="editData[0].saleBuyers"
                      row
                      v-if="editData[0].salePerson === 'person'"
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
                    v-if="editData[0].salePerson === 'Legal'"
                    style="background-color: lightgrey;"
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
                    v-if="editData[0].salePerson === 'Legal'"
                    style="background-color: lightgrey;"
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
                    style="background-color: lightgrey;"
                  >
                    <v-radio-group
                      v-model="editData[0].marital"
                      row
                      v-if="editData[0].salePerson === 'person'"
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
                    style="background-color: lightgrey;"
                  >
                    <v-text-field
                      v-model="editData[0].firstname"
                      :label="firstNameLabel"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    style="background-color: lightgrey;"
                  >
                    <v-text-field
                      v-model="editData[0].lastname"
                      :label="lastNameLabel"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" style="background-color: lightgrey;">
                    <v-text-field
                      v-model="editData[0].iDNumber"
                      label="ID Number*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" style="background-color: lightgrey;">
                    <v-text-field
                      v-model="editData[0].email"
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6" style="background-color: lightgrey;">
                    <span>Mobile - Required</span>
                    <VuePhoneNumberInput
                      id="phoneNumber1"
                      v-model="editData[0].mobile"
                      ref="mobile"
                      clearable
                      default-country-code="ZA"
                      show-code-on-list
                      :only-countries="['ZA']"
                      @update="mobileStuff"
                    />
                  </v-col>
                  <v-col cols="6" style="background-color: lightgrey;">
                    <span>Landline</span>
                    <VuePhoneNumberInput
                      id="phoneNumber2"
                      v-model="editData[0].landline"
                      ref="landline"
                      clearable
                      default-country-code="ZA"
                      show-code-on-list
                      :only-countries="['ZA']"
                      @update="mobileStuff"
                    />
                  </v-col>
                  <v-col cols="6" style="background-color: lightgrey;">
                    <v-textarea
                      v-model="editData[0].postalAddress"
                      label="Postal Address"
                      required
                      placeholder="Postal Address"
                      rows="4"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="6" style="background-color: lightgrey;">
                    <v-textarea
                      v-model="editData[0].residentialAddress"
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
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal'
                    "
                  >
                    <hr color="red" />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-if="
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal'
                    "
                    style="background-color: lightblue;"
                  >
                    <span v-if="editData[0].salePerson === 'person' && buyers === '2'"
                      ><strong>2nd Purchaser</strong></span
                    >
                    <span v-else-if="editData[0].salePerson === 'Legal'"
                      ><strong>Trustee / Director</strong></span
                    >
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    style="background-color: lightblue;"
                    v-if="editData[0].salePerson === 'person' && editData[0].saleBuyers === '2'"
                  >
                    <v-radio-group
                      v-model="editData[0].personTwoMarital"
                      row
                      v-if="editData[0].salePerson === 'person' && editData[0].saleBuyers === '2'"
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
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal'
                    "
                    style="background-color: lightblue;"
                  >
                    <v-text-field
                      v-model="editData[0].personTwofirstName"
                      :label="this.twoPersonFirstNameLabel"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    v-if="
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal'
                    "
                    style="background-color: lightblue;"
                  >
                    <v-text-field
                      v-model="editData[0].personTwoLastName"
                      :label="this.twoPersonLastNameLabel"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                    v-if="
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal'
                    "
                    style="background-color: lightblue;"
                  >
                    <v-text-field
                      v-model="editData[0].personTwoIDNumber"
                      label="ID Number*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                    v-if="
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal'
                    "
                    style="background-color: lightblue;"
                  >
                    <v-text-field
                      v-model="editData[0].personTwoEmail"
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="6"
                    v-if="
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal'
                    "
                    style="background-color: lightblue;"
                  >
                    <span>Mobile - Required</span>
                    <VuePhoneNumberInput
                      id="phoneNumber1"
                      v-model="editData[0].personTwoMobile"
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
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal'
                    "
                    style="background-color: lightblue;"
                  >
                    <span>Landline</span>
                    <VuePhoneNumberInput
                      id="phoneNumber2"
                      v-model="editData[0].personTwoLandline"
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
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal'
                    "
                    style="background-color: lightblue;"
                  >
                    <v-textarea
                      v-model="editData[0].personTwoPostalAddress"
                      label="Postal Address"
                      required
                      placeholder="Postal Address"
                      rows="4"
                    ></v-textarea>
                  </v-col>
                  <v-col
                    cols="6"
                    v-if="
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal'
                    "
                    style="background-color: lightblue;"
                  >
                    <v-textarea
                      v-model="editData[0].personTwoResidentialAddress"
                      label="Residential Address"
                      required
                      placeholder="Residential Address"
                      rows="4"
                    ></v-textarea>
                  </v-col>

                  <v-col cols="12">
                    <hr color="red" />
                  </v-col>

                  <!-- First row with the Bond/cash switch and the deposit amount and date  -->
                  <v-col
                    cols="5"
                    sm="5"
                    style="background-color: lightgoldenrodyellow;">
                    <v-radio-group v-model="editData[0].saleType">
                      <v-radio
                        label="Bonded"
                        color="black"
                        value="Bonded"
                      ></v-radio>
                      <v-radio
                        label="Cash"
                        color="green darken-3"
                        value="Cash"
                      ></v-radio>
                    </v-radio-group>
                    <!-- <v-switch
                      v-model="editData[0].cashDeal"
                    
                      :label="editData[0].cashDeal ? 'Cash Deal' : 'Bonded'"
                    ></v-switch> -->
                  </v-col>
                  <v-col
                    cols="7"
                    sm="7"
                    style="background-color: lightgoldenrodyellow;"
                  >
                    <strong><b>Floorplan</b></strong>
                    <v-radio-group v-model="editData[0].floorplan" row>
                      <v-radio
                        v-for="plan in plans"
                        :key="plan"
                        :label="plan"
                        color="black"
                        :value="plan"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <!-- end row 1 -->
                  <!-- Base Price -->
                  <v-col
                    cols="4"
                    sm="4"
                    style="background-color: lightgoldenrodyellow;"
                  >
                    <v-text-field
                      v-model="editData[0].base_price"
                      label="Base Price"
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="4"
                    sm="4"
                    style="background-color: lightgoldenrodyellow;">
                    <strong><b>Deposit</b></strong>
                    <v-text-field
                      v-model="editData[0].deposit"
                      type="number"
                      value="0"
                      
                      label="Deposit"
                      required
                      @change="changePricing"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    style="background-color: lightgoldenrodyellow;">
                    <strong><b>Deposit Date Paid</b></strong>
                    <v-text-field
                      v-model="editData[0].depositDate"
                      type="date"
                      value="0"
                      
                      label="Deposit Date"
                      required
                    ></v-text-field>

                  </v-col>
                  <!-- end row -->

                  <!-- parking, extras, and contract_price-->
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow;"
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
                    style="background-color: lightgoldenrodyellow;"
                  >
                    <v-text-field
                      v-model="extrasStr"
                      label="Extras"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow;"
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
                    style="background-color: lightgoldenrodyellow;">
                    
                    <label v-if="(editData[0].saleType === 'Cash')"> <b> Balance </b> </label>

                    <label v-if="(editData[0].saleType) === 'Bonded'"> <b> Bond Amount Required </b> </label>
                    <v-text-field
                      v-model="editData[0].balanceRem"
                      type="number"
                      value="0"
                      
                      :label="editData[0].cashDeal ? Balance : BondAmountRequired"
                      required                      
                    ></v-text-field>

                  </v-col>
                  <!-- end row 3  -->
                  <!-- Standard Extras -->
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow;">
                    <strong><b>Garden Number:</b></strong>
                    <v-text-field
                      v-model="editData[0].gardenNumber"
                      type="text"
                      
                      label="Garden Number"
                      required
            
                    ></v-text-field>
                  </v-col>  
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow;">
                    <strong><b>Garden Size:</b></strong>
                    <v-text-field
                      v-model="editData[0].gardenSize"
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
                    style="background-color: lightgoldenrodyellow;"
                  >
                    <strong><b>Bay N0:</b></strong>
                    <v-text-field 
                    label="Bay Number" 
                    v-model="editData[0].bayNo">
                    </v-text-field>
                  </v-col>
                  <!--  Gas stove-->
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                  <strong><b>Stove:</b></strong>
                    <v-radio-group v-model="editData[0].gasStove">
                      <v-radio
                        label="Standard"
                        color="black"
                        value="0"
                        @click="changePriceIfGas"
                      ></v-radio>
                      <v-radio
                        label="Gas"
                        color="orange darken-3"
                        value="1"
                        @click="changePriceIfGas"
                      ></v-radio>
                    </v-radio-group>
                    <!-- <v-switch
                      v-model="gasStove"
                      @change="changePriceIfGas"
                      :label="gasStove ? 'Gas Stove' : 'Standard Stove'"
                    ></v-switch> -->
                  </v-col>
                  
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong><b>Parking</b></strong>
                    <v-text-field
                      v-model="editData[0].parkingNumber"
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
                    cols="2"
                    sm="2"
                    style="background-color: lightgoldenrodyellow;">
                    <strong><b>Beds: {{editData[0].beds}}</b></strong>
                   
                  </v-col>
                  <v-col
                    cols="2"
                    sm="2"
                    style="background-color: lightgoldenrodyellow;">
                    <strong><b>Bath: {{editData[0].bath}}</b></strong>
                   
                  </v-col>
                  <v-col
                    cols="2"
                    sm="2"
                    style="background-color: lightgoldenrodyellow"
                  >
                    <strong
                      ><b>Enclosed Balcony: {{ editData[0].enclosedBalcony }}</b></strong
                    >                  
                  </v-col>
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  > 
                  <strong><b>Spare Room:</b></strong>
                    <v-radio-group v-model="editData[0].spareRoom">
                      <v-radio
                        label="Bathroom"
                        color="black"
                        value="bathroom"                        
                      ></v-radio>
                      <v-radio
                        label="Study"
                        color="orange darken-3"
                        value="study">
                      </v-radio>
                    </v-radio-group>
                    <!-- <v-switch
                      v-model="gasStove"
                      @change="changePriceIfGas"
                      :label="gasStove ? 'Gas Stove' : 'Standard Stove'"
                    ></v-switch> -->
                  </v-col>   
                 
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow;"
                  >
                    <strong><b>Mood</b></strong>
                    <v-radio-group v-model="editData[0].mood">
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
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow;"
                  >
                    <strong><b>Flooring</b></strong>
                    <v-radio-group v-model="editData[0].flooring">
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
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                  
                  <strong><b>Additional Extras</b></strong>
                  <v-text-field
                      v-model="editData[0].additionalExtras"
                      type="text"                                        
                      label="Extras"                                            
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="3"
                    style="background-color: lightgoldenrodyellow"
                  >
                  <strong><b>Additional Cost</b></strong>
                  <v-text-field
                      v-model="editData[0].additionalExtrasCost"
                      type="number"
                      value="0"
                      min="0"                      
                      label="Cost"
                      
                      @change="addAdditionalExtras"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    style="background-color: lightgoldenrodyellow;"
                  >
                    <strong><b>Notes</b></strong>
                    <v-textarea label="Notes" rows="2" v-model="editData[0].notes"></v-textarea>
                  </v-col>

                  <v-col cols="12">
                    <hr color="red" />
                  </v-col>
                  <label v-if="(editData[0].salePerson === 'person')"> 
                   <pre> File Uploads  </pre>
                  </label>

                  

                    <label v-if="editData[0].salePerson === 'Legal'"> Trust / Company Uploads </label>

                  <v-col cols="12" sm="12"
                      v-if="!(editData[0].fileOTP.length) || editData[0].fileOTP === 'undefined'"
                  >
                    <v-file-input
                      v-model="editData[0].fileOTP"
                      label="OTP"
                      accept="image/png, image/jpeg, image/bmp, image/jpg, application/pdf"
                      filled
                      hint="OTP"
                      persistent-hint
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" sm="12"
                      v-if="!(editData[0].fileId.length) || editData[0].fileId === 'undefined'"
                  >
                    <v-file-input
                      v-model="fileId"
                      label="Upload ID/Passport Photo"
                      filled
                      hint="Upload ID/Passport Photo"
                      persistent-hint
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" sm="12"
                  v-if="!(editData[0].fileFica.length) || editData[0].fileFica === 'undefined'"
                  >
                    <v-file-input
                      v-model="fileFica"
                      label="Proof of address documentation"
                      filled
                      multiple
                      hint="Proof of address documentation"
                      persistent-hint
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" sm="12"
                  v-if="!(editData[0].fileBank.length) || editData[0].fileBank === 'undefined'"
                  >
                    <v-file-input
                    v-if="editData[0].salePerson !== 'Legal'"
                      v-model="fileBank"
                      label="Upload Bank Statements"
                      filled
                      hint="Upload Bank Statements"
                      persistent-hint
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" sm="12" 
                  v-if="!(editData[0].filePaySlip.length) || editData[0].filePaySlip === 'undefined'" >
                    <v-file-input
                    v-if="editData[0].salePerson !== 'Legal'"
                      v-model="filePaySlip"
                      label="Upload latest 3 months payslips"
                      filled
                      multiple
                      hint="Upload latest 3 months payslips"
                      persistent-hint
                    ></v-file-input>
                  </v-col>


                  <v-col cols="12">
                    <hr color="red" />
                  </v-col>
                  <label v-if="
                      (editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') 
                    "> Person 2 File Uploads </label>

                    <label v-if="editData[0].salePerson === 'Legal'"> Trustee Uploads </label>
                  <!-- <v-col cols="12" sm="12" 
                  v-if="(person === 'person' && buyers === '2') ||
                        person === 'Legal'
                    ">
                    <v-file-input
                      v-model="editData[0].personTwoFileID"
                      label="OTP"
                      accept="image/png, image/jpeg, image/bmp, image/jpg, application/pdf"
                      filled
                      hint="OTP"
                      persistent-hint
                    ></v-file-input>
                  </v-col> -->
                  <div  v-if="(editData[0].salePerson === 'person' && editData[0].saleBuyers === '2') ||
                        editData[0].salePerson === 'Legal' ">

                    <v-col cols="12" sm="12" v-if="!(editData[0].personTwoFileID.length) || editData[0].personTwoFileID === 'undefined'">>
                      <v-file-input
                        
                        v-model="personTwoFileID"
                        label="Upload ID/Passport Photo"
                        filled
                        hint="Upload ID/Passport Photo"
                        persistent-hint
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="12"  v-if="!(editData[0].personTwoFileFica.length) || editData[0].personTwoFileFica === 'undefined'"> >
                      <v-file-input
                        
                        v-model="personTwoFileFica"
                        label="Proof of address documentation"
                        filled
                        multiple
                        hint="Proof of address documentation"
                        persistent-hint
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="12" v-if="!(editData[0].personTwoFileBank.length) || editData[0].personTwoFileBank === 'undefined'">>
                      <v-file-input
                    
                        v-model="personTwoFileBank"
                        label="Upload Bank Statements"
                        filled
                        hint="Upload Bank Statements"
                        persistent-hint
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="12" v-if="!(editData[0].personTwoFilePaySlip.length) || editData[0].personTwoFilePaySlip === 'undefined'">>
                      <v-file-input
                        
                        v-model="personTwoFilePaySlip"
                        label="Upload latest 3 months payslips"
                        filled
                        multiple
                        hint="Upload latest 3 months payslips"
                        persistent-hint
                      ></v-file-input>
                    </v-col>
                  </div>
                    <v-col
                    cols="6"
                    style="background-color: lightsalmon;"
                  >
                    <v-text-field
                      v-model="editData[0].salesAgent"
                      label="Sales Agent"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="6" 
                    style="background-color: lightsalmon;"
                  >
                    <span>Mobile</span>
                    <VuePhoneNumberInput
                      id="phoneNumber3"
                      v-model="editData[0].salesAgentPhone"
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
                @click="updateClientData"
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
let url = process.env.VUE_APP_BASEURL
import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
  name: "salesstart",
  components: {
    VuePhoneNumberInput,
  },
  props: {
    dialog: Boolean,
    editData: Array,
    unitId: Number
  },

  data() {
    return {
      snackbar: false,
      snackBarmessage: "Successfully Updated!!",
      
      //url: "",
      fileOPT: null,
      fileId: null,
      fileBank: null,
      filePaySlip: null,
      fileFica: null,
      firstNameLabel: "First Name*",
      lastNameLabel: "Last Name*",
      twoPersonFirstNameLabel: "2nd Person First Name",
      twoPersonLastNameLabel: "2nd Person Last Name",
      person: "",
      buyers: 0,
      plans: [],
      floorPlans: [],
      floorplancost: 0,

      bayNo: "",
      spareRoom: "",

      BondAmountRequired: "Bond Amount Required",
      BalanceRemaining: "Balance Remaining",

      additionalExtras: "",
      additionalExtrasCost: 0,
      enclosedBalcony: 0,      

      gasStove: "0",
      gasStoveCost: 0,
      cashDeal: false,

      gardenSize: "",
      gardenNumber: "",
      beds: "",
      bath: "",
      balanceRem: "",
      deposit: "",
      depositDate: "",

      Balance: "",

      saleType: "",

    
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
      // tiles: "Tiles",
      // mood: "Mood 1"
      // finalEditData: {}
    };
    
  },
  
  beforeMount() {
    //console.log("BEFORE MOUNTED");
    //  this.finalEditData = this.editData[0]
    this.editData.forEach((el) => {
      el.id = el.id.toString();
      if (el.flooring === "") {
        el.flooring = "Tiles";
      }
      if (el.mood === "") {
        el.mood = "Mood1";
      }
    });
    console.log("Before Mount in ClientUpdate", this.editData)
    this.buyers = this.editData[0].saleBuyers
    this.person = this.editData[0].salePerson
    this.plans = this.editData[0].unit_type.split(",");
    this.parkingPriceStr = this.convertToString(this.editData[0].parking);
    this.extrasStr = this.convertToString(this.editData[0].extras);
    this.contractPriceStr = this.convertToString(this.editData[0].contract_price);

  },

  //async mounted() {
   // console.log("%%%%%",this.editData)
    

  //  let data = {
  //     id: this.editData[0].unitId
  //  }
  //   await axios({
  //     method: "post",
  //     url: `${url}/getSalesDataForSale`,
  //     data: data,
  //   }).then(
  //     (response) => {
  //       console.log(response.data[0]);
  //       this.editData[0].basePrice = response.data[0].base_price

  //       this.parking = response.data[0].parking;
  //       this.editData[0].parking = response.data[0].parking;
  //       this.extras = response.data[0].extras;
  //       this.editData[0].extras = response.data[0].extras;
  //       this.deductions = response.data[0].deductions;
  //       this.editData[0].deductions = response.data[0].deductions;
  //       this.editData[0].contractPrice = response.data[0].contract_price;

  //       // just use this logic, its all there. only one contract_price needed 
  //       this.editData[0].beds = response.data[0].beds;
  //       this.editData[0].bath = response.data[0].bath;

  //       //this.deductionsStr = this.convertToString(this.deductions);
  //       this.editData[0].basePriceStr = this.convertToString(this.editData[0].basePrice);
  //       this.editData[0].parkingPriceStr = this.convertToString(this.editData[0].parking);
  //       this.editData[0].extrasStr = this.convertToString(this.editData[0].extras);
  //       console.log("ZZZZ",
  //         this.editData[0].basePrice + this.editData[0].parking + this.editData[0].extras - this.editData[0].deductions
  //       );
  //       // this.editData[0].contractPrice = this.convertToString(this.editData[0].contractPrice);
  //       //   this.editData[0].basePrice + 
  //       //   this.editData[0].parking + 
  //       //   this.editData[0].extras +
  //       //   this.editData[0].additionalExtrasCost - 
  //       //   this.editData[0].deductions;
  //       this.editData[0].contractPriceStr = this.convertToString(this.editData[0].contractPrice);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
   //},

  methods: {
    closeClientInfo() {
      this.$emit("closeForm", false);
    },
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
    addAdditionalExtras() {
      console.log(this.editData[0].additionalExtrasCost);
      this.finaliseCosts();
    },
    changePriceIfEnclosed() {
      console.log(this.editData[0].floorplan);
      let chosenFloorplan = this.editData[0].floorPlans.filter((el) => {
        return this.floorplan === el.plan;
      });
      console.log(chosenFloorplan[0]);
      this.floorplancost = chosenFloorplan[0].enclosedValue;
      this.enclosedBalcony = chosenFloorplan[0].enclosedBalcony
      this.finaliseCosts();
    },
    changePriceIfGas() {
      console.log("XXXXX",this.editData[0].gasStove);
      if (parseInt(this.editData[0].gasStove) === 1) {
        this.gasStoveCost = 12000;
      } else {
        this.gasStoveCost = 0;
      }
      this.finaliseCosts();
    },
    finaliseCosts() {
      this.editData[0].extras = this.floorplancost + this.gasStoveCost;
      this.extrasStr = this.convertToString(this.editData[0].extras);
        this.contractPrice =
        parseFloat(this.editData[0].basePrice) +
        parseFloat(this.editData[0].parking) +
        parseFloat(this.editData[0].extras) +
        parseFloat(this.editData[0].additionalExtrasCost) -
        parseFloat(this.editData[0].deductions);
      this.editData[0].contractPriceStr = this.convertToString(this.contractPrice);
    },
    changePricing() {
      this.editData[0].parking = parseFloat(this.parkingNumber) * parseFloat(this.parkingPrice);
      this.editData[0].deductionsStr = this.convertToString(this.deductions);
      // this.basePriceStr = this.convertToString(this.basePrice)
      this.parkingPriceStr = this.convertToString(this.editData[0].parking);
      // this.editData[0].extrasStr = this.convertToString(this.extras);
      // // console.log(this.basePrice + this.parking + this.extras - this.deductions)
      // this.editData[0].contractPrice =
      //   parseFloat(this.basePrice) + parseFloat(this.parking) + parseFloat(this.extras) - parseFloat(this.deductions);
      // this.editData[0].contractPriceStr = this.convertToString(this.contractPrice);
      this.finaliseCosts();
    },
    naturalTrust() {
      console.log("AWESOME", this.planType);
      if (this.person === "Legal") {
        this.firstNameLabel = "Director / Trustee First Name*";
        this.twoPersonFirstNameLabel = "2nd Director / Trustee First Name*";
        this.lastNameLabel = "Director / Trustee Last Name*";
        this.twoPersonLastNameLabel = "2nd Director / Trustee Last Name*";
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
    async updateClientData() {
      // get the form fields data to pass to salesRoutes /updateClient
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
          contains.push("personTwoFilePaySlip");
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

      // console.log("contains", contains);
      // console.log("files", files);
      let formData = new FormData();

      for (var x = 0; x < files.length; x++) {
        formData.append("documents", files[x]);
        //console.log("FileInfo::: ", files[x]);
      }
      formData.append("firstName", this.editData[0].firstname);
      formData.append("lastName", this.editData[0].lastname);
      formData.append("iDNumber", this.editData[0].iDNumber);
      formData.append("marital", this.marital);
      formData.append("email", this.editData[0].email);
      formData.append("bankName", this.editData[0].bankName);
      formData.append("accountNumber", this.editData[0].accountNumber);
      formData.append("accountType", this.editData[0].accountType);
      formData.append("block", this.editData[0].block);
      formData.append("unit", this.editData[0].unit);
      formData.append("mood", this.editData[0].mood);
      formData.append("flooring", this.editData[0].flooring);
      formData.append("floorplan", this.editData[0].floorplan);
      formData.append("mobile", this.editData[0].mobile);
      formData.append("landline", this.editData[0].landline);
      formData.append("postalAddress", this.editData[0].postalAddress);
      formData.append("residentialAddress", this.editData[0].residentialAddress);
      formData.append("contract_price", this.editData[0].contractPrice);
      // contractPrice: 0,      
      // contractPriceStr: "",
      formData.append("personTwoFirstName", this.editData[0].personTwoFirstName);
      formData.append("personTwoLastName", this.editData[0].personTwoLastName);
      formData.append("personTwoIDNumber", this.editData[0].personTwoIDNumber);
      formData.append("personTwoMarital", this.editData[0].personTwoMarital);
      formData.append("personTwoEmail", this.editData[0].personTwoEmail);
      formData.append("personTwoBankName", this.editData[0].personTwoBankName);
      formData.append("personTwoAccountNumber", this.editData[0].personTwoAccountNumber);
      formData.append("personTwoAccountType", this.editData[0].personTwoAccountType);
      formData.append("personTwoMobile", this.editData[0].personTwoMobile);
      formData.append("personTwoLandline", this.editData[0].personTwoLandline);
      formData.append("personTwoPostalAddress", this.editData[0].personTwoPostalAddress);
      formData.append("personTwoResidentialAddress", this.editData[0].personTwoResidentialAddress);
      
      formData.append("base_price", this.editData[0].basePrice);
    
      formData.append("parking", this.editData[0].parking);
 
      formData.append("extras", this.editData[0].extras);
   
      formData.append("deductions", this.editData[0].deductions);

      formData.append("salesAgent", this.editData[0].salesAgent);
      formData.append("salesAgentPhone", this.editData[0].salesAgentPhone);

      formData.append("contains", contains);    
      formData.append("id", this.editData[0].id);

      formData.append("notes", this.editData[0].notes);

      formData.append("cashDeal", this.editData[0].cashDeal);
      formData.append("balanceRem", this.editData[0].balanceRem);

      formData.append("deposit", this.editData[0].deposit);
      formData.append("depositDate", this.editData[0].depositDate);
      formData.append("gasStove", this.editData[0].gasStove);
      formData.append("additionalExtras", this.editData[0].additionalExtras);
      formData.append("additionalExtrasCost", this.editData[0].additionalExtrasCost);
      formData.append("notes", this.editData[0].notes);
      formData.append("spareRoom", this.editData[0].spareRoom);
      formData.append("enclosedBalcony", this.editData[0].enclosedBalcony);

     // additionalExtras,additionalExtrasCost,notes,spareRoom,enclosedBalcony,saleType,gasStove

      formData.append("saleType", this.editData[0].saleType)

      //formData.append("gasStove", this.editData[0].enclosedBalcony);

      formData.append("salePerson", this.person);
      formData.append("saleBuyers", this.buyers);

      // bayNo

      await axios({
        method: "post",
        url: `${url}/updateClient`,
        data: formData,
      }).then(
        (response) => {
          console.log(response.data);

          this.snackbar = true;
          //console.log("ClientUpdate.vue - closing form");
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

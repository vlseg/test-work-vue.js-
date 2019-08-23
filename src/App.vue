<template>
<b-container fluid>
      <b-row>
        <b-col class="logo" md="1">
          <img src="..\src\assets\logo_ad.png" alt="logo" />
        </b-col>
        <b-col md="10" class="d-flex justify-content-center">
          <h2>Garage</h2>
        </b-col>


        <b-col md="1">
          <button v-on:click="logout" id="logout" class="btn btn-primary">Вихід</button>
        </b-col>

        <b-col md="1">
          <details-table />
        </b-col>

  </b-row>
     
  <router-view>
   
  </router-view>
  </b-container>
</template>
<script>
//import { authenticationService } from "@/_services";
import { router } from "@/_helpers";
import axios from 'axios';

import DetailsTable from './TableDetails/DetailsTable';
import { Component } from '@fullcalendar/core';
export default  {
  name: "app",
  data() {
    return {
      //currentUser: JSON.parse(localStorage.getItem('currentUser'))
    };
    // Component({
    // })
  },
  components:{
      DetailsTable
  },
  computed: {},
  created() {
        //this.$store.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.$store.currentUser) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.currentUser.token
            //return router.push('/disposition');
        }
  },
  methods: {
    logout(){
      localStorage.removeItem('currentUser');
      this.$store.currentUser = null;
      delete axios.defaults.headers.common['Authorization']
      this.$router.push('/')
    },
  }
};
</script>
<style lang='scss'>
.logo {
  display: flex;
padding: 5px;
}

#logout{
  display: flex;
  //padding: 10px;
  margin: 5px;
}
</style>
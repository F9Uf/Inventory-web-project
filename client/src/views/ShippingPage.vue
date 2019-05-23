<template>
    <layout>
        <h3>Shipping</h3>
        <the-table :header="header" :body="body"  @onDelete="deleteData" id="ShippingID"></the-table>
    </layout>
</template>

<script>
import layout from './LAYOUT'
import TheTable from '../components/TheTable'
import { $api} from '../service/api'

export default {
    components: {
    layout, TheTable
  },
  data() {
    return {
      header: ['Shipping ID', 'Car ID','Driver'],
      body: []
    }
  },
  create() {
    
  },
  methods: {
    deleteData (value) {
      console.log(value)
    },
    // waiting for api
    // fatchShipping () {
    //   $api({path: '/shipping', method: 'get'})
    //   .then( dara => {
    //     this.body = data.result
    //   })
    // }
  }

}
</script>

<style>

</style>

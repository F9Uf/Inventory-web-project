<template>
    <layout>
        <h3>Shipping</h3>
        <the-table :header="header" :body="body"  @onDelete="deleteData" @onEdit="editData" id="ShippingID"></the-table>

        <the-modal v-if="showModal" @close="showModal = false">
          <template v-slot:header>
            <h5>Edit Shipping</h5>
          </template>
          <template v-slot:body>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem nisi voluptates iste labore recusandae? Ad eum in adipisci impedit veritatis exercitationem esse, debitis, incidunt dolor laborum, quia eveniet quo quasi!
          </template>
        </the-modal>

    </layout>
</template>

<script>
import layout from './LAYOUT'
import TheTable from '../components/TheTable'
import TheModal from '../components/TheModal'
import { $api} from '../service/api'

export default {
    components: {
    layout, TheTable, TheModal
  },
  data() {
    return {
      header: ['Shipping ID', 'Car ID','Driver'],
      body: [{
        shipid:'0001',carid: '00000002', driver: '00001'
      }],
      showModal: false
    }
  },
  create() {
    // this.fetchShipping()
  },
  methods: {
    deleteData (value) {
      console.log(value)
    },
    editData (value) {
      this.showModal = true
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

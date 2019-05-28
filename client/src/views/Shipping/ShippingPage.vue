<template>
    <layout>
        <h3>Shipping</h3>
        <the-table :header="header" :body="body"  @onDelete="deleteData" @onEdit="editData" id="shippingID"></the-table>
        <h5 v-if="!body">No Shipping</h5>
        <the-modal v-if="showModal" @close="showModal = false" @update="updateData">
          <template v-slot:header>
            <h5>Edit Shipping</h5>
          </template>
          <template v-slot:body>
            <div class="form-row">
              <div class="col">
                <label >Shipping ID</label>
                <input type="number" class="form-control" v-model="editShipping.shippingID">
              </div>
              <div class="col">
                <label >Car ID</label>
                <input type="number" class="form-control" v-model="editShipping.carID">
              </div>
              <div class="col">
                <label >Driver</label>
                <input type="number" class="form-control" v-model="editShipping.employeeID">
              </div>
            </div>
          </template>
        </the-modal>

    </layout>
</template>

<script>
import layout from '../LAYOUT'
import TheTable from '@/components/TheTable'
import TheModal from '@/components/TheModal'
import { $api} from '@/service/api'

export default {
    components: {
    layout, TheTable, TheModal
  },
  data() {
    return {
      header: ['Shipping ID', 'Car ID','Driver'],
       body:null
      // { shipid:'0001',carid: '00000002', driver: '00001'
      // }
      ,
      editShipping: {},
      showModal: false
    }
  },
  create() {
    this.fetchShipping()
  },
  methods: {
    deleteData (value) {
      $api({ path: `/shipping/${value}`, method: `delete`})
      .then(data => {
        this.fetchShipping()
      })
      console.log(value)
    },
    editData (value) {
      this.showModal = true
      this.editShipping = JSON.parse(stringtify(this.body.fliter(e => e.shippingID ===value)[0]))
    },
    // waiting for api
    fatchShipping () {
      $api({path: '/shipping', method: 'get'})
      .then( dara => {
        this.body = data.result
      })
    },
    updateData () {
      $api({ path: `/shipping/${this.editShipping.shippingID}`, method: 'put', data: this.editShipping})
      .then( data => {
        this.showModal = false
        this.fetchShipping()
      })
    }

  }

}
</script>

<style>

</style>

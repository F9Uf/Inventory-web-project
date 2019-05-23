<template>
  <layout>
    <h3>Supplier Information</h3><br>

    <the-table v-if="body.length !== 0" :header="header" :body="body" @onDelete="deleteData" @onEdit="editData" id="supplierID"></the-table>

    <the-modal v-if="showModal" @close="showModal = false" @update="updateData">
      <template v-slot:header>
        <h5>Edit Car #{{editSup.supplierID}}</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col">
            <label>Supplier Name</label>
            <input type="text" class="form-control" v-model="editSup.supplierName">
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <label>Supplier Address</label>
            <textarea class="form-control" v-model="editSup.supplierAddress"></textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <label>Supplier Phone</label>
            <input type="text" class="form-control" v-model="editSup.supplierPhone">
          </div>
          <div class="col">
            <label>Supplier Email</label>
            <input type="email" class="form-control" v-model="editSup.supplierEmail">
          </div>
        </div>
      </template>
    </the-modal>

  </layout>
</template>

<script>
import layout from './LAYOUT'
import theTable from '../components/TheTable'
import TheModal from '../components/TheModal'

import { $api } from '../service/api'

export default {
  components: {
    layout, theTable, TheModal
  },
  data () {
    return {
      header: [],
      body: [],
      editSup: {},
      showModal: false
    }
  },
  methods: {
    fetchSupplier () {
      $api({ path: '/suppliers', methods: 'get'})
      .then(data => {
        if (data.success) {
          // if not error
          let suppliers = data.result
          this.header = Object.keys(suppliers[0])
          this.body = suppliers
        }
      }).catch(err => {
        console.log(err);
      })
    },
    deleteData (value) {
      $api({ path: `/suppliers/${value}`, method: 'delete'})
      .then(data => {
        if (data.success) {
          this.fetchSupplier()
        } else {
          console.log(data.message);
        }
      })
    },
    editData (value) {
      this.showModal = true
      this.editSup = JSON.parse(JSON.stringify(this.body.filter(e => e.supplierID === value)[0]))
    },
    updateData () {
      if (this.validateEmail(this.editSup.supplierEmail)) {
        $api({ path: `/suppliers/${this.editSup.supplierID}`, method: 'put', data: this.editSup})
        .then( data => {
          this.showModal = false
          this.fetchSupplier()
        })
      } else {
        console.log('not email');

      }
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  created() {
    this.fetchSupplier()
  },
}
</script>

<style>

</style>

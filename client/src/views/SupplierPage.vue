<template>
  <layout>
    <h3>Supplier Information</h3><br>

    <the-table v-if="body.length !== 0" :header="header" :body="body" @onDelete="deleteData" @onEdit="editData" id="supplierID"></the-table>
  </layout>
</template>

<script>
import layout from './LAYOUT'
import theTable from '../components/TheTable'

import { $api } from '../service/api'

export default {
  components: {
    layout, theTable
  },
  data () {
    return {
      header: [],
      body: []
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
        this.fetchSupplier()
      })
    },
    editData (id) {

    }
  },
  created() {
    this.fetchSupplier()
  },
}
</script>

<style>

</style>

<template>
  <layout>
    <h3>Cars Information</h3>

    <the-table :header="header" :body="body"  @onDelete="deleteData" @onEdit="editData" id="carID"></the-table>

    <the-modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <h5>Edit Car</h5>
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
import { $api } from '../service/api'

export default {
  components: {
    layout, TheTable, TheModal
  },
  data() {
    return {
      header: ['Car ID', 'Area', 'Status', 'License Plate', 'Model', 'Weight'],
      body: [],
      showModal: false
    }
  },
  created() {
    this.fetchCars()
  },
  methods: {
    deleteData (value) {
      console.log(value)
    },
    editData (value) {
      this.showModal = true
    },
    fetchCars () {
      $api({ path: '/cars', method: 'get'})
      .then( data => {
        this.body = data.result
      })
    }
  },
}
</script>

<style>
</style>

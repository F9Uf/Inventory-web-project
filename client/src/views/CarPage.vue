<template>
  <layout>
    <h3>Cars Information</h3><br>

    <the-table v-if="body" :header="header" :body="body"  @onDelete="deleteData" @onEdit="editData" id="carID"></the-table>
    <h5 v-if="!body">No Cars</h5>

    <the-modal v-if="showModal" @close="showModal = false" @update="updateData">
      <template v-slot:header>
        <h5>Edit Car #{{editCar.carID}}</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col">
             <label for="inputEmail4">Area</label>
            <input type="number" class="form-control" v-model="editCar.carArea">
          </div>
          <div class="col">
             <label for="inputEmail4">Weight</label>
            <input type="number" class="form-control" v-model="editCar.weight">
          </div>
          <div class="col">
            <label for="inputState">Status</label>

            <select v-model="editCar.carStatus" class="form-control">
              <option value="unready">unready</option>
              <option value="ready">ready</option>
            </select>
          </div>
        </div><br>
        <div class="form-row">
          <div class="col">
             <label for="inputEmail4">License Plate</label>
            <input type="text" class="form-control" v-model="editCar.licensePlate">
          </div>
          <div class="col">
             <label for="inputEmail4">Model</label>
            <input type="text" class="form-control" v-model="editCar.model">
          </div>
        </div>
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
      header: ['Car ID', 'Area', 'Weight', 'Status', 'License Plate', 'Model', ],
      body: null,
      editCar: {},
      showModal: false
    }
  },
  created() {
    this.fetchCars()
  },
  methods: {
    deleteData (value) {
      $api({ path: `/cars/${value}`, method: 'delete'})
      .then(data => {
        this.fetchCars()
      })
    },
    editData (value) {
      this.showModal = true
      this.editCar = JSON.parse(JSON.stringify(this.body.filter(e => e.carID === value)[0]))
    },
    fetchCars () {
      $api({ path: '/cars', method: 'get'})
      .then( data => {
        this.body = data.result
      })
    },
    updateData () {
      $api({ path: `/cars/${this.editCar.carID}`, method: 'put', data: this.editCar})
      .then( data => {
        this.showModal = false
        this.fetchCars()
      })
    }
  },
}
</script>

<style>
</style>

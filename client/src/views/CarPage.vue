<template>
  <layout>
    <div class="row justify-content-between">
      <div class="col-auto">
        <h3>Cars Information</h3>
        </div>
      <div class="col-auto">
        <button class="btn btn-success" @click="showModalNew = true">+ New Car</button>
      </div>
    </div>
    <br>

    <the-table v-if="body" :header="header" :body="body"  @onDelete="deleteData" @onEdit="editData" id="carID"></the-table>
    <h5 v-if="!body">No Cars</h5>

    <!-- modal for edit data -->
    <the-modal id="editModal" v-if="showModalEdit" @close="showModalEdit = false" @update="updateData">
      <template v-slot:header>
        <h5>Edit Car #{{editCar.carID}}</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col">
             <label >Area</label>
            <input type="number" class="form-control"
              :class="{'is-invalid': $v.editCar.carArea.$error}"
              v-model="$v.editCar.carArea.$model">
            <div class="invalid-feedback">Please enter car area</div>
          </div>
          <div class="col">
             <label >Weight</label>
            <input type="number" class="form-control"
             :class="{'is-invalid': $v.editCar.weight.$error}"
              v-model="$v.editCar.weight.$model">
            <div class="invalid-feedback">Please enter car weight</div>
          </div>
          <div class="col">
            <label for="inputState">Status</label>

            <select v-model="editCar.carStatus" class="form-control">
              <option value="unready" >unready</option>
              <option value="ready">ready</option>
            </select>
          </div>
        </div><br>
        <div class="form-row">
          <div class="col">
             <label >License Plate</label>
            <input type="text" class="form-control"
              :class="{'is-invalid': $v.editCar.licensePlate.$error}"
              v-model="$v.editCar.licensePlate.$model"
            >
            <div class="invalid-feedback">Please enter License Plate</div>
          </div>
          <div class="col">
            <label >Model</label>
            <input type="text" class="form-control"
              :class="{'is-invalid': $v.editCar.model.$error}"
              v-model="$v.editCar.model.$model">
            <div class="invalid-feedback">Please enter Model</div>
          </div>
        </div>
      </template>
    </the-modal>

    <!-- modal for create data -->
    <the-modal id="newModal" v-if="showModalNew" @close="showModalNew = false" @update="newData">
      <template v-slot:header>
        <h5>New a Car</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col">
             <label >Area</label>
            <input type="number" class="form-control" v-model="newCar.carArea">
          </div>
          <div class="col">
             <label >Weight</label>
            <input type="number" class="form-control" v-model="newCar.weight">
          </div>
          <div class="col">
            <label for="inputState">Status</label>

            <select v-model="newCar.carStatus" class="form-control">
              <option value="unready">unready</option>
              <option value="ready">ready</option>
            </select>
          </div>
        </div><br>
        <div class="form-row">
          <div class="col">
             <label >License Plate</label>
            <input type="text" class="form-control" v-model="newCar.licensePlate">
          </div>
          <div class="col">
             <label >Model</label>
            <input type="text" class="form-control" v-model="newCar.model">
          </div>
        </div>
      </template>
    </the-modal>
    <base-alert v-if="alert" msg="cannot delete" color="info" @close="alert = false"></base-alert>
  </layout>
</template>

<script>
import layout from './LAYOUT'
import TheTable from '../components/TheTable'
import TheModal from '../components/TheModal'
import { $api } from '../service/api'
import { required, email } from 'vuelidate/lib/validators'
import BaseAlert from '../components/BaseAlert'

export default {
  components: {
    layout, TheTable, TheModal, BaseAlert
  },
  data() {
    return {
      header: ['Car ID', 'Area', 'Weight', 'Status', 'License Plate', 'Model', ],
      body: null,
      editCar: null,
      newCar: {
        carStatus: 'unready'
      },
      showModalEdit: false,
      showModalNew: false,
      alert: false
    }
  },
  validations: {
    editCar: {
      carArea: {required},
      weight: {required},
      carStatus: {required},
      licensePlate: {required},
      model: {required}
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
      this.showModalEdit = true
      this.editCar = JSON.parse(JSON.stringify(this.body.filter(e => e.carID === value)[0]))
    },
    fetchCars () {
      $api({ path: '/cars', method: 'get'})
      .then( data => {
        this.body = data.result
      })
    },
    updateData () {
      if (!this.$v.$invalid) {
        $api({ path: `/cars/${this.editCar.carID}`, method: 'put', data: this.editCar})
        .then( data => {
          this.showModalEdit = false
          this.fetchCars()
        })
      }
    },
    newData () {
      console.log('new data');
    }
  },
}
</script>

<style>
</style>

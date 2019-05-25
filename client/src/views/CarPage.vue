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

    <base-table v-if="body.length" :header="header" :body="body" idName="carID" :hasAction="true">
      <template v-slot="row">
        <div class="btn-group" role="group">
          <button class="btn btn-warning" @click="editData(row.rowId)">edit</button>
          <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
        </div>
      </template>
    </base-table>
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
            <input type="number" class="form-control" min="0"
              :class="{'is-invalid': $v.editCar.carArea.$error}"
              v-model="$v.editCar.carArea.$model">
            <div class="invalid-feedback">Please enter car area</div>
          </div>
          <div class="col">
             <label >Weight</label>
            <input type="number" class="form-control" min="0"
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
    <!-- <the-modal id="newModal" v-if="showModalNew" @close="showModalNew = false" @update="newData">
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
    </the-modal> -->

    <!-- modal for confirm deletedat -->
    <base-alert v-if="alert" msg="cannot delete" color="info" @close="alert = false"></base-alert>
  </layout>
</template>

<script>
import layout from './LAYOUT'
import BaseTable from '../components/BaseTable'
import TheModal from '../components/TheModal'
import { $api } from '../service/api'
import { required, decimal, minValue } from 'vuelidate/lib/validators'
import BaseAlert from '../components/BaseAlert'

export default {
  components: {
    layout, BaseTable, TheModal, BaseAlert
  },
  data() {
    return {
      header: [
        { name: 'carID', label: 'Car ID'},
        { name: 'model', label: 'Model'},
        { name: 'licensePlate', label: 'License Plate'},
        { name: 'weight', label: 'Max Weight'},
        { name: 'carArea', label: 'Area'},
        { name: 'carStatus', label: 'Status'}
      ],
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
      carArea: {required, decimal, minValue: minValue(0)	},
      weight: {required, decimal, minValue: minValue(0) },
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
      let isConfirm = confirm(`Are you sure to delete this car #${value}`)
      if (isConfirm) {
        $api({ path: `/cars/${value}`, method: 'delete'})
        .then(data => {
          if (data.success)
            this.fetchCars()
        })
      }
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
          if (data.success) {
            this.showModalEdit = false
            this.fetchCars()
          } else console.log(data)

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

<template>
  <layout>
    <div class="row justify-content-between">
      <div class="col-auto">
        <h3>Cars Information</h3>
        </div>
      <div class="col-auto">
        <button class="btn btn-success" @click="$router.push('/cars/new')">+ New Car</button>
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
             :class="{'is-invalid': $v.editCar.carWeight.$error}"
              v-model="$v.editCar.carWeight.$model">
            <div class="invalid-feedback">Please enter car weight</div>
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

    <base-alert v-if="alert.show" :msg="alert.msg" :color="alert.color" @close="alert.show = false"></base-alert>
  </layout>
</template>

<script>
import layout from '../LAYOUT'
import BaseTable from '@/components/BaseTable'
import TheModal from '@/components/TheModal'
import { $api } from '@/service/api'
import { required, decimal, minValue } from 'vuelidate/lib/validators'
import BaseAlert from '@/components/BaseAlert'

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
        { name: 'carWeight', label: 'Weight (KG)'},
        { name: 'carArea', label: 'Area (m3)'},
        { name: 'carStatus', label: 'Status'}
      ],
      body: [],
      editCar: {},
      showModalEdit: false,
      showModalNew: false,
      alert: {
        show: false,
        msg: '',
        color: 'warning'
      }
    }
  },
  validations: {
    editCar: {
      carArea: {required, decimal, minValue: minValue(0)	},
      carWeight: {required, decimal, minValue: minValue(0) },
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
          if (data.success) {
            this.alert = {
              show: true,
              msg: data.message,
              color: 'success'
            }
            this.fetchCars()
          } else {
            this.alert = {
              show: false,
              msg: data.message || 'error',
              color: 'danger'
            }
          }
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
        if (data.success) {
          this.body = data.result
        }
        else {
          this.alert = {
            show: true,
            msg: data.message || 'error',
            color: 'danger'
          }
        }
      })
    },
    updateData () {
      if (!this.$v.$invalid) {
        $api({ path: `/cars/${this.editCar.carID}`, method: 'put', data: this.editCar})
        .then( data => {
          if (data.success) {
            this.showModalEdit = false
            this.editCar = {}
            this.alert = {
              show: true,
              msg: data.message || 'success',
              color: 'success'
            }
            this.fetchCars()
          } else {
            this.alert = {
              show: true,
              msg: data.message || 'error update',
              color: 'danger'
            }
          }

        })
      }
    }
  },
}
</script>

<style>
</style>

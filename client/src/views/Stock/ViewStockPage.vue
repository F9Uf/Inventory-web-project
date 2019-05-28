<template>
  <layout>
    <div class="row justify-content-between">
      <div class="col-auto">
        <h3>Stock #{{$route.params.id}}</h3>
        </div>
      <div class="col-auto">
        <button class="btn btn-success" @click="$router.push('/cars/new')">+ New Location</button>
      </div>
    </div>
    <br>
    <base-table v-if="body.length" :header="header" :body="body" idName="locationID" :hasAction="true">
      <template v-slot="row">
        <div class="btn-group" role="group">
          <button class="btn btn-warning" @click="editData(row.rowId)">edit</button>
          <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
        </div>
      </template>
    </base-table>
    <h5 v-if="!body.length">No Location in this Stock</h5>

    <!-- modal for edit data -->
    <the-modal id="editModal" v-if="showModalEdit" @close="showModalEdit = false" @update="updateData">
      <template v-slot:header>
        <h5>Edit Location #{{editLocation.locationID}}</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col">
            <label >Location Name</label>
            <input type="text" class="form-control"
              :class="{'is-invalid': $v.editLocation.locationName.$error}"
              v-model="$v.editLocation.locationName.$model">
            <div class="invalid-feedback">Please enter Location's name</div>
          </div>
          <div class="col">
            <label>Max Area</label>
            <input type="number" class="form-control" min="0"
              :class="{'is-invalid': $v.editLocation.maxArea.$error}"
              v-model="$v.editLocation.maxArea.$model">
            <div class="invalid-feedback">Please enter Area of Location</div>
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
import { required, decimal } from 'vuelidate/lib/validators'
import BaseAlert from '@/components/BaseAlert'

export default {
  components: {
    layout, BaseTable, TheModal, BaseAlert
  },
  data() {
    return {
      header: [
        { name: 'locationID', label: 'Location ID'},
        { name: 'locationName', label: 'Location'},
        { name: 'maxArea', label: 'Max (m3)'}
      ],
      body: [],
      editLocation: {},
      showModalEdit: false,
      alert: {
        show: false,
        msg: '',
        color: 'warning'
      }
    }
  },
  validations: {
    editLocation: {
      locationName: {required},
      maxArea: {required, decimal}
    }
  },
  created() {
    this.fetchLocation()
  },
  methods: {
    deleteData (value) {
      let isConfirm = confirm(`Are you sure to delete this stock #${value}`)
      if (isConfirm) {
        $api({ path: `/locations/${value}`, method: 'delete'})
        .then(data => {
          if (data.success) {
            this.alert = {
              show: true,
              msg: data.message,
              color: 'success'
            }
            this.fetchLocation()
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
      this.editLocation = JSON.parse(JSON.stringify(this.body.filter(e => e.locationID === value)[0]))
    },
    fetchLocation () {
      $api({ path: `/stocks/${this.$route.params.id}`, method: 'get'})
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
        $api({ path: `/locations/${this.editLocation.locationID}`, method: 'put', data: this.editLocation})
        .then( data => {
          if (data.success) {
            this.showModalEdit = false
            this.editLocation = {}
            this.alert = {
              show: true,
              msg: data.message || 'success',
              color: 'success'
            }
            this.fetchLocation()
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

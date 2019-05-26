<template>
  <layout>
    <div class="row justify-content-between">
      <div class="col-auto">
        <h3>Supplier Information</h3>
        </div>
      <div class="col-auto">
        <button class="btn btn-success" @click="$router.push('/suppliers/new')">+ New Supplier</button>
      </div>
    </div>
    <br>

    <base-table v-if="body.length" :header="header" :body="body" idName="supplierID" :hasAction="true">
      <template v-slot="row">
        <div class="btn-group" role="group">
          <button class="btn btn-warning" @click="editData(row.rowId)">Edit</button>
          <button class="btn btn-danger" @click="deleteData(row.rowId)">Delete</button>
        </div>
      </template>
    </base-table>

    <!-- modal for edit supplier -->
    <the-modal v-if="showModal" @close="showModal = false" @update="updateData">
      <template v-slot:header>
        <h5>Edit Car #{{editSup.supplierID}}</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col">
            <label>Supplier Name</label>
            <input type="text" class="form-control"
              :class="{'is-invalid': $v.editSup.supplierName.$error}"
              v-model="$v.editSup.supplierName.$model">
            <div class="invalid-feedback">Please enter Supplier Name</div>
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
            <input type="text" class="form-control"
              v-model="$v.editSup.supplierPhone.$model"
              :class="{'is-invalid': $v.editSup.supplierPhone.$error}">
            <div class="invalid-feedback">Please enter Supplier Phone</div>
          </div>
          <div class="col">
            <label>Supplier Email</label>
            <input type="email" class="form-control"
              v-model="$v.editSup.supplierEmail.$model"
              :class="{'is-invalid': $v.editSup.supplierEmail.$error}">
              <div class="invalid-feedback">Please enter Supplier Email</div>
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
import BaseAlert from '@/components/BaseAlert'

import { $api } from '@/service/api'
import { required, email } from 'vuelidate/lib/validators'

export default {
  components: {
    layout, BaseTable, TheModal, BaseAlert
  },
  data () {
    return {
      header: [
        { name: 'supplierID', label: 'Supplier ID'},
        { name: 'supplierName', label: 'Name'},
        { name: 'supplierAddress', label: 'Address'},
        { name: 'supplierPhone', label: 'Phone'},
        { name: 'supplierEmail', label: 'Email'},

      ],
      body: [],
      editSup: {},
      showModal: false,
      alert: {
        show: false,
        msg: '',
        color: 'warning'
      }
    }
  },
  validations: {
    editSup: {
      supplierName: {required},
      supplierAddress: {},
      supplierPhone: {required},
      supplierEmail: {required, email}
    }
  },
  methods: {
    fetchSupplier () {
      $api({ path: '/suppliers', methods: 'get'})
      .then(data => {
        if (data.success) {
          // if not error
          this.body = data.result
        } else {
          this.alert = {
            show: true,
            msg: data.message,
            color: 'danger'
          }
        }
      })
    },
    deleteData (value) {
      let con = confirm(`Are you sure to delete supplier #${value}`)
      if (con) {
        $api({ path: `/suppliers/${value}`, method: 'delete'})
        .then(data => {
          if (data.success) {
            this.alert = {
              show: true,
              msg: data.message,
              color: 'success'
            }
            this.fetchSupplier()
          } else {
            this.alert = {
              show: true,
              msg: data.message || 'error',
              color: 'danger'
            }
          }
        })
      }
    },
    editData (value) {
      this.showModal = true
      this.editSup = JSON.parse(JSON.stringify(this.body.filter(e => e.supplierID === value)[0]))
    },
    updateData () {
      if (!this.$v.$invalid) {
        $api({ path: `/suppliers/${this.editSup.supplierID}`, method: 'put', data: this.editSup})
        .then( data => {
          if (data.success) {
            this.showModal = false
            this.editSup = {}
            this.alert = {
              show: true,
              msg: data.message,
              color: 'success'
            }
            this.fetchSupplier()
          } else {
            this.alert = {
              show: true,
              msg: data.message || 'update error',
              color: 'danger'
            }
          }
        })
      }
    }
  },
  created() {
    this.fetchSupplier()
  },
}
</script>

<style>

</style>

<template>
  <layout>
    <div class="row justify-content-between">
      <div class="col-auto">
        <h3>Stock Information</h3>
        </div>
      <div class="col-auto">
        <button class="btn btn-success" @click="$router.push('/cars/new')">+ New Stock</button>
        <!-- there is no adding new stock -->
      </div>
    </div>
    <br>

    <base-table v-if="body.length" :header="header" :body="body" idName="stockID" :hasAction="true">
      <template v-slot="row">
        <div class="btn-group" role="group">
          <button class="btn btn-warning" @click="editData(row.rowId)">edit</button>
          <button class="btn btn-success" @click="$router.push(`/stocks/${row.rowId}`)">view</button>
          <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
        </div>
      </template>
    </base-table>
    <h5 v-if="!body.length">No Stock</h5>

    <!-- modal for edit data -->
    <the-modal id="editModal" v-if="showModalEdit" @close="showModalEdit = false" @update="updateData">
      <template v-slot:header>
        <h5>Edit Stock #{{editStock.stockID}}</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col">
            <label >Stock Name</label>
            <input type="text" class="form-control"
              :class="{'is-invalid': $v.editStock.stockName.$error}"
              v-model="$v.editStock.stockName.$model">
            <div class="invalid-feedback">Please enter Stock's name</div>
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
import { required } from 'vuelidate/lib/validators'
import BaseAlert from '@/components/BaseAlert'

export default {
  components: {
    layout, BaseTable, TheModal, BaseAlert
  },
  data() {
    return {
      header: [
        { name: 'stockID', label: 'Stock ID'},
        { name: 'stockName', label: 'Stock Name'},
      ],
      body: [],
      editStock: {},
      showModalEdit: false,
      alert: {
        show: false,
        msg: '',
        color: 'warning'
      }
    }
  },
  validations: {
    editStock: {
      stockName: {required}
    }
  },
  created() {
    this.fetchStock()
  },
  methods: {
    deleteData (value) {
      let isConfirm = confirm(`Are you sure to delete this stock #${value}`)
      if (isConfirm) {
        $api({ path: `/stocks/${value}`, method: 'delete'})
        .then(data => {
          if (data.success) {
            this.alert = {
              show: true,
              msg: data.message,
              color: 'success'
            }
            this.fetchStock()
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
      this.editStock = JSON.parse(JSON.stringify(this.body.filter(e => e.stockID === value)[0]))
    },
    fetchStock () {
      $api({ path: `/stocks`, method: 'get'})
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
        $api({ path: `/stocks/${this.editStock.stockID}`, method: 'put', data: this.editStock})
        .then( data => {
          if (data.success) {
            this.showModalEdit = false
            this.editStock = {}
            this.alert = {
              show: true,
              msg: data.message || 'success',
              color: 'success'
            }
            this.fetchStock()
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

<template>
  <layout>
    <h3>item Information</h3><br>
    <layout>
      <base-table :header="header" :body="body" :hasAction="true" idName="itemID" :hasIndex="true">
        <template v-slot="row">
          <button class="btn btn-warning" @click="editData(row.rowId)">edit</button>
        </template>
      </base-table>
      <h5 v-if="!body">No Item</h5>
    </layout>
    <layout>
      <h6>Total Items</h6>
      <div class="form-row">
        <div class="col-md-4 ">
          <button class="btn btn-success" v-on:click="isBtnHidden = !isBtnHidden">View/Hide Total items</button><br>
        </div>
        <div class="col-md-3" v-if="isBtnHidden">
          <input type="text" class="form-control" v-model="body[0].count" disabled>
        </div>
      </div>
      <div class="form-row">
        <div class="col-auto ml-auto">
          <button class="btn btn-success" @click="$router.push('/category')">View category</button>
        </div>
      </div>
    </layout>

    <!-- modal for edit item -->
    <base-modal id="editModal" v-if="showModalEdit">
      <template v-slot:header>
        <h5>Edit item #{{editItem.itemID}}</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col-6">
            <label >Name</label>
            <input type="text" class="form-control" v-model="editItem.itemName">
          </div>
          <div class="col-3">
            <label >Area</label>
            <input type="number" class="form-control" min="0"
            v-model="editItem.area">
          </div>
          <div class="col-3">
            <label >Weight</label>
            <input type="number" min="0" class="form-control"
            v-model="editItem.weight">
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" @click="updateItem()">submit</button>
        <button class="btn btn-danger" @click="showModalEdit = false">close</button>
      </template>
    </base-modal>

    <base-alert v-if="alert.show" :msg="alert.msg" :color="alert.color" @close="alert.show = false"></base-alert>
  </layout>
</template>

<script>
import layout from './LAYOUT'
import BaseModal from '../components/BaseModal'
import { $api } from '../service/api'
import BaseTable from '../components/BaseTable'
import { required, decimal, minValue } from 'vuelidate/lib/validators'
import BaseAlert from '../components/BaseAlert'

export default {
  components: {
    layout, BaseModal, BaseTable, BaseAlert
  },
  data() {
    return {
      alert: {
        show: false,
        msg: '',
        color: 'danger'
      },
      header: [
        {
          name: 'itemID',
          label: 'item id'
        },
        {
          name: 'itemName',
          label: 'Name'
        },
        {
          name: 'totalCount',
          label: 'Total count'
        },
        {
          name: 'area',
          label: 'Area'
        },
        {
          name: 'weight',
          label: 'Weight'
        }
      ],
      body: null,
      editItem: {},
      showModalEdit: false,
      isBtnHidden: false
    }
  },
  created() {
    this.fetchItems()
  },
  methods: {
    deleteData (value) {
      let isConfirm = confirm(`Are you sure to delete this item #${value} ?`)
      if (isConfirm) {
        $api({ path: `/items/${value}`, method: 'delete'})
        .then(data => {
        this.fetchItems()
        })
      }
    },
    editData (value) {
      this.showModalEdit = true
      this.editItem = JSON.parse(JSON.stringify(this.body.filter(e => e.itemID === value)[0]))
      console.log(this.editItem);

      // var jso = JSON.parse
    },
    fetchItems () {
      $api({ path: '/items', method: 'get'})
      .then( data => {
        this.body = data.result
      })
    },
    updateItem () {
      let newItem = {
        itemName: this.editItem.itemName,
        area: this.editItem.area,
        weight: this.editItem.weight
      }
      $api({ path: `/items/${this.editItem.itemID}`, method: 'put', data: newItem })
      .then(data => {
        if (data.success) {
          this.fetchItems()
          this.alert = {
            show: true,
            msg: 'Update success!',
            color: 'success'
          }
          this.showModalEdit = false
        } else {
          this.alert = {
            show: true,
            msg: 'Update fail',
            color: 'danger'
          }
        }
      })
    }
  },
}
</script>

<style>
</style>

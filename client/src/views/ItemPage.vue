<template>
  <layout>
    <h3>item Information</h3><br> 
    <layout>
          <base-table :header="header" :body="body" :hasAction="false" idName="itemID" :hasIndex="true">
              <template v-slot="row">
              <div class="btn-group" role="group">
                <button class="btn btn-warning" @click="editData(row.rowId)">edit</button>
                <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
              </div>
            </template>
          </base-table>
          <h5 v-if="!body">No Item</h5>
    </layout>
    <layout>
      <div class="form-row">
        <div class="col-md-4 ">
          <button class="btn btn-success" v-on:click="isBtnHidden = !isBtnHidden">View/Hide Total items</button>
        </div>
        <div class="col-md-3" v-if="isBtnHidden">
          <input type="text" class="form-control" v-model="body.length" disabled>
        </div>

      </div>
    </layout>

    <!-- modal for edit item -->
    <the-modal id="editModal" v-if="showModalEdit" @close="showModalEdit = false" @update="updateData">
      <template v-slot:header>
        <h5>Edit item #{{editItem.itemID}}</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col">
             <label >Name</label>
              <input type="text" class="form-control"
              :class="{'is-invalid':$v.editItem.itemName.$error}"
              v-model="$v.editItem.itemName.$model">
              <div class="invalid-feedback">Please enter item name</div>
          </div>
        </div>
        <div class="form-row">
          <div class="col">
             <label >Count</label>
              <input type="number" class="form-control" min="0"
              :class="{'is-invalid': $v.editItem.totalCount.$error}"
              v-model="$v.editItem.totalCount.$model">
              <div class="invalid-feedback">Please total count</div>
          </div>
          <div class="col">
             <label >Category</label>
            <input type="text" class="form-control"
            :class="{'is-invalid':$v.editItem.category.$error}"
            v-model="$v.editItem.category.$model">
          </div>
        </div>
        </template>
    </the-modal>
  </layout>
</template>

<script>
import layout from './LAYOUT'
import TheModal from '../components/TheModal'
import { $api } from '../service/api'
import BaseTable from '../components/BaseTable'
import { required, decimal, minValue } from 'vuelidate/lib/validators'
import BaseAlert from '../components/BaseAlert'

export default {
  components: {
    layout, TheModal, BaseTable, BaseAlert
  },
  data() {
    return {
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
        }
      ],
      body: null,
      editItem: {},
      showModalEdit: false,
      showModalNew: false,
      alert: false,
      isBtnHidden: false
    }
  },
  validations: {
    editItem: {
      itemName: {required},
      totalCount: {required},
      category: {required}
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
        console.log(data);
        console.log(this.body);
        
        
      })
    },
    updateData () {
      $api({ path: `/items/${this.editItem.itemID}`, method: 'put', data: this.editItem})
      .then( data => {
        if (data.success) {
          this.showModal = false
        this.fetchItems()
        }else console.log(data)

      })

    }
  },
}
</script>

<style>
</style>

<template>
  <layout>
    <h3>item Information</h3><br>
    <base-table :header="header" :body="body" :hasAction="true" id="itemID" :hasIndex="true">
        <template v-slot="row">
        <div class="btn-group" role="group">
          <button class="btn btn-warning" @click="editData(row.rowId)">edit</button>
          <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
        </div>
      </template>
    </base-table>
    <h5 v-if="!body">No Item</h5>

    <the-modal v-if="showModal" @close="showModal = false" @update="updateData">
      <template v-slot:header>
        <h5>Edit item #{{editItem.itemID}}</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col">
             <label for="inputEmail4">Item ID</label>
            <input type="number" class="form-control" v-model="editItem.itemID">
          </div>
        </div>
        <div class="form-row">
          <div class="col">
             <label for="inputEmail4">Name</label>
            <input type="text" class="form-control" v-model="editItem.itemName">
          </div>
        </div>
        <div class="form-row">
          <div class="col">
             <label for="inputEmail4">Count</label>
              <input type="number" class="form-control" v-model="editItem.totalCount">
          </div>
          <div class="col">
             <label for="inputEmail4">Category</label>
            <input type="text" class="form-control" v-model="editItem.category">
          </div>
        </div>
        </template>
    </the-modal>

  </layout>
</template>

<script>
import layout from './LAYOUT'
// import TheTable from '../components/TheTable'
import TheModal from '../components/TheModal'
import { $api } from '../service/api'
import BaseTable from '../components/BaseTable'

export default {
  components: {
    layout, 
    // TheTable,
     TheModal,BaseTable
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
        },
        {
          name: 'category',
          label: 'Category'
        }
      ],
      body: null,
      editItem: {},
      showModal: false
    }
  },
  created() {
    this.fetchItems()
  },
  methods: {
    deleteData (value) {
      $api({ path: `/items/${value}`, method: 'delete'})
      .then(data => {
        this.fetchItems()
      })
    },
    editData (value) {
      this.showModal = true
      this.editItem = JSON.parse(JSON.stringify(this.body.filter(e => e.itemID === value)[0]))
      console.log(value);
      
    },
    fetchItems () {
      $api({ path: '/items', method: 'get'})
      .then( data => {
        this.body = data.result
              
      })
    },
    updateData () {
      $api({ path: `/items/${this.editItem.itemID}`, method: 'put', data: this.editItem})
      .then( data => {
        this.showModal = false
        this.fetchItems()
      })
      console.log(this.editItem.itemID);
      
    }
  },
}
</script>

<style>
</style>

<template>
  <layout>
    <h3>item Information</h3><br>

    <the-table v-if="body" :header="header" :body="body"  @onDelete="deleteData" @onEdit="editData" id="itemID"></the-table>
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
import TheTable from '../components/TheTable'
import TheModal from '../components/TheModal'
import { $api } from '../service/api'

export default {
  components: {
    layout, TheTable, TheModal
  },
  data() {
    return {
      header: ['Item ID', 'Name', 'Count', 'Category'],
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
    }
  },
}
</script>

<style>
</style>

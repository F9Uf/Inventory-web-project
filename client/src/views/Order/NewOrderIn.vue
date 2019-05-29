<template>
  <layout>
    <h3>Create Order In</h3><br>

    <layout>

      <base-table :hasAction="true" :header="header" :body="body" idName="itemID" valueName="itemCount">
        <template v-slot="row">
          <div class="row">
            <div class="col-md-5">
              <input type="text" class="form-control input-normal" />
            </div>
            <div class="col-auto">
              <div class="btn-group">
                <button class="btn btn-danger" @click="deleteData(row.rowIndex)">delete</button>
                <button class="btn btn-warning">select location</button>
              </div>
            </div>
          </div>
        </template>
      </base-table><br>

      <div class="row">
        <div class="col-auto mr-auto">
          <button class="btn btn-success" @click="showModalView = true; fetchItem()">Selet Item</button>
          <button class="btn btn-success">+ Add Item</button>
        </div>
      </div>
    </layout>
    <div class="row">
      <div class="col-auto ml-auto">
        <button class="btn btn-primary">Create</button>
      </div>
    </div>

    <!-- modal select item -->
    <base-modal v-if="showModalView" @click="showModalView = false;">
      <template v-slot:header><h5>Select Item</h5></template>
      <template v-slot:body>
        <base-table :header="item.header" :body="item.body" :hasAction="true" idName="itemID">
          <template v-slot="row">
            <button class="btn btn-warning" v-if="!isInSelectOrder(row.rowId)"
              @click="item.temp.push({...item.body.filter(e => e.itemID === row.rowId)[0]})">
              select
              </button>
            <button class="btn btn-outline-warning" @click="item.temp = [...item.temp.filter(e => e.itemID !== row.rowId)]" v-else>cancel</button>
          </template>
        </base-table>

      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" @click="chooseItem()">select</button>
        <button @click="showModalView = false" class="btn btn-danger">close</button>
      </template>
    </base-modal>

    <!-- modal create item -->
    <base-modal v-if="showModalCreate" @click="showModalCreate = false;">
      <template v-slot:header><h5>Add Item</h5></template>
      <template v-slot:body>

      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" @click="chooseOrderDetail()">select</button>
        <button @click="showModalCreate = false" class="btn btn-danger">close</button>
      </template>
    </base-modal>
  </layout>

</template>

<script>
import layout from '@/views/LAYOUT'
import BaseTable from '@/components/BaseTable'
import BaseModal from '@/components/BaseModal'

import { $api } from '@/service/api'

export default {
  components: {
    layout,BaseTable, BaseModal
  },
  data() {
    return {
      header: [
        {name: 'itemID', label: 'Item ID'},
        {name: 'itemName', label: 'Item Name'},
        {name: 'area', label: 'Item Area (M^2)'},
        {name: 'locationName', label: 'Location'},
        {name: 'locationArea', label: 'Location Area (M^2)'}
      ],
      body: [],
      newItem: [],
      oldItem: [],
      showModalView: false,
      item: {
        header: [
          {name: 'itemName', label: 'Item Name'},
          {name: 'area', label: 'Area (M^2)'}
        ],
        body: [],
        temp: []
      },
      createItem: {

      }
    }
  },
  watch: {
    oldItem (newV, oldV) {
      this.body = newV.concat(this.newItem)
    },
    newItem (newV, oldV) {
      this.body = newV.concat(this.oldItem)
    }
  },
  methods: {
    closeModal () {
      this.item.temp = []
      this.item.body = []
      this.showModalView = false
    },
    isInSelectOrder (id) {
      return this.item.temp.map(e => e.itemID).indexOf(id) > -1 // check if id is selected
    },
    deleteData (index) {
      if (this.body[index].itemID) {
        // old Item
        this.oldItem = [...this.oldItem.filter(e => e.itemID !== this.body[index].itemID)]
      } else {
        // new Item
      }
    },
    fetchItem () {
      $api({ path: '/items', method: 'get'})
      .then(data => {
        if (data.success) {
          this.item.body = data.result
        }
      })
    },
    chooseItem () {
      this.oldItem = this.oldItem.concat(this.item.temp)
      this.closeModal()
    }
  },
}
</script>

<style>

</style>

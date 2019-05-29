<template>
  <layout>
    <h3>Create Order Out</h3><br>

    <layout>

      <base-table :hasAction="true" :header="header" :body="body" idName="itemID" valueName="itemCount">
        <template v-slot="row">
          <button class="btn btn-danger" @click="deleteData(row.rowIndex)">delete</button>
        </template>
      </base-table><br>

      <div class="row">
        <div class="col-auto mr-auto">
          <button class="btn btn-success" @click="showModalView = true">select item</button>
        </div>
      </div>
    </layout>


    <!-- modal select item -->
    <base-modal v-if="showModalView">
      <template v-slot:header><h5 v-if="!next">Select Item</h5><h5 v-else>Select Location</h5></template>
      <template v-slot:body>
        <base-table :header="selectItem.headerItem" :body="selectItem.bodyItem" :hasAction="true" idName="itemID" v-if="!next">
          <template v-slot="row">
            <button class="btn btn-warning"
              @click="selectItem.item = {...selectItem.bodyItem.filter(e => e.itemID === row.rowId)[0]}; next = true; fetchLocation()">
              select
            </button>
          </template>
        </base-table>

        <template v-if="next">
          ItemName: {{ selectItem.item.itemName }}
          <div class="form-group">
            <label>Count of Item</label>
            <input type="number" class="form-control" min="0" v-model="selectItem.item.itemCount">
          </div>
          Total Area: {{ totalArea }} <br>

          <base-table :hasIndex="false" :hasAction="true" idName="locationID" :header="selectItem.headerLoc" :body="selectItem.bodyLoc">
            <template v-slot="row">
              <button class="btn btn-warning" @click="selectLocationJa(row.rowId)" v-if="selectItem.location.locationID !== row.rowId">select</button>
              <button class="btn btn-outline-warning" @click="selectItem.location = {}" v-else>cancel</button>
            </template>
          </base-table>
        </template>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" @click="pushOldItem()" v-if="next">submit</button>
        <button @click="closeModalView()" class="btn btn-danger">close</button>
      </template>
    </base-modal>


    <div class="row">
      <div class="col-auto ml-auto">
        <button class="btn btn-primary" @click="createOrder()">Create</button>
      </div>
    </div>
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
        {name: 'itemName', label: 'Item Name'},
        {name: 'area', label: 'Item Area (M^2)'},
        {name: 'locationName', label: 'Location'},
        {name: 'itemCount', label: 'count'}
      ],
      body: [],
      newItem: [],
      oldItem: [],
      next: false,
      showModalView: false,
      showModalNew: false,
      selectItem: {
        headerItem: [
          {name: 'itemID', label: 'Item ID'},
          {name: 'itemName', label: 'Item Name'},
          {name: 'area', label: 'Area'},
          {name: 'weight', label: 'Weight'}
        ],
        bodyItem: [],

        headerLoc: [
          {name: 'stockName', label: 'Stock'},
          {name: 'locationName', label: 'Location'},
          {name: 'leftArea', label: 'Area Left'}
        ],
        bodyLoc: [],

        item: {},
        location: {}
      },
      createItem: {
        item: {},
        headerCat: [
          {name:'categoryName', label: 'Category'}
        ],
        bodyCat: [],
        selectCat: {},

        headerSup: [
          {name: 'supplierName', label: 'Supplier'}
        ],
        bodySup: [],
        selectSup: {},

        headerLoc: [
          {name: 'stockName', label: 'Stock'},
          {name: 'locationName', label: 'Location'},
          {name: 'leftArea', label: 'Area Left'}
        ],
        bodyLoc: [],
        selectLoc: {}
      }
    }
  },
  created() {
    this.fetchItem()
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
    selectLocationJa (locationID) {
      let element = this.selectItem.bodyLoc.filter(e => e.locationID === locationID)[0]
      if (element.leftArea < this.totalArea) {
        console.log('More than');
      } else {
        this.selectItem.location = element
      }
    },
    pushOldItem () {
      let item = this.selectItem.item
      let location = this.selectItem.location
      if (Object.keys(item).length > 0 && Object.keys(location).length > 0 && item.itemCount > 0) {
        let newItem = { ...item, ...location, oldIndex: this.oldItem.length}
        this.oldItem.push(newItem)
        this.closeModalView()
      } else {
        console.log('can not select this!')
      }

    },
    pushNewItem () {
      let item = this.createItem.item
      let location = this.createItem.selectLoc
      let supplier = this.createItem.selectSup
      let category = this.createItem.selectCat

      if (Object.keys(item).length >0 && Object.keys(location).length > 0 && Object.keys(supplier).length >0 && Object.keys(category).length > 0) {
        // all input complete
        if (this.newTotalArea > location.leftArea) {
          console.log('more than left area');
        } else {
          let newItem = { ...item, ...location, ...supplier, ...category, newIndex: this.newItem.length }
          this.newItem.push(newItem)
          this.closeModalNew()
        }
      } else {
        console.log('all input aren\'t not complete');

      }
    },
    closeModalView () {
      this.selectItem.item = {}
      this.selectItem.location = {}
      this.next = false
      this.showModalView = false
    },
    closeModalNew () {
      this.createItem.item = {}
      this.createItem.selectLoc = {}
      this.createItem.selectSup = {}
      this.createItem.selectCat = {}
      this.showModalNew = false
    },
    deleteData (index) {
      if (this.body[index].itemID) {
        // old Item
        this.oldItem = [...this.oldItem.filter(e => e.itemID !== this.body[index].itemID)]
      } else {
        // new Item
        this.newItem = [...this.newItem.filter(e => e.newIndex !== this.body[index].newIndex)]
      }
    },
    fetchItem () {
      $api({ path: '/items', method: 'get'})
      .then(data => {
        if (data.success) {
          this.selectItem.bodyItem = data.result
        }
      })
    },
    fetchLocation () {
      $api({ path: '/location/area', method: 'get'})
      .then(data => {
        if (data.success) {
          this.selectItem.bodyLoc = data.result
        }
      })
    },
    fetchCat () {
      $api({ path: '/category', method: 'get'})
      .then(data => {
        if (data.success) {
          this.createItem.bodyCat = data.result
        } else {
          console.log(data)
        }
      })
    },
    fetchSup () {
      $api({ path: '/suppliers', methods: 'get'})
      .then(data => {
        if (data.success) {
          this.createItem.bodySup = data.result
        } else {
          console.log(data)
        }
      })
    },
    fetchLoc () {
      $api({ path: '/location/area', method: 'get'})
      .then(data => {
        if (data.success) {
          this.createItem.bodyLoc = data.result
        } else {
          console.log('error fetchLoc')
        }
      })
    },
    createOrder () {
      let newOrderIn = { newItem: this.newItem, oldItem: this.oldItem}
      $api({ path: '/orders/in', method: 'post', data: newOrderIn})
      .then(data => {
        if (data.success) {
          console.log('success')
          this.newItem = []
          this.oldItem = []
        } else {
          console.log('create order fail')
        }
      })
    }
  },
  computed: {
    totalArea () {
      return this.selectItem.item.itemCount*this.selectItem.item.area || 0
    },
    newTotalArea () {
      return this.createItem.item.area * this.createItem.item.itemCount || 0
    }
  },

}
</script>

<style>

</style>

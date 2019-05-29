<template>
  <layout>
    <h3>Create Order Out</h3>

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
        <div class="col-auto ml-auto">
        <p class="text-muted">
          Can not create with same location in same item!
        </p>
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
              @click="selectItem.item = {...selectItem.bodyItem.filter(e => e.itemID === row.rowId)[0]}; next = true; fetchLocationByItem(row.rowId)">
              select
            </button>
          </template>
        </base-table>

        <template v-if="next">
          <h6><b>ItemName:</b> {{ selectItem.item.itemName }}</h6>
          <div class="form-group">
            <label><b>Count for select</b></label>
            <input type="number" class="form-control" min="0" v-model="selectItem.item.selectCount">
          </div>
          <b>Select</b> {{ selectItem.item.selectCount || 0 }} <b>from</b> {{ selectItem.location.itemCount }} <br>

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


    <layout>
      <h5>Select Shop</h5>

      <div class="form-row">
        <div class="col-md-4">
          <label>Shop Name</label>
          <input type="text" class="form-control" disabled v-model="selectShop.shop.shopName">
        </div>
        <div class="col-md-2">
          <label>Address Detail</label>
          <input type="text" class="form-control" disabled v-model="selectShop.shop.shopAddress">
        </div>
        <div class="col-md-3">
          <label>District</label>
          <input type="text" class="form-control" disabled v-model="selectShop.shop.shopDistrict">
        </div>
        <div class="col-md-3">
          <label>Sub District</label>
          <input type="text" class="form-control" disabled v-model="selectShop.shop.shopSubDistrict">
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-3">
          <label>Province</label>
          <input type="text" class="form-control" disabled v-model="selectShop.shop.shopProvince">
        </div>
        <div class="col-md-2">
          <label>Postal Code</label>
          <input type="text" class="form-control" disabled v-model="selectShop.shop.shopPostalCode">
        </div>
        <div class="col-md-3">
          <label>Phone</label>
          <input type="text" class="form-control" disabled v-model="selectShop.shop.shopPhone">
        </div>
      </div>

      <br>
      <button class="btn btn-success" @click="selectShop.showSelect = true; fetchShop()">Select Shop</button>
      <button class="btn btn-success" @click="selectShop.showNew = true">+ Add Shop</button>
    </layout>

    <base-modal v-if="selectShop.showSelect">
      <template v-slot:header><h5>Select Shop</h5></template>
      <template v-slot:body>
        <base-table :header="selectShop.header" :body="selectShop.body" :hasIndex="false" :hasAction="true" idName="shopID">
          <template v-slot="row">
            <button class="btn btn-warning" @click="selectShop.showSelect = false; selectShop.shop = {...selectShop.body.filter(e => e.shopID === row.rowId)[0]}">select</button>
          </template>
        </base-table>
      </template>
      <template v-slot:footer>
        <button class="btn btn-danger" @click="selectShop.showSelect = false">close</button>
      </template>

    </base-modal>


    <base-modal v-if="selectShop.showNew">
      <template v-slot:header><h5>Add Shop</h5></template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col-md-4">
            <label>Shop Name</label>
            <input type="text" class="form-control" v-model="selectShop.new.shopName">
          </div>
          <div class="col-md-2">
            <label>Address Detail</label>
            <input type="text" class="form-control" v-model="selectShop.new.shopAddress">
          </div>
          <div class="col-md-3">
            <label>District</label>
            <input type="text" class="form-control" v-model="selectShop.new.shopDistrict">
          </div>
          <div class="col-md-3">
            <label>Sub District</label>
            <input type="text" class="form-control" v-model="selectShop.new.shopSubDistrict">
          </div>
        </div><br>

        <div class="form-row">
          <div class="col-md-3">
            <label>Province</label>
            <input type="text" class="form-control"  v-model="selectShop.new.shopProvince">
          </div>
          <div class="col-md-2">
            <label>Postal Code</label>
            <input type="text" class="form-control"  v-model="selectShop.new.shopPostalCode">
          </div>
          <div class="col-md-3">
            <label>Phone</label>
            <input type="text" class="form-control"  v-model="selectShop.new.shopPhone">
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" @click="addShop()">Add</button>
        <button class="btn btn-danger" @click="selectShop.showNew = false">close</button>
      </template>

    </base-modal>

    <div class="row">
      <div class="col-auto ml-auto">
        <button class="btn btn-primary" @click="createOrder()">Create</button>
      </div>
    </div>

    <base-alert v-if="alert.show" :msg="alert.msg" :color="alert.color" @close="alert.show = false"></base-alert>
  </layout>

</template>

<script>
import layout from '@/views/LAYOUT'
import BaseTable from '@/components/BaseTable'
import BaseModal from '@/components/BaseModal'
import BaseAlert from '@/components/BaseAlert'

import { $api } from '@/service/api'
export default {
  components: {
    layout,BaseTable, BaseModal, BaseAlert
  },
  data() {
    return {
      alert: {
        show: false,
        msg: '',
        color: 'danger'
      },
      header: [
        {name: 'itemName', label: 'Item Name'},
        {name: 'area', label: 'Item Area (M^2)'},
        {name: 'locationName', label: 'Location'},
        {name: 'selectCount', label: 'count'}
      ],
      body: [],
      oldItem: [],
      next: false,
      showModalView: false,
      showModalNew: false,
      selectItem: {
        headerItem: [
          {name: 'itemID', label: 'Item ID'},
          {name: 'itemName', label: 'Item Name'},
          {name: 'area', label: 'Area'},
          {name: 'weight', label: 'Weight'},
          {name: 'totalCount', label: 'Count'}
        ],
        bodyItem: [],
        headerLoc: [
          {name: 'locationName', label: 'Location'},
          {name: 'itemCount', label: 'Item Count'}
        ],
        bodyLoc: [],
        item: {},
        location: {}
      },
      selectShop: {
        shop: {},
        showSelect: false,
        showNew: false,
        header: [
          {name: 'shopID', label: 'Shop ID'},
          {name: 'shopName', label: 'Shop Name'}
        ],
        body: [],
        new:{}
      }
    }
  },
  created() {
    this.fetchItem()
  },
  methods: {
    addShop () {
      if (Object.keys(this.selectShop.new).length >= 7 ) {
        this.selectShop.shop = {...this.selectShop.new}
        this.selectShop.showNew = false
        this.selectShop.new = {}

      } else {
        this.alert = {
          show: true,
          msg: 'Please fill all input',
          color: 'warning'
        }
      }
    },
    selectLocationJa (locationID) {
      let element = this.selectItem.bodyLoc.filter(e => e.locationID === locationID)[0]
      if (element.itemCount < this.selectItem.item.selectCount) {
        this.alert = {
          show: true,
          msg: 'Item shouldn\'t more than stock',
          color: 'warning'
        }
      } else {
        this.selectItem.location = element
      }
    },
    isSameItemLocation (item, arr) {
      for (let i = 0; i < arr.length ; i++) {
        if (arr[i].itemID === item.itemID && arr[i].locationID === item.locationID) return true
        else return false
      }
    },
    pushOldItem () {
      let item = this.selectItem.item
      let location = this.selectItem.location
      if (Object.keys(item).length > 0 && Object.keys(location).length > 0 && item.selectCount > 0 && item.selectCount <= location.itemCount) {
        let newItem = { ...item, ...location, oldIndex: this.oldItem.length}

        if (this.isSameItemLocation(newItem, this.oldItem)) {
          this.alert = {
          show: true,
          msg: 'Can not select same item same location!',
          color: 'warning'
        }
        } else {
          this.body.push(newItem)
          this.closeModalView()
        }
      } else {
        console.log('can not select this!')
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
        } else {
          this.alert = {
          show: true,
          msg: 'Can not fetch item',
          color: 'danger'
        }
        }
      })
    },
    fetchLocationByItem (itemID) {
      $api({ path: `/items/${itemID}/locations`, method: 'get'})
      .then(data => {
        if (data.success) {
          this.selectItem.bodyLoc = data.result
        } else {
          console.log(data);
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
      let shop = this.selectShop.shop
      let orderDetail = this.body
      for (let i = 0; i < orderDetail.length; i++) {
        orderDetail[i].selectCount = orderDetail[i].selectCount*-1
      }
      let newOrderOut = {}
      if (shop.shopID) {
        newOrderOut.oldShop = shop.shopID
        newOrderOut.newShop = null
      } else {
        newOrderOut.oldShop = null
        newOrderOut.newShop = shop
      }
      newOrderOut.orderDetail = orderDetail
      console.log(newOrderOut);
      $api({ path: '/orders/out', method: 'post', data: newOrderOut})
      .then(data => {
        if (data.success) {
          this.body = []
          this.selectShop.shop = {}
          this.alert = {
            show: true,
            msg: 'Create order-out success',
            color: 'success'
        }
        } else {
          this.alert = {
            show: true,
            msg: 'Fail to create order',
            color: 'warning'
          }
        }
      })
    },
    fetchShop () {
      $api({ path: '/shops', method: 'get'})
      .then(data => {
        if (data.success) {
          this.selectShop.body = data.result
        } else {
          console.log(data)
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

<template>
  <layout>
    <h3>Edit Shipping #{{$route.params.shipping_id}}</h3>
    <layout>
      <!-- select car -->
      <h5>Select Car</h5>
      <div class="form-row">
        <div class="col-md-3">
          <label>Model</label>
          <input type="text" class="form-control" placeholder="Model" disabled v-model="selectCar.car.model">
        </div>
        <div class="col-md-3">
          <label>License Plate</label>
          <input type="text" class="form-control" placeholder="License Plate" disabled v-model="selectCar.car.licensePlate">
        </div>
        <div class="col-md-2">
          <label>Status</label>
          <input type="text" class="form-control" placeholder="Status" disabled v-model="selectCar.car.carStatus">
        </div>
        <div class="col-md-2">
          <label>Weight</label>
          <input type="text" class="form-control" placeholder="Weight" disabled v-model="selectCar.car.carWeight">
        </div>
        <div class="col-md-2">
          <label>Area</label>
          <input type="text" class="form-control" placeholder="Area" disabled v-model="selectCar.car.carArea">
        </div>
      </div><br>
      <button class="btn btn-success" type="button" @click="selectCar.showModalView = true; fetchCar()">Select Car</button>
    </layout>
    <!-- end select car -->

    <!-- select driver -->
    <layout>
      <h5>Select Driver</h5>
      <div class="row">
        <div class="col-md-2 ">
          <!-- http://s3.amazonaws.com/37assets/svn/765-default-avatar.png -->
          <img src="../../assets/default_avatar.png" class="img-thumbnail" width="150px" v-if="!selectDriver.driver.employeePhotoUrl">
          <img v-else :src="selectDriver.driver.employeePhotoUrl" class="img-thumbnail" width="150px">
          <!-- <img src="" alt=""> -->
        </div>
        <div class="col-md-4">
          <label>First Name</label>
          <input type="text" class="form-control" placeholder="First Name" disabled v-model="selectDriver.driver.employeeFirstName">
        </div>
        <div class="col-md-4">
          <label>Last Name</label>
          <input type="text" class="form-control" placeholder="Last Name" disabled v-model="selectDriver.driver.employeeLastName">
        </div>
        <div class="col-md-2">
          <label>Phone</label>
          <input type="text" class="form-control" placeholder="Phone" disabled v-model="selectDriver.driver.employeePhone">
        </div>
      </div><br>
      <button class="btn btn-success" @click="selectDriver.showModalView = true; fetchDriver()">Select Driver</button>
    </layout>
    <!-- end select driver -->

    <!-- select order detail -->
    <layout>
      <h5>Select Order Detail</h5>
      <base-table :header="selectItem.header" :hasAction="true" :body="selectItem.body" idName="orderDetailID">
        <template v-slot="row">
          <button class="btn btn-danger" @click="deleteOrderSelect(row.rowId)"
            :disabled="isSelected(selectItem.body[row.rowIndex]['status'])" >delete</button>
          <label class="switch">
            <input type="checkbox" :checked="isSelected(selectItem.body[row.rowIndex]['status'])" @click="toggleOrder(row.rowId, row.rowIndex)">
            <span class="slider"></span>
          </label>
        </template>
      </base-table>
      <button class="btn btn-success" :disabled="showSelectOrder" @click="selectItem.showModalView = true; fetchOrder()">+ Select Order Detail</button>
    </layout>
    <!-- end select order detail -->

    <!-- modal select car -->
    <base-modal v-if="selectCar.showModalView" @close="selectCar.showModalView = false">
      <template v-slot:header><h5>Select Car</h5></template>
      <template v-slot:body>
        <base-table :hasIndex="false" :body="selectCar.body" :header="selectCar.header" :hasAction="true" idName="carID">
          <template v-slot="row">
            <button class="btn btn-success" @click="chooseCar(row.rowId)">select</button>
          </template>
        </base-table>
      </template>
      <template v-slot:footer>
        <button class="btn btn-danger" @click="selectCar.showModalView = false">close</button>
      </template>
    </base-modal>

    <!-- modal select driver -->
    <base-modal v-if="selectDriver.showModalView" @close="selectDriver.showModalView = false">
      <template v-slot:header>
        <h5>Select Driver</h5>
      </template>
      <template v-slot:body>
        <base-table v-if="selectDriver.body.length" :header="selectDriver.header" :body="selectDriver.body" :hasIndex="false" :hasAction="true" idName="employeeID">
          <template v-slot="row">
            <button class="btn btn-success" @click="chooseDriver(row.rowId)">select</button>
          </template>
        </base-table>
        <h6 v-else>All Drivers are not ready</h6>
      </template>
      <template v-slot:footer>
        <button class="btn btn-danger" @click="selectDriver.showModalView = false">close</button>
      </template>
    </base-modal>

    <!-- modal select item -->
    <base-modal v-if="selectItem.showModalView">
      <template v-slot:header>
        <h5 v-if="!selectItem.next">Select Order</h5>
        <h5 v-else>Select Order Detail</h5>
      </template>
      <template v-slot:body>

        <base-table :hasIndex="false" :hasAction="true" v-if="!selectItem.next"
          :header="selectItem.headerModalOrder" :body="selectItem.bodyModalOrder" idName="orderID"
        >
          <template v-slot="row">
            <button class="btn btn-success" @click="selectItem.next = true; fetchOrderDetail(row.rowId)">select</button>
          </template>
        </base-table>

        <base-table :hasIndex="false" :hasAction="true" v-else
          :header="selectItem.headerModalOrderDetail" :body="selectItem.bodyModalOrderDetail" idName="orderDetailID"
        >
          <template v-slot="row">
            <button class="btn btn-warning" v-if="!isInSelectOrder(row.rowId)"
              @click="selectItem.temp.push({...selectItem.bodyModalOrderDetail.filter(e => e.orderDetailID === row.rowId)[0]})">
              select
              </button>
            <button class="btn btn-outline-warning" @click="selectItem.temp.splice(selectItem.temp.indexOf(row.rowId),1)" v-else>cancel</button>
          </template>
        </base-table>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" v-if="selectItem.next" @click="chooseOrderDetail()">submit</button>
        <button @click="closeModalSelectOrder()" class="btn btn-danger">close</button>
      </template>
    </base-modal>

  <base-alert v-if="alert.show" :msg="alert.msg" :color="alert.color" @close="alert.show = false;alert.msg = '';"></base-alert>
  </layout>
</template>

<script>
import layout from '../LAYOUT'
import BaseTable from '@/components/BaseTable'
import BaseModal from '@/components/BaseModal'
import BaseAlert from '@/components/BaseAlert'

import { $api } from '@/service/api'
export default {
  components: {
    layout, BaseTable, BaseModal, BaseAlert
  },
  data() {
    return {
      showSelectOrder: true,
      alert: {
        show: false,
        msg: '',
        color: 'danger'
      },
      selectCar: {
        showModalView: false,
        body: [],
        header: [
          {name: 'carID', label: 'Car ID'},
          {name: 'model', label: 'Model'},
          {name: 'carWeight', label: 'Weight'},
          {name: 'carArea', label: 'Area'}
        ],
        car:{}
      },
      selectDriver: {
        showModalView: false,
        header: [
          {name: 'employeeID', label: 'ID'},
          {name: 'employeeFirstName', label: 'First Name'},
          {name: 'employeeLastName', label: 'Last Name'},
          {name: 'positionName', label: 'Postion'}
        ],
        body: [],
        driver: {}
      },
      selectItem: {
        showModalView: false,
        header: [
          {name: 'orderID', label: 'Order ID'},
          {name: 'orderDetailID', label: 'Order Detail'},
          {name: 'itemName', label: 'Item Name'},
          {name: 'itemCount', label: 'Count'},
          {name: 'area', label: 'Area'},
          {name: 'status', label: 'Status'}
        ],
        body: [], // body for show

        temp: [], // collect orderDetail ID that select (temp)

        headerModalOrder: [
          {name: 'orderID', label: 'Order ID'},
          {name: 'orderType', label: 'Type'},
          {name: 'shopName', label: 'Shop'},
          {name: 'createAt', label: 'Create Time'},
        ],
        bodyModalOrder: [],

        headerModalOrderDetail: [
          {name: 'orderDetailID', label: 'Order Detail'},
          {name: 'itemID', label: 'Item ID'},
          {name: 'itemName', label: 'Item Name'},
          {name: 'area', label: 'Area'},
          {name: 'itemCount', label: 'Count'}
        ],
        bodyModalOrderDetail: [],

        next: false
      }
    }
  },
  created() {
    this.fetchShipping(this.$route.params.shipping_id)
  },
  methods: {
    isSelected (status) {
      if (status === 'done') return true
      else return false
    },
    fetchShipping (shippingID) {
      $api({ path: `/shippings/${shippingID}`, method: 'get'})
      .then(data => {
        if (data.success) {
          this.selectCar.car = data.result.car
          this.selectDriver.driver = data.result.driver
          this.selectItem.body = data.result.orderDetail
          this.showSelectOrder = this.isOrderFinish(data.result.orderDetail)
        }
      })
    },
    isOrderFinish (array) {
      for (let i = 0; i<array.length; i++) {
        if (array[i].status === 'shipping') return false
      }
      return true
    },
    fetchCar () {
      // fetch only cars which status ready
      $api({ path: '/cars', method: 'get'})
      .then(data => {
        if (data.success) {
          this.selectCar.body = data.result.filter(e => e.carStatus === 'ready')
        } else {
          this.alert = {
            show: true,
            msg: 'fetch car error',
            color: 'danger'
          }
        }
      })
    },
    chooseCar (id) {
      let car = {
        car: {oldCar: this.selectCar.car.carID, newCar: id}
      }
      this.editShipping(car)
      this.selectCar.showModalView = false

      // this.selectCar.car = {...this.selectCar.body.filter(e => e.carID === id)[0]}
    },
    fetchDriver () {
      $api({ path: '/employees?positionName=driver&status=ready', method: 'get'})
      .then(data => {
        if (data.success) {
          this.selectDriver.body = data.result
        } else {
          this.alert = {
            show: true,
            msg: 'fetch driver error',
            color: 'danger'
          }
        }
      })
    },
    chooseDriver (id) {
      let driver = {
        driver: {oldDriver: this.selectDriver.driver.employeeID, newDriver: id}
      }
      this.editShipping(driver)
      this.selectDriver.showModalView = false
    },
    fetchOrder () {
      $api({ path: '/orders?orderType=out', method: 'get'})
      .then(data => {
        if (data.success) {
          this.selectItem.bodyModalOrder = data.result
        } else {
          this.alert = {
            show: true,
            msg: 'fetch order error',
            color: 'danger'
          }
        }
      })
    },
    fetchOrderDetail (orderID) {
      $api({ path: `/orders/${orderID}?status=wait` , methods: 'get'})
      .then(data => {
        if (data.success) {
          this.selectItem.bodyModalOrderDetail = data.result
        } else {
          this.alert = {
            show: true,
            msg: 'fetch order detail fail',
            color: 'danger'
          }
        }
      })
    },
    closeModalSelectOrder () {
      this.selectItem.showModalView = false
      this.selectItem.bodyModalOrderDetail = []
      this.selectItem.next = false
      this.selectItem.temp = []
    },
    chooseOrderDetail () {
      this.selectItem.body = [ ...this.selectItem.temp]
      this.closeModalSelectOrder()
    },
    deleteOrderSelect (id) {
      // this.selectItem.body = [ ...this.selectItem.body.filter(e => e.orderDetailID !== id)]
      let deleteOrder = {
        deleteOrderdetail: [id]
      }
      this.editShipping(deleteOrder)
    },
    toggleOrder (id, index) {
      let element = this.selectItem.body[index]
      // toggle from done to shipping (notFinishOrderdetail)
      // toggle from shipping to done (finishOrderdetail)
      var toggle = element.status === 'done' ? {notFinishOrderdetail: id} : {finishOrderdetail: id}
      this.editShipping(toggle)
    },
    editShipping (newData) {
      // newData = {car, driver, addOrderdetail, deleteOrderdetail, finishOrderdetail, notFinishOrderdetail}
      $api({ path: `/shippings/${this.$route.params.shipping_id}`, method: 'put', data: newData})
      .then(data => {
        if (data.success) {
          this.alert = {
            show: true,
            msg: data.message,
            color: 'success'
          }
          this.fetchShipping(this.$route.params.shipping_id)
        } else {
          this.alert = {
            show: true,
            msg: data.message,
            color: 'danger'
          }
        }
      })
    },
    isInSelectOrder (id) {
      return this.selectItem.temp.map(e => e.orderDetailID).indexOf(id) > -1 // check if id is selected
    }
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

</style>

<template>
  <layout>
    <h3>Create Shipping</h3>
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
      <button class="btn btn-success" type="button" @click="selectCar.showModalCreate = true">+ Add Car</button>
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
      <base-table :header="selectItem.header" :hasAction="true">

      </base-table>
      <button class="btn btn-success" @click="selectItem.showModalView = true; fetchOrder()">+ Select Order Detail</button>
    </layout>
    <!-- end select order detail -->

    <div class="row">
      <div class="col-auto ml-auto">
        <button class="btn btn-primary">Create</button>
      </div>
    </div>

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

    <!-- modal create car -->
    <base-modal v-if="selectCar.showModalCreate" @close="selectCar.showModalCreate = false">
      <template v-slot:header><h5>Add Car</h5></template>
      <template v-slot:body>
        <div class="form-row">
        <div class="col">
          <label >Area</label>
          <input type="number" class="form-control" min="0" v-model="selectCar.newCar.carArea"
            placeholder="Enter area of this car (number)">
        </div>
        <div class="col">
          <label >Weight</label>
          <input type="number" class="form-control" min="0" v-model="selectCar.newCar.carWeight"
            placeholder="Enter max weight for this car">
        </div>
      </div><br>
      <div class="form-row">
        <div class="col">
          <label >License Plate</label>
          <input type="text" class="form-control" v-model="selectCar.newCar.licensePlate"
            placeholder="Ex. AB 2512">
        </div>
        <div class="col">
          <label >Model</label>
          <input type="text" class="form-control" v-model="selectCar.newCar.model"
            placeholder="Enter Car Model">
        </div>
      </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" @click="addCar()">submit</button>
        <button class="btn btn-danger" @click="selectCar.showModalCreate = false">close</button>
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
      <template v-slot:header><h5>Select Order</h5></template>

      <template v-slot:footer>
        <button @click="selectItem.showModalView = false" class="btn btn-danger">close</button>
      </template>
    </base-modal>


  </layout>
</template>

<script>
import layout from '../LAYOUT'
import BaseTable from '@/components/BaseTable'
import BaseModal from '@/components/BaseModal'
import { $api } from '@/service/api'
export default {
  components: {
    layout, BaseTable, BaseModal
  },
  data() {
    return {
      selectCar: {
        showModalView: false,
        showModalCreate: false,
        body: [],
        header: [
          {name: 'carID', label: 'Car ID'},
          {name: 'model', label: 'Model'},
          {name: 'carWeight', label: 'Weight'},
          {name: 'carArea', label: 'Area'}
        ],
        car:{},
        newCar: {}
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
          {name: 'area', label: 'area'}
        ],
        body: [],
        orderDetail: [],
        headerOrder: [],
        bodyOrder: [],
        headerOrderDetail: [],
        bodyOrderDetail: [],
        next: false
      }
    }
  },
  methods: {
    fetchCar () {
      // fetch only cars which status ready
      $api({ path: '/cars', method: 'get'})
      .then(data => {
        if (data.success) {
          this.selectCar.body = data.result.filter(e => e.carStatus === 'ready')
        }
      })
    },
    chooseCar (id) {
      this.selectCar.showModalView = false
      this.selectCar.car = {...this.selectCar.body.filter(e => e.carID === id)[0]}
    },
    addCar () {
      this.selectCar.car = { ...this.selectCar.newCar }
      this.selectCar.newCar = {}
      this.selectCar.showModalCreate = false
    },
    fetchDriver () {
      $api({ path: '/employees?positionName=driver&status=ready', method: 'get'})
      .then(data => {
        if (data.success) {
          this.selectDriver.body = data.result
        }
      })
    },
    chooseDriver (id) {
      $api({ path: `/employees/${id}`})
      .then(data => {
        if (data.success) {
          this.selectDriver.driver = data.result
          this.selectDriver.showModalView = false
        }
      })
    },
    fetchOrder () {
      $api({ path: '/orders', method: 'get'})
      .then(data => {
        console.log(data)
        if (data.success) {
          this.selectItem
        }
      })
    }
  },
}
</script>

<style>
</style>

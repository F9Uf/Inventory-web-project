<template>
  <layout>
    <h3>Create Employee</h3>
    <!-- Profile from -->
    <layout>
      <h5>Profile</h5>
      <div class="form-row">
        <div class="col-md-4">
          <label>First Name</label>
          <input type="text" class="form-control" placeholder="firsr name" v-model="dataEmployee.employeeFirstName">
        </div>
        <div class="col-md-4">
          <label>Last Name</label>
          <input type="text" class="form-control" placeholder="last name" v-model="dataEmployee.employeeLastName">
        </div>
        <div class="col-md-3">
          <label>Sex</label>
          <select class="form-control" v-model="dataEmployee.sex">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-7">
          <label>Photo Url</label>
          <input type="text" class="form-control" placeholder="http:url" v-model="dataEmployee.employeePhotoUrl">
        </div>
        <div class="col-md-4">
          <label>Phone</label>
          <input type="text" class="form-control" placeholder="09xxxxxxxx" v-model="dataEmployee.employeePhone">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-5">
          <label>Email</label>
          <input type="email" class="form-control" placeholder="eample@exmaple.example" v-model="dataEmployee.employeeEmail">
        </div>
        <div class="col-md-3">
          <label>Salary</label>
          <input type="number" class="form-control" placeholder="numberic" v-model="dataEmployee.salary"> 
        </div>
        <div class="col-md-3">
          <label>Stock</label>          
          <select class="form-control" v-model="dataEmployee.stockID">
            <option value="00000001">Bangkok</option>
            <option value="00000002">Suphanburi</option>
            <option value="00000003">Ratchaburi</option>
            <option value="00000004">Chonburi</option>
            <option value="00000005">Songkla</option>
            <option value="00000006">Nakornratchsima</option>
            <option value="00000007">Khonkaen</option>
            <option value="00000008">Phisanulok</option>
            <option value="00000009">Changmai</option>
            <option value="00000010">Phuket</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-4">
          <label>Username</label>
          <input type="text" class="form-control" placeholder="username" v-model="dataEmployee.username"> 
        </div>
        <div class="col-md-4">
          <label>Password</label>
          <input type="text" class="form-control" placeholder="password" v-model="dataEmployee.password">
          <button class="btn btn-success" @click="fetchEmployee()">test fetch</button>
        </div>
      </div>
    </layout>
  <!-- Position select / add -->
    <layout>
      <h5>Position</h5>
      <div class="form-row">
        <div class="col-md-5">
          <input type="text" class="form-control" placeholder="role ex.manager, staff, .." disabled v-model="selectPosition.Pos.positionName"><br>

          <button class="btn btn-success" @click="selectPosition.showModalSelect = true; fetchPos()">Select position</button>
          <button class="btn btn-success" @click="selectPosition.showModalCreate = true">Add position</button>
        </div>
        <div class="col-md-5">
          <input type="text" class="form-control" placeholder="position ex.manager, staff, .." disabled v-model="selectPosition.Pos.positionSpecific">
        </div>
      </div>
    </layout>
    <layout>
    <!-- Address select / add -->
      <h5>Address</h5>
      <div class="form-row">
        <div class="col-md-11">
          <label for="">Address Detail</label>
          <input type="text" class="form-control" placeholder="Address " disabled v-model="selectAddress.address.addressDetail">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6">
          <label for="">District</label>
          <input type="text" class="form-control" placeholder="District" disabled v-model="selectAddress.address.district">
        </div>
        <div class="col-md-5">
          <label for="">Sub District</label>
          <input type="text" class="form-control" placeholder="Sub-District" disabled v-model="selectAddress.address.subDistrict">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6">
          <label for="">Province</label>
          <input type="text" class="form-control" placeholder="province" disabled v-model="selectAddress.address.province ">
        </div>
        <div class="col-md-5">
          <label for="">Zip code</label>
          <input type="number" class="form-control" placeholder="Zip" disabled v-model="selectAddress.address.postalCode">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md mr-auto">
          <br>
          <button class="btn btn-success " @click="selectAddress.showModalSelect = true; fetchAddress()">Select Address</button>
          <button class="btn btn-success " @click="selectAddress.showModalCreate = true">Add Address</button>
        </div>
      </div>
    </layout>
    <div class="row">
      <div class="col-auto ml-auto">
        <button class="btn btn-success" @click="putAllData()">Create</button>
      </div>
    </div>
    <!-- Modal for select position-->
    <base-modal v-if="selectPosition.showModalSelect" @close="selectPosition.showModalSelect = false">
      <template v-slot:header>
        <h5>Select position</h5>
      </template>
      <template v-slot:body>
        <base-table :header="selectPosition.header" :body="selectPosition.body"
        :hasAction="true" :hasIndex="true"
        idName="positionID">
          <template v-slot="row">
            <button class="btn btn-success" @click="choosePos(row.rowId)">Select</button>
          </template>
        </base-table>
      </template>
      <template v-slot:footer>
        <div class="row">
          <div class="col-auto ml-auto">
            <button class="btn btn-danger" @click="selectPosition.showModalSelect= false">Close</button>
          </div>
        </div>
      </template>
    </base-modal>

    <!--Modal for add Position  -->
    <base-modal v-if="selectPosition.showModalCreate" @close="selectPosition.showModalCreate = false">
      <template v-slot:header>
        <h5>Add position</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col-md">
            <label>Role</label>
            <select class="form-control" v-model="selectPosition.newPos.positionName">
              <option value="manager">manager</option>
              <option value="staff">staff</option>
              <option value="driver">driver</option>
            </select>
          </div>
          <div class="col-md">
            <label for="">Position</label>
            <input type="text" class="form-control" placeholder="enter employee position"
            v-model="selectPosition.newPos.positionSpecific">
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="row">
          <div class="col-auto ml-auto">
            <button class="btn btn-success" @click="addPos(); selectPosition.showModalCreate= false">Submit</button>
            <button class="btn btn-danger" @click="selectPosition.showModalCreate= false">Close</button>
          </div>
        </div>
      </template>
    </base-modal>

    <!-- Modal for select Address -->
    <base-modal v-if="selectAddress.showModalSelect" @close="selectAddress.showModalSelect = false">
      <template v-slot:header>
        <h5>Select Address</h5>
      </template>
      <template v-slot:body>
        <base-table :header="selectAddress.header" :body="selectAddress.body"
        :hasAction="true" :hasIndex="true"
        idName="addressID">
          <template v-slot="row">
            <button class="btn btn-success" @click="chooseAddress(row.rowId)">Select</button>
          </template>
        </base-table>
      </template>
      <template v-slot:footer>
        <div class="row">
          <div class="col-auto ml-auto">
            <button class="btn btn-danger" @click="selectAddress.showModalSelect = false">Close</button>
          </div>
        </div>
      </template>
    </base-modal>

    <!-- Modal fo Add Address -->
    <base-modal v-if="selectAddress.showModalCreate" @close="selectAddress.showModalCreate = false">
      <template v-slot:header>
        <h5>Add Address</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
        <div class="col-md">
          <label for="">Address Detail</label>
          <input type="text" class="form-control" placeholder="Address " v-model="selectAddress.newAddress.addressDetail">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md">
          <label for="">District</label>
          <input type="text" class="form-control" placeholder="District" v-model="selectAddress.newAddress.district">
        </div>
        <div class="col-md">
          <label for="">Sub District</label>
          <input type="text" class="form-control" placeholder="Sub-District" v-model="selectAddress.newAddress.subDistrict">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md">
          <label for="">Province</label>
          <input type="text" class="form-control" placeholder="province" v-model="selectAddress.newAddress.province">
        </div>
        <div class="col-md">
          <label for="">Zip code</label>
          <input type="number" class="form-control" placeholder="Zip" v-model="selectAddress.newAddress.postalCode">
        </div>
      </div>
      </template>
      <template v-slot:footer>
        <div class="row">
          <div class="col-auto ml-auto">
            <button class="btn btn-success" @click="addAddress(); selectAddress.showModalCreate= false">Submit</button>
            <button class="btn btn-danger" @click="selectAddress.showModalCreate= false">Close</button>
          </div>
        </div>
      </template>
    </base-modal>

    <base-alert v-if="alert.show" :msg="alert.msg" :color="alert.color" @close="alert.show = false"></base-alert>
  </layout>
</template>

<script>
import layout from '../LAYOUT'
import TheModal from '@/components/TheModal'
import BaseTable from '@/components/BaseTable'
import BaseModal from '@/components/BaseModal'
import { $api } from '@/service/api'
import BaseAlert from '@/components/BaseAlert'

export default {
  components: {
    layout,TheModal,BaseTable,BaseModal,BaseAlert
  },
  data() {
    return {
      selectPosition: {
        showModalSelect: false,
        showModalCreate: false,
        header: [
              {
                name: 'positionID',                label: 'Position ID'
              },
              {
                name: 'positionName',                label: 'position Name'
              },
              {
                name: 'positionSpecific',                label: 'Specific role'
              }
        ],
        body:[],
        Pos:{},
        newPos:{
          positionName: 'manager'
        }
      },
      selectAddress: {
        showModalSelect: false,
        showModalCreate: false,
        header: [
          {
            name: 'addressDetail',            label: 'Detail'
          },
          {
            name: 'district',            label: 'District'
          },
          {
            name: 'subDistrict',            label: 'Sub district'
          },
          {
            name: 'province',            label: 'province'
          },
          {
            name: 'postalCode',            label: 'Zip Code'
          }
        ],
        body:[],
        address:{},
        newAddress:{}

      },
      dataEmployee:{
        stockID: '00000001',
        sex: 'male'
      },
      alert:{
        show: false,
        msg: '',
        color: 'danger'
      }
    }
  },
  methods: {
    // position Methods
    fetchPos() {
      $api({path: '/positions', method: 'get'})
      .then(data => {
        this.selectPosition.body = data.result
        console.log(data)
      })
    },
    choosePos(id) {
      console.log(id)
      this.selectPosition.showModalSelect = false
      this.selectPosition.Pos = {...this.selectPosition.body.filter(e => e.positionID === id)[0]}

    },
    addPos() {
      this.selectPosition.Pos = {...this.selectPosition.newPos}
      this.selectPosition.newPos ={}
      this.selectPosition.showModalCreate = false
    },
    // Address Methods
    fetchAddress() {
      $api({path: '/addresses', method: 'get'})
      .then(data => {
        this.selectAddress.body = data.result
        console.log(data)

      })
    },
    chooseAddress(id){
      console.log(id)
      this.selectAddress.address = {...this.selectAddress.body.filter(e => e.addressID === id)[0]}
      this.selectAddress.showModalSelect = false

    },
    addAddress() {
      this.selectAddress.address = {...this.selectAddress.newAddress}
      this.selectAddress.newAddress = {}
      this.selectAddress.showModalCreate = false
    },
    // Employees Methods
    // fetchEmployee() {
    //   $api({path: '/employees/0000000001', method: 'get'})
    //   .then(data => {
    //     this.dataEmployee.body = data.result
    //     console.log(data)
        
    //   })
    // },
    putAllData() {
      let employeeData = this.dataEmployee
      let newData = {
        ...employeeData,
      }      
      if (this.selectPosition.Pos.positionID) {
        // old
        newData.newPosition = null
        newData.oldPosition = {positionID: this.selectPosition.Pos.positionID}
      } else {
        //new
        newData.newPosition = {
          positionName: this.selectPosition.Pos.positionName,
          positionSpecific: this.selectPosition.Pos.positionSpecific
        }
      }
      if (this.selectAddress.address.addressID) {
        //old
        newData.newAddress = null
        newData.oldAddress = { addressID: this.selectAddress.address.addressID }
      } else {
        // new
        newData.newAddress = {
          addressDetail: this.selectAddress.address.addressID,
          subDistrict: this.selectAddress.address.subDistrict,
          district: this.selectAddress.address.district,
          province: this.selectAddress.address.province,
          postalCode: this.selectAddress.address.postalCode
        }
      }
      console.log(newData)

      $api({ path : '/employees', method : 'post', data: newData})
      .then(data => {
        if(data.success) {
          this.alert.show = true
          this.alert.msg = 'Created Employee information Commpleted'
          this.alert.color = 'success'
        } else {
          this.alert.show = true
          this.alert.msg = 'Create Employee information Error'
          this.alert.color = 'danger'
        }
        console.log(data)
        
      })
    }

    // create employee

      /**
       * let employeeData = this.dataEmploee
       * let newData = {
       *  emploeeData,
       * this.seleectpodop
       * }
       *
       * if (this.selectPos.Pos.postionID) {
       *  // select old positoin
       *  newData.newPosition = null
       *  newData.oldPosition = {positionID: this.selectPos.Pos.postionID}
       * } else {
       *  // new position
       *  newData.newPosition = {
       *  postionName: this.selectPos.Pos.postionnName,
       *  positionSpecific: this.selclk......
       * }
       * newData.oldPosition = null
       * }
       *
       *
       * if(addressID) {
       *
       * }else {
       *
       * }
       *
       * $api({ path: '/' ,method: 'post', data: newData})
       * .then(data => {
       *  if( data.success)
       * })
       */
  }

}
</script>

<style>

</style>

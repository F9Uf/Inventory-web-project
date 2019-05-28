<template>
  <layout>
    <h3>Create Employee</h3>
    
    <layout>
      <h5>Profile</h5>
      <div class="form-row">
        <div class="col-md-4">
          <label>First Name</label>
          <input type="text" class="form-control">
        </div>
        <div class="col-md-4">
          <label>Last Name</label>
          <input type="text" class="form-control">
        </div>
        <div class="col-md-3">
          <label>Sex</label>
          <select class="form-control">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-7">
          <label>Photo Url</label>
          <input type="text" class="form-control">
        </div>
        <div class="col-md-4">
          <label>Phone</label>
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-5">
          <label>Email</label>
          <input type="email" class="form-control">
        </div>
        <div class="col-md-3">
          <label>Username</label>
          <input type="text" class="form-control">
        </div>
        <div class="col-md-3">
          <label>Password</label>
          <input type="text" class="form-control">
        </div>
      </div>
    </layout>

    
    <layout>
      <h5>Position</h5>
      <div class="form-row">
        <div class="col-md-5">
          <input type="text" class="form-control" placeholder="position ex.manager, staff, .." disabled><br>
          <button class="btn btn-success" @click="selectPosition.showModalSelect = true; fetchPos()">Select position</button>
          <button class="btn btn-success">Add position</button>
        </div>
      </div>
    </layout>
    <layout>
      <h5>Address</h5>
      <div class="form-row">
        <div class="col-md-5">
          <input type="text" class="form-control" placeholder="123/45 rd.pacha-u-tiss bang mod " disabled><br>
          <button class="btn btn-success ">Select Address</button>
          <button class="btn btn-success ">Add Address</button>
        </div>
      </div>
    </layout>
    <div class="row">
      <div class="col-auto ml-auto">
        <button class="btn btn-success">Create</button>  
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
              <button class="btn btn-success" @click="selectPosition.showModalSelect= false">Select</button>
            </template>
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="selectPosition.showModalSelect= false">Close</button>  
            </div>
          </div>
        </template>        
      </base-modal>             
  </layout>

 
  
  
          
    
</template>

<script>
import layout from '../LAYOUT'
import TheModal from '@/components/TheModal'
import BaseTable from '@/components/BaseTable'
import BaseModal from '@/components/BaseModal'
import { $api } from '@/service/api'

export default {
  components: {
    layout,TheModal,BaseTable,BaseModal
  },  
  data() {
    return {
      selectPosition: {
        showModalSelect: false,
        showModalCreate: false,
        selectPosiotion: {},
        header: [
          {
                name: 'positionID',
                label: 'Position ID'
              },
              {
                name: 'positionName',
                label: 'position Name'
              },
              {
                name: 'positionSpecific',
                label: 'Specific role'
              }
        ],
        body:[],
      },
      
      
    }
  },
  methods: {
        fetchPos() {
          $api({path: '/positions', methods: 'get'})
          .then(data => {
            this.selectPosition.body = data.result
            console.log(data)
          })
        },
        seclectPos() {

        }
      }

}
</script>

<style>

</style>

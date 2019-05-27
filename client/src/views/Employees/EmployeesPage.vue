<template>
    <layout>
    <h3>Employees Information</h3><br>

    <base-table :header="header" :body="body" :hasAction="true" idName="employeeID" :hasIndex="true">
      <template v-slot="row">
        <div class="btn-group" role="group">
          <button class="btn btn-success" @click="$router.push(`/employees/${row.rowId}`)">view</button>
          <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
        </div>
      </template>
    </base-table>
    
    <h5 v-if="!body">No Employee</h5>

    <the-modal v-if="showModal" @close="showModal = false" @update="updateData">
      <template v-slot:header>
        <h5>Edit Information</h5>
      </template>
      <template v-slot:body>
        <div class="form-row">
          <div class="col">
             <label >First Name</label>
            <input type="text" class="form-control" v-model="editEmployee.employeeFirstName">
          </div>
          <div class="col">
             <label >Last Name</label>
            <input type="text" class="form-control" v-model="editEmployee.employeeLastName">
          </div><br>
        </div>
        <div class="form-row">
            <div class="col">
             <label >Photo URL</label>
            <input type="text" class="form-control" v-model="editEmployee.employeePhotoUrl">
          </div><br>
        </div>
        <div class="form-row">
            <div class="col">
            <label >Position</label>
              <select v-model="editEmployee.positionName" class="form-control">
              <option value="manager">manager</option>
              <option value="staff">staff</option>
              <option value="shopkeeper">shopkeeper</option>
              <option value="deliverer">deliverer</option>
            </select>
          </div>
          <div class="col">
             <label >Phone</label>
            <input type="number" class="form-control" v-model="editEmployee.employeePhone">
          </div>
        </div>

      </template>
    </the-modal>

  </layout>
</template>

<script>
import layout from '../LAYOUT'
import TheTable from '@/components/TheTable'
import TheModal from '@/components/TheModal'
import { $api } from '@/service/api'
import BaseTable from '@/components/BaseTable'

export default {
    components: {
        layout, BaseTable, TheModal
    },
    data() {
        return{
            header: [
              {
                name: 'employeeID',
                label: 'Employee ID'
              },
              {
                name: 'employeeFirstName',
                label: 'First Name'
              },
              {
                name: 'employeeLastName',
                label: 'Last Name'
              },
              {
                name: 'employeePhone',
                label: 'Phone'
              },
              {
                name: 'positionName',
                label: 'Position'
              },
              
              ],
            body: null,
            editEmployee: {},
            selectEmployee: {},
            showModal: false
        }

    },
    created(){
        this.fetchEmployees()
    },
    methods: {
        deleteData (value) {
            $api({path: `/employees/${value}`,method: 'delete'})
            .then(data => {
                this.fetchEmployees()
                console.log(data);
                
            }) 
        },
        fetchEmployees() {
            $api({path: '/employees', method:'get'})
            .then( data => {
                this.body = data.result
                console.log(this.body);
            })
                        
        }
    }

}
</script>

<style>

</style>

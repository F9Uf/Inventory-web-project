<template>
    <layout>        
        <h3>Employee #{{ $route.params.id }} Informations</h3>
        <div class="row" v-if="body.employeePhotoUrl">
            <div class="col-auto mx-auto">
                <div class="img-select align-self-center align-self-lg-stretch">
                <img :src="body.employeePhotoUrl" width="160px" class="rounded-circle">
                </div>  
          </div>
        </div><br><br><br>
        <div class="row">            
            <div class="col">
                <label >First Name: </label>
                    {{body.employeeFirstName}}
            </div>
            
            <div class="col">
                <label >Last Name:</label>
                    {{body.employeeLastName}}
            </div>
        </div><br>
        <div class="row">
            <div class="col">
                <label >Sex: </label>
                    {{body.sex}}
            </div>
        </div><br>
        <div class="row">            
            <div class="col">
                <label >Position: </label>
                    {{body.positionName}}
            </div>            
            <div class="col">
                <label >Salary:</label>
                    {{body.salary}}
            </div>
        </div><br>
        <div class="row">            
            <div class="col">
                <label >Phone: </label>
                    {{body.employeePhone}}
            </div>
            <div class="col">
                <label >Email:</label>
                    {{body.employeeEmail}}
            </div>
        </div><br>
        <div class="row">            
            <div class="col">
                <button class="btn btn-warning" @click="editData">edit</button>
            </div>
            <div class="col">
                <button class="btn btn-success" @click="$router.push(`/employees`)">Back</button>
            </div>            
           </div>
       <!--  modal edit data-->
    <the-modal v-if="showModal" @close="showModal = false" @update="updateData">
      <template v-slot:header>
        <h5>Edit Information</h5>
      </template>
      <template v-slot:body>
        <div class="row">
          <div class="col">
             <label >First Name</label>
            <input type="text" class="form-control" v-model="editEmployee.employeeFirstName">
          </div>
          <div class="col">
             <label >Last Name</label>
            <input type="text" class="form-control" v-model="editEmployee.employeeLastName">
          </div><br>
        </div>
        <div class="row">
            <div class="col">
             <label >Photo URL</label>
            <input type="text" class="form-control" v-model="editEmployee.employeePhotoUrl">
          </div><br>
        </div>
        <div class="row">
            <div class="col">
            <label >Sex</label>
                <select v-model="editEmployee.sex" class="form-control">
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
            </div>
            <div class="col">
            <label >Position</label>
                <select v-model="editEmployee.positionID" class="form-control">
                <option value="01">manager</option>
                <option value="02">staff</option>
                <option value="03">deliverer</option>
                </select>
            </div>            
        </div>
        <div class="row">
            <div class="col">
                <label >Phone</label>
                <input type="number" class="form-control" v-model="editEmployee.employeePhone">
            </div>
            <div class="col">
                <label >Email</label>
                <input type="text" class="form-control" v-model="editEmployee.employeeEmail">
            </div>
        </div>

      </template>
    </the-modal>
    </layout>    
</template>

<script>
import layout from '../LAYOUT'
import TheModal from '@/components/TheModal'
import { $api } from '@/service/api'
import { required, decimal, minValue } from 'vuelidate/lib/validators'
import BaseAlert from '@/components/BaseAlert'

export default {
    components: {
        layout, BaseAlert, TheModal
    },
    data() {
        return{
            body: null,
            editEmployee: {},            
            showModal: false
        }

    },
    created(){
        this.fetchEmployee()
    },
    methods: {
        
        editData () {
            this.showModal = true
            this.editEmployee = {...this.body}
        },
        fetchEmployee() {
            $api({path: `/employees/${ this.$route.params.id }`, method:'get'})
            .then( data => {
                this.body = data.result
                console.log(this.body); 
            })
                        
        },
        updateData () {
            $api({ path: `/employees/${this.editEmployee.employeeID}`, method: 'put', data: this.editEmployee})
            .then(data => {
                this.showModal = false
                this.fetchEmployee()

            console.log(data);
            
            })
            
        }
    }

}
</script>

<style>

</style>

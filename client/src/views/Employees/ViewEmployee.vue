<template>
  <layout>
    <h3>Employee #{{ $route.params.id }} Informations</h3>
    <div class="row" v-if="body.employeePhotoUrl">
      <div class="col-auto mx-auto">
        <div class="img-select align-self-center align-self-lg-stretch">
          <img :src="body.employeePhotoUrl" width="160px" class="rounded-circle">
        </div>
      </div>
    </div>
    <br>
    <br>
    <br>
    <div class="row">
      <div class="col">
        <label>First Name:</label> {{body.employeeFirstName}}
      </div>

      <div class="col">
        <label>Last Name:</label> {{body.employeeLastName}}
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col">
        <label>Sex:</label> {{body.sex}}
      </div>
      <div class="col">
        <label>Address: </label> {{body.employeeAddress}}
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col">
        <label>Position:</label> {{body.positionName}}
      </div>
      <div class="col">
        <label>Salary:</label> {{body.salary}}
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col">
        <label>Phone:</label> {{body.employeePhone}}
      </div>
      <div class="col">
        <label>Email:</label> {{body.employeeEmail}}
      </div>
    </div>
    <br>
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
            <label>First Name</label>
            <input type="text" class="form-control" 
            :class="{'is-nvalid' :$v.editEmployee.employeeFirstName.$error}"
            v-model="$v.editEmployee.employeeFirstName.$model">
          </div>
          <div class="col">
            <label>Last Name</label>
            <input type="text" class="form-control" 
            :class="{'is=invalid' :$v.editEmployee.employeeLastName.$error}"
            v-model="$v.editEmployee.employeeLastName.$model">
            <div class="invalid-feedback">Please enter Lastname</div>
          </div>
          <br>
        </div>
        <div class="row">
          <div class="col">
            <label>Photo URL</label>
            <input type="text" class="form-control" 
            :class="{'is-invalid' :$v.editEmployee.employeePhotoUrl.$error}"
            v-model="$v.editEmployee.employeePhotoUrl.$model">
            <div class="invalid-feedback">Please enter Url</div>
          </div>
          <br>
        </div>
        <div class="row">
          <div class="col">
            <label>Sex</label>
            <select v-model="editEmployee.sex" class="form-control">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="col">
            <label>Address</label>
            <input type="text" class="form-control" v-model="editEmployee.employeeAddress">
            <div class="invalid-feedback">Please enter information</div>
          </div>
          <div class="col">
            <label>Position</label>
            <select v-model="editEmployee.positionID" class="form-control">
              <option value="01">manager</option>
              <option value="02">staff</option>
              <option value="03">deliverer</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Phone</label>
            <input type="text" class="form-control" 
            :class="{'is-invalid': $v.editEmployee.employeePhone.$error}"
            v-model="$v.editEmployee.employeePhone.$model"
            placeholder="Enter phone number ex.09xxxxxxxx">
            <div class="invalid-feedback">Please enter phone number</div>
          </div>
          <div class="col">
            <label>Email</label>
            <input type="text" class="form-control" 
            :class="{'is-invalid': $v.editEmployee.employeeEmail.$error}"
            v-model="$v.editEmployee.employeeEmail.$model">
            <div class="invalid-feedback">Please enter Email</div>
          </div>
        </div>
      </template>
    </the-modal>
    <base-alert v-if="alert.show" :msg="alert.msg" :color="alert.color" @close="alert.show = false"></base-alert>
  </layout>
</template>

<script>
import layout from "../LAYOUT";
import TheModal from "@/components/TheModal";
import { $api } from "@/service/api";
import { required, decimal, minValue ,email} from "vuelidate/lib/validators";
import BaseAlert from "@/components/BaseAlert";

export default {
  components: {
    layout,BaseAlert,TheModal
  },
  data() {
    return {
      body: {},
      editEmployee: {},
      showModal: false,
      alert: {
        show: false,
        msg: '',
        color: 'warning'
      }
    }
  },
  validations :{
    editEmployee: {
      employeeFirstName: {required},
      employeeLastName: {required},
      
      employeeEmail: {required,email},
      employeePhone: {required,decimal,minValue},
      salary: {required,minValue,decimal}

    }

  },
  created() {
    this.fetchEmployee();
  },
  methods: {
    editData() {
      this.showModal = true;
      this.editEmployee = { ...this.body };
      delete this.editEmployee['positionName']
      delete this.editEmployee['stockName']
    },
    fetchEmployee() {
      $api({ path: `/employees/${this.$route.params.id}`, method: "get" }).then(
        data => {
          if (data.success) {
            this.body = data.result;
          } else {
            this.alert = {
              show: true,
              msg: data.message,
              color: 'danger'
            }
          }
          console.log(data);
          
        }
      );
    },
    updateData() {
      if (!this.$v.invalid) {
        $api({
          path: `/employees/${this.editEmployee.employeeID}`,
          method: "put",data: this.editEmployee})
          .then(data => {
          if (data.success) {
            this.editEmployee = {}
            this.alert ={
              show: true,
              msg: data.message,
              color: 'success'
            }            
            this.fetchEmployee();
          } else {
            this.alert = {
              show: true,
              msg: data.message || 'update error',
              color: 'danger'
            }
          }
          this.showModal = false;
          console.log(data);
        });
      }
        
    }
  }
};
</script>

<style>
</style>

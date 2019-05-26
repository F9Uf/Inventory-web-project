<template>
  <layout>
    <h3>Add New Supplier</h3><br>
    <div class="form-row">
      <div class="col">
        <label >Supplier Name</label>
        <input type="text" class="form-control"
          :class="{'is-invalid': $v.newSup.supplierName.$error}"
          v-model="$v.newSup.supplierName.$model"
          placeholder="Enter Supplier Name">
        <div class="invalid-feedback">Please enter supplier name</div>
      </div>
    </div><br>

    <div class="form-row">
      <div class="col">
        <label >Address</label>
        <textarea  class="form-control" :class="{'is-invalid': $v.newSup.supplierAddress.$error}"
          rows="3" v-model="$v.newSup.supplierAddress.$model"
          placeholder="Enter Supplier Address"></textarea>
        <div class="invalid-feedback">Please enter Address</div>
      </div>
    </div><br>

    <div class="form-row">
      <div class="col">
        <label >Phone</label>
        <input type="text" class="form-control"
          :class="{'is-invalid': $v.newSup.supplierPhone.$error}"
          v-model="$v.newSup.supplierPhone.$model"
          placeholder="Ex. 023456789"
        >
        <div class="invalid-feedback">Please enter Supplier Phone</div>
      </div>
      <div class="col">
        <label >Email</label>
        <input type="text" class="form-control"
          :class="{'is-invalid': $v.newSup.supplierEmail.$error || send}"
          v-model="$v.newSup.supplierEmail.$model"
          placeholder="Ex. hello@world.com"
          >
        <div class="invalid-feedback">Please enter email</div>
      </div>
    </div>

    <br>
    <div class="row justify-content-between">
      <div class="col-auto">
        <button class="btn btn-success" @click="$router.push('/suppliers')">« Back to Suppliers</button>
        </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="addNewSup()">+ New</button>
      </div>
    </div>

    <base-alert v-if="alert.show" :msg="alert.msg" :color="alert.color" @close="alert.show = false"></base-alert>
  </layout>
</template>

<script>
import layout from '../LAYOUT'
import BaseAlert from '@/components/BaseAlert'

import { required, email } from 'vuelidate/lib/validators'

import { $api } from '@/service/api'

export default {
  components: {
    layout, BaseAlert
  },
  data() {
    return {
      newSup: {
        supplierName: '',
        supplierPhone: '',
        supplierEmail: '',
        supplierAddress: '',
      },
      alert: {
        show: false,
        msg: '',
        color: 'warning'
      },
      send: false
    }
  },
  validations: {
    newSup: {
      supplierName: {required},
      supplierAddress: {},
      supplierPhone: {required},
      supplierEmail: {required, email}
    }
  },
  methods: {
    addNewSup () {
      if (!this.$v.$invalid) {
        $api({ path: '/suppliers', method: 'post', data: this.newSup})
        .then(data => {
          if (data.success) {
            this.alert = {
              show: true,
              msg: data.message,
              color: 'primary'
            }
            this.send = true
            this.newSup = {
              supplierName: ' ',
              supplierPhone: ' ',
              supplierEmail: ' ',
              supplierAddress: ' ',
            }
          } else {
            this.alert = {
              show: true,
              msg: data.message,
              color: 'danger'
            }
          }
        }).catch(err => {
          this.alert = {
            show: true,
            msg: 'err',
            color: 'danger'
          }
        })
      }
    }
  },
}
</script>

<style>

</style>

<template>
  <layout>
    <h3>Add New Car</h3><br>
    <div class="form-row">
      <div class="col">
        <label >Area</label>
        <input type="number" class="form-control" min="0"
          :class="{'is-invalid': $v.newCar.carArea.$error}"
          v-model="$v.newCar.carArea.$model"
          placeholder="Enter area of this car (number)">
        <div class="invalid-feedback">Please enter car area</div>
      </div>
      <div class="col">
        <label >Weight</label>
        <input type="number" class="form-control" min="0"
        :class="{'is-invalid': $v.newCar.carWeight.$error}"
          v-model="$v.newCar.carWeight.$model"
          placeholder="Enter max weight for this car">
        <div class="invalid-feedback">Please enter car weight</div>
      </div>
    </div><br>
    <div class="form-row">
      <div class="col">
        <label >License Plate</label>
        <input type="text" class="form-control"
          :class="{'is-invalid': $v.newCar.licensePlate.$error}"
          v-model="$v.newCar.licensePlate.$model"
          placeholder="Ex. AB 2512"
        >
        <div class="invalid-feedback">Please enter License Plate</div>
      </div>
      <div class="col">
        <label >Model</label>
        <input type="text" class="form-control"
          :class="{'is-invalid': $v.newCar.model.$error}"
          v-model="$v.newCar.model.$model"
          placeholder="Enter Car Model"
          >
        <div class="invalid-feedback">Please enter Model</div>
      </div>
    </div>

    <br>
    <div class="row justify-content-between">
      <div class="col-auto">
        <button class="btn btn-success" @click="$router.push('/cars')">« Back to Cars</button>
        </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="addNewCar()">+ New</button>
      </div>
    </div>

    <base-alert v-if="alert.show" :msg="alert.msg" :color="alert.color" @close="alert.show = false"></base-alert>
  </layout>
</template>

<script>
import layout from '../LAYOUT'
import BaseAlert from '@/components/BaseAlert'

import { required, decimal, minValue } from 'vuelidate/lib/validators'

import { $api } from '@/service/api'

export default {
  components: {
    layout, BaseAlert
  },
  data() {
    return {
      newCar: {
        carArea: 0,
        carWeight: 0,
        licensePlate: '',
        model: ''
      },
      alert: {
        show: false,
        msg: '',
        color: ''
      }
    }
  },
  validations: {
    newCar: {
      carArea: {required, decimal, minValue: minValue(0)	},
      carWeight: {required, decimal, minValue: minValue(0) },
      licensePlate: {required},
      model: {required}
    }
  },
  methods: {
    addNewCar () {
      if (!this.$v.$invalid) {
        $api({ path: '/cars', method: 'post', data: {
          carArea: this.newCar.carArea,
          weight: this.newCar.carWeight,
          licensePlate: this.newCar.licensePlate,
          model: this.newCar.model
        }})
        .then(data => {

          if (data.success) {
            this.alert = {
              show: true,
              msg: data.message,
              color: 'primary'
            }
            this.newCar = {
              carArea: 0,
              carWeight: 0,
              licensePlate: ' ',
              model: ' '
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

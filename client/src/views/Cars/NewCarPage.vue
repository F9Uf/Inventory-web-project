<template>
  <layout>
    <h3>Add new Car</h3><br>
    <div class="form-row">
      <div class="col">
        <label >Area</label>
        <input type="number" class="form-control" min="0"
          :class="{'is-invalid': $v.newCar.carArea.$error}"
          v-model="$v.newCar.carArea.$model">
        <div class="invalid-feedback">Please enter car area</div>
      </div>
      <div class="col">
        <label >Weight</label>
        <input type="number" class="form-control" min="0"
        :class="{'is-invalid': $v.newCar.weight.$error}"
          v-model="$v.newCar.weight.$model">
        <div class="invalid-feedback">Please enter car weight</div>
      </div>
      <div class="col">
        <label for="inputState">Status</label>
        <select v-model="newCar.carStatus" class="form-control">
          <option value="unready" >unready</option>
          <option value="ready">ready</option>
        </select>
      </div>
    </div><br>
    <div class="form-row">
      <div class="col">
        <label >License Plate</label>
        <input type="text" class="form-control"
          :class="{'is-invalid': $v.newCar.licensePlate.$error}"
          v-model="$v.newCar.licensePlate.$model"
        >
        <div class="invalid-feedback">Please enter License Plate</div>
      </div>
      <div class="col">
        <label >Model</label>
        <input type="text" class="form-control"
          :class="{'is-invalid': $v.newCar.model.$error}"
          v-model="$v.newCar.model.$model">
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
  </layout>
</template>

<script>
import layout from '../LAYOUT'
import { required, decimal, minValue } from 'vuelidate/lib/validators'

export default {
  components: {
    layout
  },
  data() {
    return {
      newCar: {
        carArea: '',
        weight: '',
        carStatus: 'unready',
        licensePlate: '',
        model: ''
      }
    }
  },
  validations: {
    newCar: {
      carArea: {required, decimal, minValue: minValue(0)	},
      weight: {required, decimal, minValue: minValue(0) },
      carStatus: {required},
      licensePlate: {required},
      model: {required}
    }
  },
  methods: {
    addNewCar () {
      if (!this.$v.$invalid) {
        console.log('created!')
      }
    }
  },
}
</script>

<style>

</style>

<template>
  <layout>
    <h3>Add New Stock</h3><br>
    <div class="form-row">
      <div class="col-8">
        <label >Stock Name</label>
        <input type="text" class="form-control"
          v-model="newStock.stockName"
          placeholder="Stock Name"
        >
      </div>
    </div>

    <br>
    <div class="row justify-content-between">
      <div class="col-auto">
        <button class="btn btn-success" @click="$router.push('/stocks')">« Back to Stock</button>
        </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="addNewStock()">+ New</button>
      </div>
    </div>

    <base-alert v-if="alert.show" :msg="alert.msg" :color="alert.color" @close="alert.show = false"></base-alert>
  </layout>
</template>

<script>
import layout from '../LAYOUT'
import BaseAlert from '@/components/BaseAlert'

import { $api } from '@/service/api'

export default {
  components: {
    layout, BaseAlert
  },
  data() {
    return {
      newStock: {
        stockName: ''
      },
      alert: {
        show: false,
        msg: '',
        color: ''
      }
    }
  },
  methods: {
    addNewStock () {
      $api({ path: '/stocks', method: 'post', data: this.newStock})
      .then(data => {
        if (data.success) {
          this.alert = {
            show: true,
            msg: 'Create stock successfully' ,
            color: 'success'
          }
          this.newStock = {}
        } else {
          this.alert = {
            show: true,
            msg: 'Can not create new stock',
            color: 'danger'
          }
        }
      })
    }
  },
}
</script>

<style>

</style>

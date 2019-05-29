<template>
  <layout>
    <h3>Add New Stock</h3><br>
    <div class="form-row">
      <div class="col-8">
        <label >Location Name</label>
        <input type="text" class="form-control"
          v-model="newLoc.locationName"
          placeholder="Stock Name"
        >
      </div>
      <div class="col-4">
        <label>Max Area</label>
        <input type="number" placeholder="Enter Area of this location" class="form-control" min="0" v-model="newLoc.maxArea">
      </div>
    </div>

    <br>
    <div class="row justify-content-between">
      <div class="col-auto">
        <button class="btn btn-success" @click="$router.push(`/stocks/${$route.params.id}`)">« Back to Stock #{{ $route.params.id }}</button>
        </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="addNewLoc()">+ New</button>
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
      newLoc: {},
      alert: {
        show: false,
        msg: '',
        color: ''
      }
    }
  },
  methods: {
    addNewLoc () {
      $api({ path: `/stocks/${this.$route.params.id}/`, method: 'post', data: this.newLoc})
      .then(data => {
        if (data.success) {
          this.alert = {
            show: true,
            msg: 'Create location successfully' ,
            color: 'success'
          }
          this.newLoc = {}
        } else {
          this.alert = {
            show: true,
            msg: 'Can not create new location',
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

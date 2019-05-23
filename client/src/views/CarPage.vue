<template>
  <layout>
    <h3>Cars Information</h3>

    <the-table :header="header" :body="body"  @onDelete="deleteData"></the-table>

  </layout>
</template>

<script>
import layout from './LAYOUT'
import TheTable from '../components/TheTable'
import { $api } from '../service/api'

export default {
  components: {
    layout, TheTable
  },
  data() {
    return {
      header: ['Car ID', 'Area', 'Status', 'License Plate', 'Model', 'Weight'],
      body: []
    }
  },
  created() {
    this.fetchCars()
  },
  methods: {
    deleteData (value) {
      console.log(value)
    },
    fetchCars () {
      $api({ path: '/car', method: 'get'})
      .then( data => {
        this.body = data.result
      })
    }
  },
}
</script>

<style>

</style>

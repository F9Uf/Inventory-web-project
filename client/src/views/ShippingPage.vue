<template>
    <layout>
        <h3>Shipping</h3>
        <the-table :header="header" :body="body"  @onDelete="deleteData"></the-table>
    </layout>
</template>

<script>
import layout from './LAYOUT'
import TheTable from '../components/TheTable'

export default {
    components: {
    layout, TheTable
  },
  data() {
    return {
      header: ['ID', 'Name'],
      body: [
        {id: '01', name: 'zero'},
        {id: '02', name: 'two'}
      ]
    }
  },
  methods: {
    deleteData (value) {
      console.log(value)
    }
  }

}
</script>

<style>

</style>

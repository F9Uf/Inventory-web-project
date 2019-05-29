<template>
  <layout>
    <div class="row">
      <div class="col">
        <h3>Orders Informaion</h3>
      </div>
      <div class="col-auto ml-auto">
        <div class="btn-group">
          <button class="btn btn-success" @click="$router.push('/orders/new/in')">+ New Order In</button>
          <button class="btn btn-danger" @click="$router.push('/orders/new/out')">+ New Order Out</button>
        </div>

      </div>
    </div><br>

    <base-table :header="header" :body="body" :hasAction="true" idName="orderID">
      <template v-slot="row">
        <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
      </template>
    </base-table>

    <base-alert :msg="alert.msg" v-if="alert.show" :color="alert.color" @close="alert.show = false"></base-alert>
  </layout>
</template>

<script>
import layout from '../LAYOUT'
import BaseTable from '@/components/BaseTable'
import BaseAlert from '@/components/BaseAlert'

import { $api } from '@/service/api'

export default {
  components: {
    layout, BaseTable, BaseAlert
  },
  data() {
    return {
      header: [
        { name: 'orderID', label: 'Order ID'},
        { name: 'orderType', label: 'Order Type'},
        { name: 'shopName', label: 'Shop'},
        { name: 'createAt', label: 'Create At'}
      ],
      body: [],
      alert: {
        show: false,
        msg: '',
        color: 'danger'
      }
    }
  },
  methods: {
    fetchOrder () {
      $api({ path: '/orders', method: 'get'})
      .then(data => {
        if (data.success) {
          this.body= data.result
        }
      })
    },
    deleteData (id) {
      let isConfirm = confirm(`Do you want to delete Order #${id}`)
      if (isConfirm) {
        $api({ path: `/orders/${id}`, method: 'delete'})
        .then(data => {
          if (data.success) {
            this.alert = {
              show: true,
              msg: 'Delete successfully',
              color: 'success'
            }
            this.fetchOrder()
          } else {
            this.alert = {
              show: true,
              msg: 'Delete fail',
              color: 'danger'
            }
          }
        })
      }
    }
  },
  created() {
    this.fetchOrder()
  },
}
</script>

<style>

</style>

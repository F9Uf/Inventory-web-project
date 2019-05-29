<template>
  <layout>
    <div class="row">
      <div class="col">
        <h3>Shipping</h3>
      </div>
      <div class="col-auto ml-auto">
        <button class="btn btn-success" @click="$router.push('/shippings/new')">+ New Shipping</button>
      </div>
    </div>
    <br>

    <base-table v-if="body.length && !loading" :header="header" :body="body" :hasAction="true" idName="shippingID">
      <template v-slot="row">
        <div class="btn-group">
          <button class="btn btn-warning" @click="$router.push(`/shippings/edit/${row.rowId}`)">edit</button>
          <button class="btn btn-danger">delete</button>
        </div>
      </template>
    </base-table>

    <base-loading v-if="loading"></base-loading>

    <h5 v-if="!body.length && !loading">No Shipping</h5>
  </layout>
</template>

<script>
import layout from "../LAYOUT"
import BaseTable from "@/components/BaseTable"
import BaseLoading from '@/components/BaseLoading'

import { $api } from "@/service/api"

export default {
  components: {
    layout,
    BaseTable, BaseLoading
  },
  data() {
    return {
      header: [
        { name: "shippingID", label: "Shipping ID" },
        { name: "shippingDate", label: "Shipping Date" },
        { name: "model", label: "Car" },
        { name: "employeeID", label: "Driver" }
      ],
      body: [],
      loading: false
    };
  },
  created() {
    this.fetchShipping();
  },
  methods: {
    deleteData(value) {
      $api({ path: `/shipping/${value}`, method: `delete` }).then(data => {
        this.fetchShipping();
      });
      console.log(value);
    },
    fetchShipping() {
      this.loading = true
      $api({ path: "/shippings", method: "get" }).then(data => {
        if (data.success) {
          this.body = data.result;
          this.loading = false
        }
      });
    }
  }
};
</script>

<style>
</style>

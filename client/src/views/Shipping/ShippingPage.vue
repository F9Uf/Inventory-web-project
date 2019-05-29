<template>
  <layout>
    <h3>Shipping</h3>

    <base-table :header="header" :body="body" :hasAction="true" idName="shippingID">
      <template v-slot="row">
        <div class="btn-group">
          <button class="btn btn-warning" @click="$router.push(`/shippings/edit/${row.rowId}`)">edit</button>
          <button class="btn btn-danger">delete</button>
        </div>
      </template>
    </base-table>

    <h5 v-if="!body">No Shipping</h5>
  </layout>
</template>

<script>
import layout from "../LAYOUT"
import BaseTable from "@/components/BaseTable"
import { $api } from "@/service/api"

export default {
  components: {
    layout,
    BaseTable,
  },
  data() {
    return {
      header: [
        { name: "shippingID", label: "Shipping ID" },
        { name: "shippingDate", label: "Shipping Date" },
        { name: "model", label: "Car" },
        { name: "employeeID", label: "Driver" }
      ],
      body: []
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
      $api({ path: "/shippings", method: "get" }).then(data => {
        if (data.success) {
          this.body = data.result;
        }
      });
    }
  }
};
</script>

<style>
</style>

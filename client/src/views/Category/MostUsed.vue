<template>
  <layout>
    <h3>Most used category</h3>
    <layout>
      <h6>List</h6>
      <base-table :header="header" :body="body" :hasAction="false" idName="orederID" :hasIndex="true">
              <template v-slot="row">
              <div class="btn-group" role="group">
                <button class="btn btn-warning" @click="editData(row.rowId)">edit</button>
                <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
              </div>
            </template>
          </base-table>
          <h5 v-if="!body">No Data</h5>

    </layout>
    <layout>
      <h6>Actions</h6>
      <div class="form-row">
        <div class="col">
          <base-barchart :chartdata="ChartInfor.label" :options="ChartInfor.data">ggg</base-barchart>
        </div>
      </div>

      <div class="form-row">
        <div class="col-auto ml-auto">          
          <button class="btn btn-success" @click="$router.push('/category')">Back</button>
        </div>
      </div>
    </layout>
  </layout>
    
</template>

<script>
import layout from '../LAYOUT'
import TheModal from '@/components/TheModal'
import { $api } from '@/service/api'
import BaseTable from '@/components/BaseTable'
import { required, decimal, minValue } from 'vuelidate/lib/validators'
import BaseAlert from '@/components/BaseAlert'
import BaseBarchart from '@/components/BaseBarchart'


export default {
  components: {
    layout, TheModal, BaseTable, BaseAlert,BaseBarchart
  },
  
  data() {
    return {
      header: [
        {
          name: 'orderType',
          label: 'Order type'
        },
        {
          name: 'createAt',
          label: 'Date'
        },
        {
          name: 'categoryName',
          label: 'Catagory'
        }
      ],
      body: [
        {
          category:toy,
          count: 20
        },
        {
          category:toy,
          count: 10
        }

      ],
      ChartInfor:{
        label:["aa","bb","cc"],
        data:[10,20,30]
      },
    
      // editItem: {},
      // showModalEdit: false,
      // showModalNew: false,
      alert: false,
      isBtnHidden: false
    }
  }
}
</script>

<style>

</style>

<template>
  <layout>
    <h3>Most used category</h3>
    <layout>
      <h6>List</h6>
      <base-table :header="header" :body="ChartInfor.most" :hasAction="false" idName="orederID" :hasIndex="true">
              <template v-slot="row">
              <div class="btn-group" role="group">
                <button class="btn btn-warning" @click="editData(row.rowId)">edit</button>
                <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
              </div>
            </template>
          </base-table>
          <h5 v-if="!ChartInfor.most">No Data</h5>

    </layout>
    <layout>
      <h6>Actions</h6>
      <div class="form-row">
        <div class="col">
          <base-barchart :data="ChartInfor.group" :options="ChartInfor.group.catagoryName"/>
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
      ChartInfor:{
        most: [],
        group:[],
        max:null
        
      },
    
      // editItem: {},
      // showModalEdit: false,
      // showModalNew: false,
      alert: false,
      isBtnHidden: false,
      loaded: false,
      chartdata: null
    }
  },
  methods: {
    fetchMost() {
    $api({ path: '/analysis3show', method: 'get'})
      .then( data => {
        this.ChartInfor.most = data.result
        console.log(data);
        console.log(this.ChartInfor.most);
        
        
      })
    },
    fetchGroup() {
      $api({ path: '/analysis3group', method: 'get'})
      .then( data => {
        this.ChartInfor.group = data.result
        console.log(data);
        console.log(this.ChartInfor.group);
        
        
      })
    }
  },
  created() {
    this.fetchMost()
    this.fetchGroup()
  },
}
</script>

<style>

</style>

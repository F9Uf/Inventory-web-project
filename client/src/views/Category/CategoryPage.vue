<template>
  <layout>
    <h5>Category</h5>
    <layout>
      <h6>List of category</h6>
      <base-table :header="header" :body="body" :hasAction="false" idName="categoryID" :hasIndex="true">
              <template v-slot="row">
              <div class="btn-group" role="group">
                <button class="btn btn-warning" @click="editData(row.rowId)">edit</button>
                <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
              </div>
            </template>
          </base-table>
          <h5 v-if="!body">No Item</h5>
    </layout>
    <layout>
      <h6>Actions</h6>
      <div class="form-row">
        <div class="col-md-4 ">
          <button class="btn btn-success" v-on:click="isBtnHidden = !isBtnHidden">View/Hide Total category</button><br>
          <div>--</div>
          <button class="btn btn-success" @click="$router.push('/category/mostmonthly')">View Most used category</button><br>
        </div>
        <div class="col-md-3" v-if="isBtnHidden">
          <input type="text" class="form-control" v-model="body[0].count" disabled>
        </div>
      </div>

      <div class="form-row">
        <div class="col-auto ml-auto">          
          <button class="btn btn-success" @click="$router.push('/items')">Back to item</button>
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

export default {
  components: {
    layout, TheModal, BaseTable, BaseAlert
  },
  data() {
    return {
      header: [
        {
          name: 'categoryID',
          label: 'ID'
        },
        {
          name: 'categoryName',
          label: 'Name'
        }
      ],
      body: null,
      // editItem: {},
      // showModalEdit: false,
      // showModalNew: false,
      alert: false,
      isBtnHidden: false
    }
  },
  methods: {
    fetchCategory() {
    $api({ path: '/category', method: 'get'})
      .then( data => {
        this.body = data.result
        console.log(data);
        console.log(this.body);
        
        
      })
    }
    
  },  
  created() {
    this.fetchCategory()
  },

}
</script>

<style>

</style>

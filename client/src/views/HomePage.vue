<template>
  <layout>
    <h4>Sumary</h4>
    <div class="form-row">
      <!-- Total Item -->
      <div class="col-6">
        <layout>
          <h6>Total on hand item</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label  Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/items')">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- total Catagoey -->
      <div class="col-6">
        <layout>
          <h6>Total on hand Category</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/category')">View category</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- Most Used category-->
      <div class="col-6">
        <layout>
          <h6>Most Used category</h6>
          <div class="form-row">
            <div class="col-md ">
              <label>category</label>
              <input type="text" class="form-control" v-model="maxUsed.body[0].categoryName" disabled>
            </div>
            <div class="col-md" >
              <label>count</label>
              <input type="text" class="form-control" v-model="maxUsed.body[0]['max(a.MaxcategoryName)']" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="this">View Qeury</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!--Most export shop -->
      <div class="col-6">
        <layout>
          <h6>Most export shop</h6>
          <div class="form-row">
            <div class="col-md ">
              <label>Shop</label>
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total order</label>
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="this">View Query</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- Total Item -->
      <div class="col-6">
        <layout>
          <h6>Total on hand item</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label  Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/items')">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- total Catagoey -->
      <div class="col-6">
        <layout>
          <h6>Total on hand Category</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/category')">View category</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- Total Item -->
      <div class="col-6">
        <layout>
          <h6>Total on hand item</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label  Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/items')">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- total Catagoey -->
      <div class="col-6">
        <layout>
          <h6>Total on hand Category</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/category')">View category</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- Total Item -->
      <div class="col-6">
        <layout>
          <h6>Total on hand item</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label  Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/items')">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- total Catagoey -->
      <div class="col-6">
        <layout>
          <h6>Total on hand Category</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/category')">View category</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- Total Item -->
      <div class="col-6">
        <layout>
          <h6>Total on hand item</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label  Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/items')">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- total Catagoey -->
      <div class="col-6">
        <layout>
          <h6>Total on hand Category</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/category')">View category</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- Total Item -->
      <div class="col-6">
        <layout>
          <h6>Total on hand item</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label  Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/items')">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- total Catagoey -->
      <div class="col-6">
        <layout>
          <h6>Total on hand Category</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/category')">View category</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- Total Item -->
      <div class="col-6">
        <layout>
          <h6>Total on hand item</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label  Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/items')">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->
      </div> 

    
  </layout>
  
</template>

<script>
// @ is an alias to /src
import layout from './LAYOUT'
import TheModal from '@/components/TheModal'
import { $api } from '@/service/api'
import BaseTable from '@/components/BaseTable'
import BaseAlert from '@/components/BaseAlert'
import BaseBarchart from '@/components/BaseBarchart'

export default {
  components: {
    layout, TheModal, BaseTable, BaseAlert,BaseBarchart
  },
  data() {
    return {
      item:{
        header: [
        {
          name: 'itemID',
          label: 'item id'
        },
        {
          name: 'itemName',
          label: 'Name'
        },
        {
          name: 'totalCount',
          label: 'Total count'
        }
      ],
      body: null,
      },
      category: {
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
      },
      maxUsed: {
        body: null
      }
      
    }
  },
  methods: {
    fetchItems () {
      $api({ path: '/items', method: 'get'})
      .then( data => {
        this.item.body = data.result
        console.log(data);
        console.log(this.item.body);
        
        
      })
    },
    fetchCategory() {
      $api({ path: '/category', method: 'get'})
      .then( data => {
        this.category.body = data.result
        console.log(data);
        console.log(this.category.body);
        
        
      })
    },
    fetchMostused() {
      $api({ path: '/analysis3max', method: 'get'})
      .then( data => {
        this.maxUsed.body = data.result
        console.log(data);
        console.log(this.maxUsed.body);
        
        
      })
    }

  },
  created() {
    this.fetchItems()
    this.fetchCategory()
    this.fetchMostused()
  },
}
</script>



<div class="form-row">
      <!-- Total Item -->
      <div class="col-6">
        <layout>
          <h6>Total on hand item</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label  Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/items')">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- total Catagoey -->
      <div class="col-6">
        <layout>
          <h6>Total on hand Category</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-md" >
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <button class="btn btn-success" @click="$router.push('/category')">View category</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

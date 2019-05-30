<template>
  <layout>
    <h4>Analysis Forms</h4>
    <div class="form-row">
      <!-- Total Item #01--> 
      <div class="col-6">
        <layout>
          <h6>Total Items</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Result</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="item.body[0].count" disabled>
            </div>            
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="item.modal = !item.modal">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- total Catagoey #02-->
      <div class="col-6">
        <layout>
          <h6>Total Categories</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Total</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="category.body[0].count" disabled>
            </div>
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="category.modal = true">View Category</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- Most Used category #03-->
      <div class="col-6">
        <layout>
          <h6>Most Used Category</h6>
          <div class="form-row">
            <div class="col-md ">
              <label>Category</label>
              <input type="text" class="form-control" v-model="maxUsed.body[0].categoryName" disabled>
            </div>
            <div class="col-md" >
              <label>Count</label>
              <input type="text" class="form-control" v-model="maxUsed.body[0]['max(a.MaxcategoryName)']" disabled>
            </div>
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="maxUsed.modal = !maxUsed.modal; fetchforTB3()">View Result</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!--Most export shop #04-->
      <div class="col-6">
        <layout>
          <h6>Most Exported Shop</h6>
          <div class="form-row">
            <div class="col-md ">
              <label>Shop ID</label>
              <input type="text" class="form-control" v-model="mostExport2Shop.body[0].shopName" disabled>
            </div>
            <div class="col-md" >
              <label>Total order</label>
              <input type="text" class="form-control" v-model="mostExport2Shop.body[0].countShopID" disabled>
            </div>
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="mostExport2Shop.modal = true">View Result</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      
      <!-- total Catagoey #05-->
      <div class="col-6">
        <layout>
          <h6>Stock which has maximun area</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Shop</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="stockMaxArea.body[0].stockName" disabled>
            </div>
            <div class="col-md" >
              <label>MaxArea</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="stockMaxArea.body[0].maxAreaOfStock" disabled>
            </div>
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="stockMaxArea.modal = true">View category</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->

      <!-- #06 -->
      <div class="col-6">
        <layout>
          <h6>Maximum Weight of Item </h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>item</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="maxWeightItem.body[0].itemName" disabled>
            </div>
            <div class="col-md" >
              <label>weight</label> <!--label  Name--->
              <input type="text" class="form-control" v-model="maxWeightItem.body[0]['max(weight)']" disabled>
            </div>
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="maxWeightItem.modal = true">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->
    </div>

    <div class="form-row">
      <!-- #07 -->
      <div class="col-6">
        <layout>
          <h6>Most Province Order</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Province</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="mostProvinceOrder.body[0].shopProvince" disabled>
            </div>
            <div class="col-md" >
              <label>count (Order)</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="mostProvinceOrder.body[0].CountProvince" disabled>
            </div>
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="mostProvinceOrder.modal = true">View category</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- #08 -->
      <div class="col-6">
        <layout>
          <h6>Supplier has the most category</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Supplier</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="mostCateSupp.body[0].supplierName" disabled>
            </div>
            <div class="col-md" >
              <label>Category</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="mostCateSupp.body[0].categoryName" disabled>
            </div>
            <div class="col-md" >
              <label>Count</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="mostCateSupp.body[0]['MAX(count)']" disabled>
            </div>
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="mostCateSupp.modal = true; fetchforTB8()">View result</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- #09 -->
      <div class="col-6">
        <layout>
          <h6>Location that have area left</h6> <!--Analysis Name--->
          <div class="form-row">          
            
            <div class="col-auto mx-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="locateAreaLeft.modal = true">View Result</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- #010 -->
      <div class="col-6">
        <layout>
          <h6>Average Area Category</h6> <!--Analysis Name--->
          <div class="form-row">            
            <div class="col-auto mx-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="avgCateArea.modal = true">View Result</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- #011 -->
      <div class="col-6">
        <layout>
          <h6>Average Salary</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-auto mx-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="avgSalary.modal = true">View Result</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- #012 -->
      <div class="col-6">
        <layout>
          <h6>พนักงานอาศัยอยู่จังหวัดใดมากที่สุด</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Province</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="maxEmpProvince.body[0].province" disabled>
            </div>
            <div class="col-md" >
              <label>Count</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="maxEmpProvince.body[0].MaxcountProvince" disabled>
            </div>
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="maxEmpProvince.modal = true; fetchforTB11()">View Result</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- #013 -->
      <div class="col-6">
        <layout>
          <h6>Stock Area left</h6> <!--Analysis Name--->
          <div class="form-row">            
            <div class="col-auto mx-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="stockAreaLeft.modal = true">View Items</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->

      <!-- #014 -->
      <div class="col-6">
        <layout>
          <h6>shopที่มีorderมาทีสุด</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>Shop</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="maxShopOrder.body[0].shopName" disabled>
            </div>
            <div class="col-md" >
              <label>count</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="maxShopOrder.body[0].MaxNumberOfOrder" disabled>
            </div>
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="maxShopOrder.modal = true; fetchforTB14()">View Result</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  --------->
    </div>

    <div class="form-row">
      <!-- #015 -->
      <div class="col-6">
        <layout>
          <h6>Stock ที่มี employee มากที่สุด</h6> <!--Analysis Name--->
          <div class="form-row">
            <div class="col-md ">
              <label>stock</label> <!--label 01 Name--->
              <input type="text" class="form-control" v-model="maxStockEmp.body[0].stockName" disabled>
            </div>
            <div class="col-md" >
              <label>count</label> <!--label  Name--->
              <input type="text" class="form-control" v-model="maxStockEmp.body[0].MaxEmployee" disabled>
            </div>
            <div class="col-auto ml-auto">
              <label>Action</label><br>
              <button class="btn btn-success" @click="maxStockEmp.modal = true; fetchforTB15()">View Result</button>
            </div>
          </div>
        </layout>
      </div>
      <!--  -->
      </div>

       <!--Modalllllll  -->
       <!-- M01 -->
       <base-modal v-if="item.modal" @close="item.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="item.header" :body="item.body" 
          :hasAction="false" :hasIndex="true" idName="itemID">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="item.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m02 -->
       <base-modal v-if="category.modal" @close="category.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="category.header" :body="category.body" 
          :hasAction="false" :hasIndex="true" idName="categoryID">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="category.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m03 -->
       <base-modal v-if="maxUsed.modal" @close="maxUsed.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="maxUsed.header" :body="maxUsed.group" 
          :hasAction="false" :hasIndex="true" idName="categoryName">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="maxUsed.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m04 -->
       <base-modal v-if="mostExport2Shop.modal" @close="mostExport2Shop.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="mostExport2Shop.header" :body="mostExport2Shop.body" 
          :hasAction="false" :hasIndex="true" idName="shopID">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="mostExport2Shop.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m05 -->
       <base-modal v-if="stockMaxArea.modal" @close="stockMaxArea.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="stockMaxArea.header" :body="stockMaxArea.body" 
          :hasAction="false" :hasIndex="true" idName="stockName">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="stockMaxArea.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m06 -->
       <base-modal v-if="maxWeightItem.modal" @close="maxWeightItem.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="maxWeightItem.header" :body="maxWeightItem.body" 
          :hasAction="false" :hasIndex="true" idName="itemID">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="maxWeightItem.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m07 -->
       <base-modal v-if="mostProvinceOrder.modal" @close="mostProvinceOrder.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="mostProvinceOrder.header" :body="mostProvinceOrder.body" 
          :hasAction="false" :hasIndex="true" idName="orderID">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="mostProvinceOrder.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m08 -->
       <base-modal v-if="mostCateSupp.modal" @close="mostCateSupp.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="mostCateSupp.header" :body="mostCateSupp.group" 
          :hasAction="false" :hasIndex="true" idName="supplierID">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="mostCateSupp.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m09 -->
       <base-modal v-if="locateAreaLeft.modal" @close="locateAreaLeft.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="locateAreaLeft.header" :body="locateAreaLeft.body" 
          :hasAction="false" :hasIndex="true" idName="locationID">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="locateAreaLeft.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m10 -->
       <base-modal v-if="avgCateArea.modal" @close="avgCateArea.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="avgCateArea.header" :body="avgCateArea.body" 
          :hasAction="false" :hasIndex="true" idName="categoryName">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="avgCateArea.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m11 -->
       <base-modal v-if="avgSalary.modal" @close="avgSalary.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="avgSalary.header" :body="avgSalary.body" 
          :hasAction="false" :hasIndex="true" idName="positionSpecific">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="avgSalary.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m12 -->
       <base-modal v-if="maxEmpProvince.modal" @close="maxEmpProvince.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="maxEmpProvince.header" :body="maxEmpProvince.group" 
          :hasAction="false" :hasIndex="true" idName="province">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="maxEmpProvince.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m13 -->
       <base-modal v-if="stockAreaLeft.modal" @close="stockAreaLeft.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="stockAreaLeft.header" :body="stockAreaLeft.body" 
          :hasAction="false" :hasIndex="true" idName="stockID">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="stockAreaLeft.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m14 -->
       <base-modal v-if="maxShopOrder.modal" @close="maxShopOrder.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="maxShopOrder.header" :body="maxShopOrder.group" 
          :hasAction="false" :hasIndex="true" idName="shopName">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="maxShopOrder.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->
       <!-- m15 -->
       <base-modal v-if="maxStockEmp.modal" @close="maxStockEmp.modal= false">
        <template v-slot:header><h5>Query table</h5></template>
        <template v-slot:body>
          <base-table :header="maxStockEmp.header" :body="maxStockEmp.group" 
          :hasAction="false" :hasIndex="true" idName="stockName">
          </base-table>
        </template>
        <template v-slot:footer>
          <div class="row">
            <div class="col-auto ml-auto">
              <button class="btn btn-danger" @click="maxStockEmp.modal= false">Close</button>
            </div>
          </div>
        </template>
       </base-modal>
       <!-- // -->

    
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
import BaseModal from '@/components/BaseModal'

export default {
  components: {
    layout, TheModal, BaseTable, BaseAlert,BaseBarchart,BaseModal
  },
  data() {
    return {
      // d01
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
        modal: false
      },
      // d02
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
        modal: false,
        body: null,
      },
      // d03
      maxUsed: {
        header: [
          {
            name: 'categoryName',
            label: 'name'
          },
          {
            name: 'MaxCategoryName',
            label: 'count'
          },
        ],
        body: null,
        modal: false,
        group: null
      },
      // d04
      mostExport2Shop: {
        header: [
          {
            name: 'shopID',
            label: 'id'
          },
          {
            name: 'shopName',
            label: 'name'
          },
          {
            name: 'countShopID',
            label: 'count'
          },
        ],
        body: null,
        modal: false
      },      
      // d05
      stockMaxArea: {
        header: [
          {
            name: 'stockName',
            label: 'name'
          },
          {
            name: 'maxAreaOfStock',
            label: 'Max Area'
          }
        ],        
        body: null,
        modal: false
      },
      // d06
      maxWeightItem: {
        header: [
          {
            name: 'itemID',
            label: 'id'
          },
          {
            name: 'itemName',
            label: 'name'
          },
          {
            name: 'max(weight)',
            label: 'weight'
          }
        ],
        body: null,
        modal: false
      },
      // d07
      mostProvinceOrder: {
        header: [
          {
            name: 'orderID',
            label: 'id'
          },
          {
            name: 'shopProvince',
            label: 'province'
          },
          {
            name: 'CountProvince',
            label: 'count'
          }
        ],
        body: null,
        modal: false
      },
      // d08
      mostCateSupp: {
        header: [
          {
            name: 'supplierID',
            label: 'supplier id'
          },
          {
            name: 'supplierName',
            label: 'name'
          },
          {
            name: 'MAX(count)',
            label: 'count'
          },
          {
            name: 'categoryName',
            label: 'category name'
          }
        ],
        body: null,
        group:null,
        modal:false
      },
      // d09
      locateAreaLeft: {
        header: [
          {
            name: 'locationID',
            label: 'ocattion id'
          },
          {
            name: 'locationName',
            label: 'name'
          },
          {
            name: 'stockName',
            label: 'stock name'
          },
          {
            name: 'leftArea',
            label: 'area remain'
          }
        ],
        body: null,
        modal:false
      },
      // d10
      avgCateArea: {
        header: [
          {
            name: 'categoryName',
            label: 'name'
          },
          {
            name: 'round(avg(area), 2)',
            label: 'Avg.area'
          }
        ],
        body: null,
        modal: false
      },
      // d11
      avgSalary: {
        header: [
          {
            name: 'positionSpecific',
            label: 'position'
          },
          {
            name: 'avgSalary',
            label: 'Avg.salary'
          }
        ],
        body: null,
        modal:false
      },
      // d12
      maxEmpProvince: {
        header: [
          {
            name: 'province',
            label: 'province'
          },
          {
            name: 'countProvince',
            label: 'count'
          }
        ],
        body: null,
        group:null,
        modal:false
      },
      //  d13
      stockAreaLeft:{
        header: [
          {
            name: 'stockID',
            label: 'stock id'
          },
          {
            name: 'stockName',
            label: 'name'
          },
          {
            name: 'leftArea',
            label: 'area remain'
          }
        ],
        body: null,
        modal:false
      },
      //   d14
      maxShopOrder: {
        header: [
          {
            name: 'shopName',
            label: 'shop name'
          },
          {
            name: 'CountOrder',
            label: 'count'
          }
        ],
        body: null,
        group:null,
        modal:false
      },
      // d15
      maxStockEmp: {
        header: [
          {
            name: 'stockName',
            label: 'stock name'
          },
          {
            name: 'countEmployee',
            label: 'emplyee count'
          }
        ],
        body:null,
        group:null,
        modal:false
      }
    }
  },
  methods: {
    // ##1
    fetchItems () {
      $api({ path: '/items', method: 'get'})
      .then( data => {
        this.item.body = data.result
        console.log(data);
        console.log(this.item.body);
        
        
      })
    },
    // ##2
    fetchCategory() {
      $api({ path: '/category', method: 'get'})
      .then( data => {
        this.category.body = data.result
        console.log(data);
        console.log(this.category.body);
        
        
      })
    },
    // ##3
    fetchMostused() {
      $api({ path: '/analysis3max', method: 'get'})
      .then( data => {
        this.maxUsed.body = data.result
        console.log(data);
        console.log(this.maxUsed.body);
        
        
      })
    },
    // ##4
    fetchMostExShop() {
      $api({ path: '/analysis4group', method: 'get'})
      .then( data => {
        this.mostExport2Shop.body = data.result
        console.log(data);
        console.log(this.mostExport2Shop.body);
        
        
      })
    },
    
    //  ##5
    fetchShopMostOrder() {
      $api({ path: '/analysis5max', method: 'get'})
      .then( data => {
        this.stockMaxArea.body = data.result
        console.log(data);
        console.log(this.stockMaxArea.body);
        
        
      })
    },
    // ##6
    fetchMaxWeightItem() {
      $api({ path: '/analysis6', method: 'get'})
      .then( data => {
        this.maxWeightItem.body = data.result
        console.log(data);
        console.log(this.maxWeightItem.body);
        
        
      })
    },
    // #7
    fetchMostProvinceOrder() {      
      $api({ path: '/mostProvinceOrder', method: 'get'})
      .then( data => {
        this.mostProvinceOrder.body = data.result
        console.log(data);
        console.log(this.mostProvinceOrder.body);
        
        
      })
    },
    // #8
    fetchMostCateSupp() {
      $api({ path: '/analysis8max', method: 'get'})
      .then( data => {
        this.mostCateSupp.body = data.result
        console.log(data);
        console.log(this.mostCateSupp.body);
        
        
      })
    },
    fetchforTB8() {
      $api({ path: '/analysis8most', method: 'get'})
      .then( data => {
        this.mostCateSupp.group = data.result
        console.log(data);
        console.log(this.mostCateSupp.group);
      })

    },
    // #9
    fetchLocateAreaLeft() {
      $api({ path: '/location/area', method: 'get'})
      .then( data => {
        this.locateAreaLeft.body = data.result
        console.log(data);
        console.log(this.locateAreaLeft.body);
        
        
      })
    },
    // #10
    fetchAvgCateArea() {
      $api({ path: '/analysisAvgCategoryArea', method: 'get'})
      .then( data => {
        this.avgCateArea.body = data.result
        console.log(data);
        console.log(this.avgCateArea.body);
        
        
      })
    },
    // #11
    fetchAvgSalary() {
      $api({ path: '/analysis1avgsalary', method: 'get'})
      .then( data => {
        this.avgSalary.body = data.result
        console.log(data);
        console.log(this.avgSalary.body);
        
        
      })
    },
    // #12
    fetchMaxEmpProvince() {
      $api({ path: '/analysis/addressemployee/max', method: 'get'})
      .then( data => {
        this.maxEmpProvince.body = data.result
        console.log(data);
        console.log(this.maxEmpProvince.body);
      })
    },
    fetchforTB11() {
      $api({ path: '/analysis/addressemployee', method: 'get'})
      .then( data => {
        this.maxEmpProvince.group = data.result
        console.log(data);
        console.log(this.maxEmpProvince.group);
      })
    },
    //  #13
    fetchStockAreaLeft() {
      $api({ path: '/stockarea', method: 'get'})
      .then( data => {
        this.stockAreaLeft.body = data.result
        console.log(data);
        console.log(this.stockAreaLeft.body);        
        
      })
    },
    //  #14
    fetchMaxShopOrder() {
      $api({ path: '/analysis14max', method: 'get'})
      .then( data => {
        this.maxShopOrder.body = data.result
        console.log(data);
        console.log(this.maxShopOrder.body);        
        
      })
    },
    fetchforTB14() {
      $api({ path: '/analysis14', method: 'get'})
      .then( data => {
        this.maxShopOrder.group = data.result
        console.log(data);
        console.log(this.maxShopOrder.group);        
        
      })
    },
    //  #15
    fetchMaxStockEmp() {
      $api({ path: '/analysis15max', method: 'get'})
      .then( data => {
        this.maxStockEmp.body = data.result
        console.log(data);
        console.log(this.maxStockEmp.body);        
        
      })
    },
    fetchforTB15() {
      $api({ path: '/analysis15', method: 'get'})
      .then( data => {
        this.maxStockEmp.group = data.result
        console.log(data);
        console.log(this.maxStockEmp.group);        
        
      })
    },
    // for table -----------------------
    fetchforTB3() {
      $api({ path: '/analysis3group', method: 'get'})
      .then( data => {
        this.maxUsed.group = data.result
        console.log(data);
        console.log(this.maxUsed.group); 
      })
    }

  },
  created() {
    this.fetchItems()
    this.fetchCategory()
    this.fetchMostused()
    this.fetchMostExShop()
    this.fetchShopMostOrder()
    this.fetchMaxWeightItem()
    this.fetchMostProvinceOrder()
    this.fetchMostCateSupp()
    this.fetchLocateAreaLeft()
    this.fetchAvgCateArea()
    this.fetchAvgSalary()
    this.fetchMaxEmpProvince()
    this.fetchStockAreaLeft()
    this.fetchMaxShopOrder()
    this.fetchMaxStockEmp()
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

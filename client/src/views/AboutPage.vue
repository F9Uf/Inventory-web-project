<template>
  <layout>
    <base-table :header="header" :body="data" :hasAction="true" idName="employeeID" :hasIndex="true" @onSelect="selectData">
      <!-- haseAction คือบอกว่าจะมี column action (colum สุดท้าย) ไหม เป็น true/false -->
      <!-- hasIndex คือบอกว่าจะให้แสดง column index หน้าสุดหรือไม่ เป็น true/false -->
      <!-- idName คือกำหนดว่า จะให้ attribute ไหนของ body เป็น id หลัก-->
      <!-- onSelect เมื่อมีการกดเลือก row จะคืนค่า id ของ row นั้นๆ ออกมา -->
      <template v-slot="row">
        <div class="btn-group" role="group">
          <button class="btn btn-warning" @click="editData(row.rowId)">edit</button>
          <button class="btn btn-success" @click="selectData(row.rowId)">view</button>
          <button class="btn btn-danger" @click="deleteData(row.rowId)">delete</button>
        </div>
      </template>
      <!-- ใส่ได้มากกว่า 1 ปุ่ม -->
      <!-- ถ้ากำหนด hasAction เป็น false ไม่ต้องใส่ปุ่มในช่องนี้ -->
    </base-table>
  </layout>
</template>

<script>
import Layout from './LAYOUT'
import BaseTable from '../components/BaseTable'

export default {
  components: {
    BaseTable, Layout
  },
  data() {
    return {
      // header เป็น array ของ json อยากให้ column ไหนขึ้นก่อนก็จัดลำดับใน header ได้เลย
      // อยากแสดงแค่ column ไหน ก็กำหนด header ไว้แค่นั้น เช่นในนี้ เอาแค่ employeeID กับ firstName
      // label คือ ชื่อใหม่ที่อยากเปลี่ยน
      header: [
        {
          name: 'employeeID',
          label: 'Employee ID',
        },
        {
          name: 'firstName',
          label: 'First Name'
        }
      ],

      // data เอาไปใส่ในส่วนของ body ปกติเหมือนเดิม
      data: [
        {firstName: 'tose', employeeID: '01', lastName: '1'},
        {firstName: 'bom', employeeID: '02', lastName: '2'},
        {firstName: 'ton', employeeID: '03', lastName: '3'},
        {firstName: 'karn', employeeID: '04', lastName: '4'},
        {firstName: 'big', employeeID: '05', lastName: '5'},
      ]
    }
  },
  methods: {
    editData (id) {
      console.log(`editData: ${id}`)
    },
    deleteData  (id) {
      console.log(`deleteData: ${id}`);
    },
    selectData (id) {
      console.log(`select id: ${id}`);

    }
  },
}
</script>

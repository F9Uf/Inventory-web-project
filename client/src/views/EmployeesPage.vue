<template>
    <layout>
    <h3>employees Information</h3>

    <the-table :header="header" :body="body"  @onDelete="deleteData" @onEdit="editData" id="EmployeesID"></the-table>

    <the-modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <h5>Edit Information</h5>
      </template>
      <template v-slot:body>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem nisi voluptates iste labore recusandae? Ad eum in adipisci impedit veritatis exercitationem esse, debitis, incidunt dolor laborum, quia eveniet quo quasi!
      </template>
    </the-modal>

  </layout>
</template>

<script>
import layout from './LAYOUT'
import TheTable from '../components/TheTable'
import TheModal from '../components/TheModal'
import { $api } from '../service/api'
export default {
    components: {
        layout, TheTable, TheModal
    },
    data() {
        return{
            header: ['ID','Firstname', 'Lastname','Profile Picture','Posision','shopID'],
            body: [],
            showModal: false
        }
       
    },
    created(){
        this.fetchEmployees()
    },
    methods: {
        deleteData (value) {
            console.log(value)
        },
        editData (value) {
            this.showModal = true
        },
        fetchEmployees() {
            $api({path: '/employees', method:'get'})
            .then( data => {
                this.body = data.result
                console.log(data.result);
                
            })
        }
    }

}
</script>

<style>

</style>

<template>
  <div class="row m-3" v-if="userSetting">
    <div class="col bg-white p-3">
      <h3>Profile Settings</h3>
      <!-- profile setting -->
      <div class="row my-4">
        <div class="col-lg-4">
          <h5>Employee Profile</h5>
          <p>You can change your avatar profile</p>
        </div>
        <div class="col-lg-8 d-flex flex-lg-row flex-column justify-content-around">
          <div class="img-select align-self-center align-self-lg-stretch">
            <img :src="userSetting.photoUrl" width="160px" class="rounded-circle">
          </div>
          <div class="upload align-self-center align-self-lg-stretch">
            <h5>Upload your photo</h5>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="photUpload($event)"
                @change="fileSelect"
              >
              <label for="photoUpload" class="custom-file-label">Choose file</label>
              <template v-if="file">
                <img :src="file">
              </template>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <!-- Information setting -->
      <div class="row my-4">
        <div class="col-lg-4">
          <h5>Main settings</h5>
          <p></p>
        </div>
        <div class="col-lg-8">
          <form @submit.prevent="updateUser">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">Firstname</label>
                <input type="text" class="form-control" placeholder="Firstname" v-model="userSetting.employeeFirstName">
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Lastname</label>
                <input type="text" class="form-control" placeholder="Lastname" v-model="userSetting.employeeLastName">
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Address</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="userSetting.employeeAddress">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" id="inputEmail" v-model="userSetting.employeeEmail">
              </div>
              <div class="form-group col-md-6">
                <label for="inputPhone">Phone</label>
                <input type="number" class="form-control" id="inputPhone" v-model="userSetting.employeePhone">
              </div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true" v-if="loading"></span>
              Update
            </button>
          </form>
        </div>
      </div>
      <hr>
      <!--  -->
    </div>
    <div v-if="alert" class="alert alert-dismissible fade fixed-bottom m-5"
      :class="{'show': alert, 'alert-danger': typeAlert == 'error', 'alert-success': typeAlert == 'success'}">
      <strong v-if="typeAlert == 'error'">ERROR!</strong>
      <strong v-if="typeAlert == 'success'">SUCCESS!</strong>
      {{messageAlert}}
      <button type="button" class="close" style="outline: none;" @click="clearAlert()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { $api } from '@/service/api'

export default {
  name: "setting-page",
  data() {
    return {
      file: null,
      userSetting: null,
      loading: false,
      alert: false,
      messageAlert: '',
      typeAlert: null
    }
  },
  computed: {
    user () {
      return this.$store.getters['Auth/getUser']
    }
  },
  created() {
    if (this.user) {
      // if visit this page from vue-router
      this.userSetting = {...this.user}
      // this.userSetting.valid = 'no fetch new data'
    } else {
      // if visit this page from browser
      // there are no user in vuex store
      // so, i'll fetch user from api again! :)
      this.$store.dispatch('Auth/fetchUser', localStorage.getItem('access_token' || null))
      .then(user => {
        this.userSetting = user
      })
      .catch(err => {
        console.log(err)
        this.$store.dispatch('Auth/logout')
      })
    }
  },
  methods: {
    clearAlert () {
      this.alert = false
      this.messageAlert = ''
      this.typeAlert = null
    },
    fileSelect (event) {
      let fileTarget = event.target.files[0]
    },
    updateUser () {
      /** @todo #6 modify update
       * sent some field which edited
       */
      this.loading = true
      $api({path: `/employees/${this.userSetting.EmployeeID}`, method: 'put', data: this.userSetting})
      .then(resp => {
        if (!resp.success) {
          this.alert = true
          this.messageAlert = resp.message
          this.typeAlert = 'error'
        } else {
          this.alert = true
          this.messageAlert = 'Plese refresh (F5) for update user information :)'
          this.typeAlert = 'success'
        }
        this.loading = false

      })
      .catch(err => {
        console.log(err)
        this.alert = true
        this.messageAlert = err
        this.loading = false
        this.typeAlert = 'error'
      })
    }
  }
}
</script>

<style scoped>
</style>

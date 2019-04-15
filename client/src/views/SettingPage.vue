<template>
  <div class="row m-3" v-if="user">
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
            <img :src="user.photoUrl" width="160px" class="rounded-circle">
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
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">Firstname</label>
                <input type="text" class="form-control" placeholder="Firstname" :value="user.EmployeeFirstName" @input="onInput($event)">
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Lastname</label>
                <input type="text" class="form-control" placeholder="Lastname" :value="user.EmployeeLastName">
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Address</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" :value="user.EmployeeAddress">
            </div>
            
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" id="inputEmail" :value="user.EmployeeEmail">
              </div>
              <div class="form-group col-md-6">
                <label for="inputPhone">Phone</label>
                <input type="text" class="form-control" id="inputPhone" :value="user.EmployeePhone">
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
      <hr>
      <!--  -->
      {{ mainUser }}
    </div>
  </div>
</template>

<script>
export default {
  name: "setting-page",
  data() {
    return {
      file: null,
      mainUser: { }
    };
  },
  computed: {
    user() {
      return this.$store.getters["AuthUser/getUser"];
    }
  },
  methods: {
    fileSelect(event) {
      let fileTarget = event.target.files[0];
    },
    onInput(e) {
      console.log(e.target.value);
      
      this.mainUser.firstName = e.target.value
      
    }
  }
}
</script>

<style scoped>
</style>

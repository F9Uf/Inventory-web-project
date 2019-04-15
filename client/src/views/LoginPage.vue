<template>
  <div class="text-center login-root">
    <form class="form-login" @submit.prevent="login()">
      <h1 class="mt-5 mb-4">Sign in Now!</h1>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          :class="{'is-invalid': usernameInvalid}"
          placeholder="Username"
          v-model="username"
          autofocus
        >
        <div class="invalid-feedback">Please enter your username</div>
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          :class="{'is-invalid': passwordInvalid}"
          placeholder="password"
          v-model="password"
        >
        <div class="invalid-feedback">Please enter your password</div>
      </div>
      <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
      <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true" v-if="loading"></span>
      Sign in
      </button>
      <br>
      <div v-if="alert" class="alert alert-danger alert-dismissible fade" :class="{'show': alert}">
        <strong>ERROR!</strong>
        {{error}}
        <button type="button" class="close" style="outline: none;" @click="clearAlert()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      usernameInvalid: false,
      passwordInvalid: false,
      alert: false,
      error: '',
      loading: false
      
    }
  },
  mounted() {
    console.log(process.env.API_BASE_URL)
  },
  methods: {
    login () {
      if (this.username === '') this.usernameInvalid = true
      if (this.password === '') this.passwordInvalid = true
      if (this.username !== '' && this.password !== '') {
        this.loading = true

        this.$store.dispatch('AuthUser/login', {username:this.username, password:this.password})
        .then((result) => {
          this.loading = false
          this.$router.push('/')
        })
        .catch((err) => {
          this.alert = true
          this.error = err.data.message
          this.loading = false
          console.log(err)
        })
      }
    },
    clearAlert () {
      this.alert = false
      this.error = ''
    }
  },
  watch: {
    username: function (val) {
      if (this.usernameInvalid === true && this.username !== '') { this.usernameInvalid = false } else if (this.usernameInvalid === false && this.username === '') { this.usernameInvalid = true }
    },
    password: function (val) {
      if (this.passwordInvalid === true && this.password !== '') { this.passwordInvalid = false } else if (this.passwordInvalid === false && this.password === '') { this.passwordInvalid = true }
    }
  }
}
</script>

<style>
.form-login {
  width: 100%;
  max-width: 330px;
  padding: 30px;
  margin: auto;
}
.login-root {
  height: 100vh;
}
</style>

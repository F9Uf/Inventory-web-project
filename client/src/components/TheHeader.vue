<template>
  <header
    class="navbar navbar-expand-md navbar-light bg-white border-bottom sticky-top shadow-sm"
    v-if="user"
  >
    <div
      class="navbar-toggler collapsed d-block d-md-none d-lg-none d-xl-none"
      style="border:none;"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <div class="line1" ></div>
      <div class="line2" ></div>
      <div class="line3" ></div>
    </div>

    <router-link class="navbar-brand mr-auto" to="/">INVENTORY</router-link>

    <div
      class="collapse navbar-collapse order-xl-0 order-lg-0 order-md-0 order-sm-2 order-2"
      id="navbarNav"
    >
      <ul class="navbar-nav ml-3">
        <template v-for="(menu,i) in menus">
          <li class="nav-item" :key="i" v-if="checkRole(user.Position, menu.auth)">
            <router-link class="nav-link" :to="menu.to">{{ menu.text }}</router-link>
          </li>
        </template>
      </ul>
    </div>

    <ul class="nav ml-auto">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {{ name }}
          <img :src="user.photoUrl" class="img-avatar">
        </a>
        <div class="dropdown-menu dropdown-menu-right shadow-sm" aria-labelledby="navbarDropdown">
          <router-link class="dropdown-item" to="/setting">Setings</router-link>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" @click="logout">Log out</button>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>

export default {
  name: 'the-header',
  data () {
    return {
      menus: [
        { text: 'Orders', to: '/orders', auth: ['staff', 'manager'] },
        { text: 'Shipping', to: '/about', auth: ['staff', 'manager'] },
        { text: 'Items', to: '/items', auth: ['staff', 'manager'] },
        { text: 'Employee', to: '/about', auth: ['manager'] },
        { text: 'Stock', to: '/stock', auth: ['manager'] }
      ]
    }
  },
  methods: {
    checkRole (userRole, requireRole) {
      return requireRole.indexOf(userRole) > -1
    },
    logout () {
      this.$store.dispatch('AuthUser/logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  },
  computed: {
    user () {
      return this.$store.getters['AuthUser/getUser']
    },
    name () {
      return `${this.user.EmployeeFirstName} ${this.user.EmployeeLastName}`
    }
  },
}
</script>

<style scoped>

.navbar-toggler.collapsed .line1 {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.navbar-toggler.collapsed .line2 {
  opacity: 1;
}
.navbar-toggler.collapsed .line3 {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}

.navbar-toggler:not(.collapsed) > .line1 {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg) translate(-7px, 5px);
}
.navbar-toggler:not(.collapsed) > .line2 {
  opacity: 0;
}
.navbar-toggler:not(.collapsed) > .line3 {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg) translate(-6px, -5px);
}

.line1,
.line2,
.line3 {
  background-color: rgb(77, 77, 77);
  width: 25px;
  height: 3px;
  display: block;
  margin: 5px 2.5px;
  transition: all 0.3s;
}

.navbar-toggler {
  opacity: 0.5;
  transition: all 0.3s;
  outline: none;
  cursor: pointer;
  display: inline-block;
}
.navbar-toggler:hover {
  opacity: 1;
}
a .img-avatar {
  width: 30px;
  height: 30px;
  opacity: 0.8;
  border-radius: 50%;
  transition: all 0.3s;
}
a:hover .img-avatar {
  opacity: 1;
}
</style>

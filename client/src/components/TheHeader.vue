<template>
  <header
    class="navbar navbar-expand-md navbar-light bg-white border-bottom sticky-top"
    v-if="user"
  >
    <div
      class="navbar-toggler"
      style="border:none;"
      data-toggle="collapse"
      @click="toggler()"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <div class="line1" :class="{'active': togglerMenu}"></div>
      <div class="line2" :class="{'active': togglerMenu}"></div>
      <div class="line3" :class="{'active': togglerMenu}"></div>
    </div>

    <router-link class="navbar-brand mr-auto" to="/">INVENTORY</router-link>

    <div
      class="collapse navbar-collapse order-xl-0 order-lg-0 order-md-0 order-sm-2 order-2"
      id="navbarNav"
    >
      <ul class="navbar-nav ml-3">
        <template v-for="(menu,i) in menus">
          <li class="nav-item" :key="i" v-if="checkRole(user.role,menu.auth)">
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
          {{ user.name }}
          <img :src="user.photoUrl" class="img-avatar">
        </a>
        <div class="dropdown-menu dropdown-menu-right shadow-sm" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Log out</a>
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
      togglerMenu: false,
      menus: [
        { text: 'Orders', to: '/orders', auth: ['staff', 'manager'] },
        { text: 'Shipping', to: '/about', auth: ['staff', 'manager'] },
        { text: 'Items', to: '/items', auth: ['staff', 'manager'] },
        { text: 'Employee', to: '/about', auth: ['manager'] },
        { text: 'Stock', to: '/stock', auth: ['manager'] }
      ],
      user: {
        name: 'Mewnich',
        photoUrl:
          'https://www.tlcthai.com/education/wp-content/uploads/2018/07/mewnich3.jpg',
        role: 'manager'
      }
    }
  },
  methods: {
    toggler () {
      this.togglerMenu = !this.togglerMenu
    },
    checkRole (userRole, requireRole) {
      return requireRole.indexOf(userRole) > -1
    }
  }
}
</script>

<style scoped>
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
.line1.active {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg) translate(-7px, 5px);
}
.line2.active {
  opacity: 0;
}
.line3.active {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg) translate(-6px, -5px);
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

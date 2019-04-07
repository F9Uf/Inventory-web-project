<template>
  <header class="navbar navbar-expand-md navbar-light bg-white border-bottom sticky-top">
    
    <div class="navbar-toggler" style="border:none;" 
        data-toggle="collapse" @click="toggler()"
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
    >
        <div class="line1" :class="{'active': togglerMenu}" ></div>
        <div class="line2" :class="{'active': togglerMenu}" ></div>
        <div class="line3" :class="{'active': togglerMenu}" ></div>
    </div>
    
    <router-link class="navbar-brand mr-auto" to="/">INVENTORY</router-link>

    <div class="collapse navbar-collapse order-xl-0 order-lg-0 order-md-0 order-sm-2 order-2"
        
        id="navbarNav">
        <ul class="navbar-nav ml-3">
            <li class="nav-item" v-for="(menu,i) in menus" :key="i">
                <router-link class="nav-link" :to="menu.to">{{ menu.text }}</router-link>
            </li>
        </ul>
    </div>
    
    <ul class="nav ml-auto">    
      <li class="nav-item dropdown ">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >username</a>
        <div class="dropdown-menu dropdown-menu-right shadow-sm" 
            aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
    
  </header>
</template>

<script>
import { setTimeout } from 'timers'

export default {
  name: "the-header",
  data() {
    return {
        togglerMenu: false,
        menus: [
            {text: 'Orders', to: '/about', auth:['staff', 'manager']},
            {text: 'Shipping', to: '/about', auth:['staff', 'manager']},
            {text: 'Items', to: '/about', auth:['staff', 'manager']},
            {text: 'Employee', to: '/about', auth:['staff', 'manager']}
        ]
    }
  },
  methods: {
      toggler () {
          this.togglerMenu = !this.togglerMenu
      }
  }
}
</script>

<style scoped>
    .line1 , .line2, .line3 {
       background-color: rgb(77, 77, 77);
       width: 25px;
       height: 3px;
       display: block;
       margin: 5px 2.5px;
       transition: all .3s;
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
        transform: rotate(45deg) translate(-6px,-5px);
   }
   .navbar-toggler {
       opacity: .5;
       transition: all .3s;
       outline: none;
       cursor: pointer;
       display: inline-block;
   }
   .navbar-toggler:hover {
       opacity: 1;
   }
</style>

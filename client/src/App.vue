<template>
  <div id="app bg-light">
    <the-header v-if="!user"></the-header>
    <div class="container-fluid bg-light">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
  name: 'app',
  components: {
    TheHeader
  },
  data () {
    return {
      user: null
    }
  },
  created () {
    fetch('http://localhost:5000/api/v1/')
    .then(res => res.json())
    .then(json => console.log(json));
  },
  
}
</script>

<style>
</style>

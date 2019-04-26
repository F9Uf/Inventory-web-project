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
  }

}
</script>

<style>
</style>

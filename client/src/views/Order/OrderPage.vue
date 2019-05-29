<template>
  <div>
    <button class="btn btn-success" @click="$router.push(`/orders/new/in`)">new order in</button>
    <button class="btn btn-danger" @click="$router.push('/orders/new/out')">new order out</button>
  </div>
</template>

<script>
import layout from '../LAYOUT'

export default {
  components: {

  }
}
</script>

<style>

</style>

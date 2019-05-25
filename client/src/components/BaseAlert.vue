<template>
  <transition name="list">
    <div class="alert fade show fixed-bottom my-3 mx-5" :class="classColor">
      <button type="button" class="close" @click="$emit('close')">
        <span aria-hidden="true">&times;</span>
      </button>
      {{msg}}
    </div>

  </transition>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'warning'
    },
    msg: {
      type: String,
      default: ''
    }
  },
  computed: {
    classColor () {
      return `alert-${this.color}`
    }
  },
}
</script>

<style scoped>
.alert {
  word-wrap: break-word;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>

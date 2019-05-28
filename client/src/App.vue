<template>
  <div id="app">
    <div class="isLoading" v-if="loading">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <div class="isNotLoading" v-if="!loading">
      <the-header ></the-header>
      <div class="container-fluid bg-light">
        <router-view/>
      </div>
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
  computed: {
    loading () {
      return this.$store.state['UI'].loading
    }
  },

}
</script>

<style scoped>
.isLoading {
  background: #F2F1EF;
  height: 100vh;
  overflow: hidden;
}

.spinner {
  width: 70px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #F5AB35;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
  background-color: #EF4836;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  background-color: #3498DB;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>

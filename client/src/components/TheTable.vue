<template>
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" v-for="(head, hi) in header" :key="hi">{{head}}</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(b, bi) in body" :key="bi">
      <th scope="row">{{bi}}</th>
      <template v-for="(a, i) in b" >
        <td :key="i" v-if="isImage(a)">
          <img :src="a" width="80px" >
        </td>
        <td :key="i" v-else>{{a}}</td>
      </template>
      <td>
        <button type="button" class="btn btn-danger" @click="$emit('onDelete', b[id])">Delete</button> |
        <button type="button" class="btn btn-warning" @click="$emit('onEdit', b[id])">Edit</button>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  props: {
    header: Array,
    body: Array,
    id: String
  },
  methods: {
    isImage (text) {
      let myRegex = /(https?:\/\/.*\.(?:png|jpg))/i
      return myRegex.test(text)
    }
  },
}
</script>

<style>

</style>

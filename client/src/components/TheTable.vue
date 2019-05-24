<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" v-for="(head, header_index) in header" :key="header_index">{{head}}</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(b, body_index) in body" :key="body_index" @click="$emit('onSelect',b[id])">
          <th scope="row">{{body_index + 1}}</th>
          <template v-for="(a, i) in b" >
            <td :key="i" v-if="isImage(a)">
              <img :src="a" width="80px" >
            </td>
            <td :key="i" v-else>{{a}}</td>
          </template>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-danger" @click="$emit('onDelete', b[id])">Delete</button>
              <button type="button" class="btn btn-warning" @click="$emit('onEdit', b[id])">Edit</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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

<template>

  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" v-if="hasIndex">#</th>
          <th scope="col" v-for="(head, header_index) in header" :key="header_index">{{head.label}}</th>
          <th scope="col" v-if="hasAction">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, body_index) in body" :key="body_index" @click="$emit('onSelect', item[idName])">
          <th scope="row" v-if="hasIndex">{{body_index + 1}}</th>

          <template v-for="(attribute, a_index) in header">
            <td :key="a_index">{{item[attribute.name]}}</td>
          </template>

          <th v-if="hasAction">
            <slot :row-id="item[idName]" :row-value="item[valueName]" :row-index="body_index"></slot>
          </th>
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
    hasAction: {
      type: Boolean,
      default: false
    },
    hasIndex: {
      type: Boolean,
      default: true
    },
    idName: String,
    valueName: String

  }
}
</script>

<style>

</style>

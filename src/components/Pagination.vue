<template>
<div>
  <slot></slot>
  <ul class="pagination">
    <li v-for="(page, i) in lastPage" v-if="lastPage > 1" :key="i">
      <!-- Page: {{page}} LastPage {{lastPage}} -->
      <router-link :to="{name: 'list-label', params: {type: type, query: query, page: page}}">{{page}}</router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        url: String,
        query: String,
        type: String,
        lastPage: [String, Number],
        perPage: Number
    }
}
</script>

<style lang="scss">
.pagination {
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;

  > li {
    display: inline-block;
    margin-right: 1rem;

    > a {
    }
  }
}
</style>

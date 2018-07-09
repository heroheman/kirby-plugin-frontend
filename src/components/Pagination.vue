<template>
<div>
  <slot></slot>
  <ul class="pagination">
    <li v-for="(page, i) in lastPage" v-if="lastPage > 1" :key="i">
      <!-- Page: {{page}} LastPage {{lastPage}} -->
      <!-- #TODO: For some reason the all page takes the page as query -->
      <router-link :to="{name: 'list', params: {type: type, page: page}}" v-if="isLabel">
        {{page}}
      </router-link>
      <router-link :to="{name: 'list-all-page', params: {type: type, page: page}}" v-if="isAll">
        {{page}}
      </router-link>
      <router-link :to="{name: 'list-search', params: {query: query, page: page}}" v-if="isSearch">
        {{page}}
      </router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
    name: 'pagination',
    data() {
      return {
        isSearch: false,
        isAll: false,
        isLabel: false
      }
    },
    props: {
        query: String,
        type: String,
        lastPage: [String, Number],
        perPage: Number
    },
    mounted() {
      if(this.type === 'search') {
        this.isSearch = true;
        this.isAll = false;
        this.isLabel = false;
      } else if (this.type === 'all') {
        this.isSearch = false;
        this.isAll = true;
        this.isLabel = false;
      } else {
        this.isSearch = false;
        this.isAll = false;
        this.isLabel = true;
      }
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

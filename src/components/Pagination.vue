<template>
<div>
  <slot></slot>
  <ul>
    <li v-for="(page, i) in lastPage" v-if="lastPage > 1">
      <!-- Page: {{page}} LastPage {{lastPage}} -->
      <router-link :to="{name: 'list-label-page', params: {type: type, page: page}}">{{page}}</router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        url: String,
        type: String,
        lastPage: Number,
        perPage: Number
    }
}
</script>

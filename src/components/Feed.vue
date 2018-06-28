<template>
  <div class="feed">
    <slot></slot>
    {{ message }}
  </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'ich bin die message'
        }
    }
}
</script>

<style lang="scss">
  .feed {
    background: lightgrey; padding: 10px;
  }
</style>

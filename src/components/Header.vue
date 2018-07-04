<template>
<header class="l-header">
  <div class="header">
    <h1 class="header__brand">
      <img alt="" src="../assets/kirbyicon.png"/>
      <slot></slot>
    </h1>
  </div>
  <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'list-label', params: { type: 'all' }}">
          all
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'about'}">About</router-link>
      </li>
      <li v-for="label in labels" v-if="label.color !== 'ffffff'" style="color: label.color">
        <router-link :to="{ name: 'list-label', params: { type: label.name }}">
          {{ label.name }}
        </router-link>
      </li>

    </ul>
  </nav>
</header>
</template>

<script>
export default {
    name: 'header',
    data () {
        return {
        }
    },
    methods: {
    },
    props: {
        labels: Array
    }
}
</script>

<style lang="scss">
.header {
    position: relative;

    &__brand {
        vertical-align: middle;
        font-weight: 400;

        span {
            font-size: inherit;
            font-weight: 800;
            font-style: italic;
        }

        img {
            position: relative;
            top: 5px;
            max-width: 3rem;
            max-height: 3rem;
        }

    }
}
</style>

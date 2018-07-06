<template>
  <div class="l-header">
    <header class="header">
      <h1 class="header__brand">
        <img alt="" src="../assets/kirbyicon.png"/>
        <slot></slot>
      </h1>
    </header>

    <nav class="nav">

      <ul class="navlist">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link :to="{'path': '/about'}">About & FAQ</router-link>
        </li>
        <li>
          <router-link :to="{'path': '/privacy'}">Privacy</router-link>
        </li>
      </ul>
      
      <ul class="navlist">
        <li class="navlist__desc">{{labelTypes.name}}</li>
        <li v-for="type in labelTypes.items">
          <router-link :to="{ name: 'list-label', params: { type: type }}">
            {{ type }}
          </router-link>
        </li>
      </ul>

      <ul class="navlist">
        <li class="navlist__desc">{{labelGroups.name}}</li>
        <li v-for="group in labelGroups.items">
          <router-link :to="{ name: 'list-label', params: { type: group }}">
            {{ group }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- l-footer -->
    <footer-section>
    </footer-section>
  </div>

</template>

<script>
  import Footer from './Footer.vue';
  export default {
  name: 'header',
  components: {
    'footer-section': Footer
  },
  data () {
      return {
          labelTypes: {
              name: 'Types',
              items: ['all', 'Blueprint', 'Controller', 'Core', 'Field', 'Misc', 'Model', 'Plugin', 'Snippet', 'Tag', 'Template'],
          },
          labelGroups: {
              name: 'Groups',
              items: ['Commercial', 'Panel', 'Screenshot', 'Stable', 'Beta']
          }
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
    margin-bottom: 5rem;

    &__brand {
        vertical-align: middle;
        font-weight: 400;
        font-size: 2rem;

        span {
            font-size: inherit;
            font-weight: 800;
            font-style: italic;
        }

        img {
            position: relative;
            top: 9px;
            max-width: 3rem;
            max-height: 3rem;
        }

    }
}

.nav {
  position: relative;
}
.navlist {
  position: relative;
  list-style: none;
  margin: 0 0 3rem;
  padding: 0;

  > li {
    margin: 0 0 .5rem;
    > a {
      text-decoration: none;
      border: 0;
    }
  }

  &__desc {
    font-weight: 800;
  }
}
</style>

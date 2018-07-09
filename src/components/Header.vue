<template>
  <div class="l-header">
    <header class="header">
      <h1 class="header__brand">
        <img alt="" src="../assets/kirbyicon.png"/>
        <slot></slot>
      </h1>
      <nav class="header__icons" v-if="$mq === 'xs'">
        <ul class="navlist--mobile">
          <li>
            <router-link to="/" title="Home">
              <SvgIcon :icon="'home'"></SvgIcon>
            </router-link>
          </li>
          <li>
            <router-link :to="{'path': '/about'}" title="About & Faq">
              <SvgIcon :icon="'question'"></SvgIcon>
            </router-link>
          </li>

          <li>
            <button @click="showFilter()">
              <SvgIcon :icon="'filter'" title="Filter List"></SvgIcon>
            </button>

          </li>
        </ul>
      </nav>

      <div class="header__filter" v-if="filterOpen && $mq == 'xs'">

        <ul class="navlist">
          <li class="navlist__desc">{{labelTypes.name}}</li>
          <li v-for="type in labelTypes.items">
            <router-link :to="{ name: 'list', params: { type: type }}">
              {{ type }}
            </router-link>
          </li>
        </ul>

        <ul class="navlist">
          <li class="navlist__desc">{{labelGroups.name}}</li>
          <li v-for="group in labelGroups.items">
            <router-link :to="{ name: 'list', params: { type: group }}">
              {{ group }}
            </router-link>
          </li>
        </ul>

      </div>
    </header>

    <nav class="nav" v-if="$mq !== 'xs'">

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
          <router-link :to="{ name: 'list', params: { type: type }}">
            {{ type }}
          </router-link>
        </li>
      </ul>

      <ul class="navlist">
        <li class="navlist__desc">{{labelGroups.name}}</li>
        <li v-for="group in labelGroups.items">
          <router-link :to="{ name: 'list', params: { type: group }}">
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
  import SvgIcon from './SvgIcon.vue';
  import Footer from './Footer.vue';
  export default {
  name: 'HeaderSection',
  components: {
    'footer-section': Footer,
    SvgIcon
  },
  data () {
      return {
        filterOpen: false,
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
    showFilter: function() {
      this.filterOpen = !this.filterOpen;
    }
  },
  props: {
      labels: Array
  }
}
</script>

<style lang="scss">
@import './../assets/scss/_vars.scss';

.header {
    position: relative;
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    @media screen and (min-width: $xs) {
      margin-bottom: 5rem;
    }

    &__icons {
      flex-basis: 50%;
      align-self: flex-end;
      text-align: right;
      padding-right: 2rem;
    }

    &__brand {
      flex-basis: 50%;
      margin: 0;
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

    &__filter {
      flex-basis: 100%;
    }

    @media screen and (min-width: $xs) {
      &__icons {
        display: none;
      }
      &__brand {
        flex-basis: 100%;
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

  &--mobile {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
      display: inline-block;
      margin: 0 .5rem 0 0;

      > a {
        text-decoration: none;
        border: 0;
      }
    }
  }
}
</style>

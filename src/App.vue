<template>
<div id="app">
  <header-section>
    Ich, Header
  </header-section>

  <router-view/>

  <footer-section>
      &copy; 2018 - Florenz Heldermann (Frontend), Plugindata provided by Jens Tornell
  </footer-section>
</div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Issues from './components/Issues.vue';
import List from './components/List.vue';

export default {
    name: 'app',
    components: {
        'header-section': Header,
        Issues,
        List,
        'footer-section': Footer
    },
    data () {
        return {
            epIssues: 'https://api.github.com/repos/jenstornell/kirby-plugins/issues',
            epLabels: 'https://api.github.com/repos/jenstornell/kirby-plugins/labels',
            epIssueLabel: 'https://api.github.com/repos/jenstornell/kirby-plugins/issues?labels='
        }
    }
}
</script>

<style lang="scss">
</style>

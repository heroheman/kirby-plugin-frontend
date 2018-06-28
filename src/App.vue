<template>
<div id="app">
  <Header>
    Ich, Header
  </Header>

  <router-view/>

  <Footer>
      &copy; 2018 - Florenz Heldermann (Frontend), Plugindata provided by Jens Tornell
  </Footer>
</div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Issues from './components/Issues.vue';

export default {
    name: 'app',
    components: {Header, Issues, Footer},
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

<template>
<div id="app" class="l-container l-container--grid">
  <!-- l-header -->
  <header-section :labels="labels">
    kirby <span>Plugins</span>
  </header-section>

  <main class="l-main">
    <router-view/>
  </main>

  <!-- l-footer -->
  <footer-section>
      &copy; 2018 - Florenz Heldermann (Frontend), Plugindata provided by Jens Tornell
  </footer-section>
</div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import List from './components/List.vue';
import axios from 'axios';

export default {
    name: 'app',
    components: {
        'header-section': Header,
        List,
        'footer-section': Footer
    },
    data () {
        return {
            labels: [],
            epIssues: 'https://api.github.com/repos/jenstornell/kirby-plugins/issues',
            epLabels: 'https://api.github.com/repos/jenstornell/kirby-plugins/labels',
            epIssueLabel: 'https://api.github.com/repos/jenstornell/kirby-plugins/issues?labels='
        }
    },
    created() {
        this.getLabels()
    },
    methods: {
        getLabels: function() {
            axios.get(this.epLabels + '?per_page=100').then(response => {
                this.labels = response.data;
            });
        }
    }
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';

</style>

<template>
    <div id="app" class="l-container l-container--grid">
        <SvgIcons></SvgIcons>

        <!-- l-header -->
        <HeaderSection :labels="labels">
            kirby <span>plugins</span>
        </HeaderSection>

        <main class="l-main">
            <router-view/>
        </main>

    </div>
</template>

<script>
import HeaderSection from './components/Header.vue';
import Footer from './components/Footer.vue';
import SvgIcons from './components/svgicons.vue';
import List from './components/List.vue';
import axios from 'axios';

export default {
    name: 'app',
    components: {
        HeaderSection,
        List,
        SvgIcons
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

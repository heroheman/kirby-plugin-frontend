<template>
<div class="issues">
  <slot></slot>
  <ul class="labels">
    <li v-for="label in labels">
      <router-link :to="'/label/' + label.name">
        {{ label.name}}
      </router-link>
    </li>
  </ul>

  <ul v-for="item in results">
    <li>
      <hr/>
      <router-link :to="'/detail/' + item.number">
        {{ item.title }}
      </router-link>
      <ul class="labels">
        <li v-for="label in item.labels">
          {{ label.name }}
        </li>
      </ul>
    </li>
  </ul>

  <Pagination :lastPage="lastPage" :url="apiBaseLink">
    Pagination
  </Pagination>

</div>
</template>

<script>
import axios from 'axios';
import parse from 'parse-link-header';
import Pagination from '../components/Pagination.vue';

export default {
    name: 'Issues',
    components: { Pagination },
    data() {
        return {
            currentPage: this.$route.params.page || 1,
            perPage: 3,
            lastPage: 0,
            headerLink: '',
            apiBaseLink: this.$parent.epIssues,
            apiLink: '',
            results: [],
            labels: [],
            issues: []
        }
    },
    created() {
        this.buildApiUrl();
        this.getLabels();
        this.getIssues();
    },
    methods: {
        buildApiUrl: function() {
            console.log(this.currentPage);
            this.apiLink = this.$parent.epIssues + '?page=' + this.currentPage + '&per_page=' + this.perPage;
            console.log(this.apiLink);
        },
        getIssues: function() {
            axios.get(this.apiLink)
                .then(response => {
                    this.results = response.data;
                    this.headerLink = response.headers.link;
                    this.getTotalPages(this.headerLink);
                })
                .catch( e => {
                    this.errors.push(e);
                })
            ;
        },
        getTotalPages: function(header) {
            let parsed = parse(header);
            this.lastPage = parsed['last'].page;
        },
        getLabels: function() {
            axios.get(this.$parent.epLabels).then(response => {
                this.labels = response.data;
            });
        },
        getNext: function() {
            axios.get(this.$parent.epIssues + '?page=' + this.page)
                .then(response => {
                    this.results = response.data;
                    console.log(this.results);
                })
                .catch( e => {
                    this.errors.push(e);
                })
            ;
        },
        getPrev: function() {
        }
    }
}
</script>

<style lang="scss">
  .issues {
      padding: 10px;
  }
  ul.labels {
      padding: 0;
      margin: 30px 0;
      li { display: inline-block; margin-right: 20px;}
  }
</style>

<template>
<div class="issues">
  <slot></slot>
  <ul class="labels">
    <li v-for="label in labels">
      <router-link :to="{ name: 'list-label', params: { type: label.name }}">
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
    name: 'Items',
    components: { Pagination },
    data() {
        return {
            currentPage: this.$route.params.page || 1,
            perPage: 5,
            lastPage: 0,
            headerLink: '',
            apiBaseLink: this.$parent.epIssues,
            apiLink: '',
            type: this.$route.params.type,
            results: [],
            labels: [],
            labelsPerPage: 100,
            issues: []
        }
    },
    created() {
        this.getItems();
        this.getLabels();
    },
    watch: {
        '$route.params.type': function() {
            this.type = this.$route.params.type;
            this.getItems();
        }
    },
    methods: {
        getItems: function() {
            if (this.type === 'all') {
                // build all api url
                // todo: template literal
                this.apiLink = this.$parent.epIssues + '?page=' + this.currentPage + '&per_page=' + this.perPage;
            } else {
                this.apiLink = this.$parent.epIssues + '?labels=' + this.type + '&page=' + this.currentPage + '&per_page=' + this.perPage;
            }

            console.log(this.apiLink, this.currentPage);

            axios.get(this.apiLink)
                .then(response => {
                    this.results = response.data;
                    this.headerLink = response.headers.link;
                    this.getTotalPages(this.headerLink);
                })
                .catch( e => {
                    console.log(e);
                })
            ;
        },
        getTotalPages: function(header) {
            let parsed = parse(header);
            // if (parsed['last'] !== null) {
            //     // this.lastPage = parsed['last'].page;
            // };
        },
        getLabels: function() {
            axios.get(this.$parent.epLabels + '?per_page=' + this.labelsPerPage).then(response => {
                this.labels = response.data;
            });
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

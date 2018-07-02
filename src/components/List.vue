<template>
<div class="issues">

  <input name="" type="text"
         v-model="query"
         @keyup.enter="searchQuery"
         @input="searchQuery"
         />
  <button @click="searchQuery">Lupe</button>
  {{ query }}

  <ul class="labels">
    <li>
      <router-link :to="{ name: 'list-label', params: { type: 'all' }}">
        all
      </router-link>
    </li>
    <li v-for="label in labels">
      <router-link :to="{ name: 'list-label', params: { type: label.name }}">
        {{ label.name}}
      </router-link>
    </li>
  </ul>

  <ul v-for="item in results" v-if="results !== 0">
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

  <div v-if="results === 0">
    No Results
  </div>

  <Pagination
    :lastPage="lastPage"
    :url="apiBaseLink"
    :type="type"
    :perPage="perPage">
    Pagination
  </Pagination>

</div>
</template>

<script>
import axios from 'axios';
import parse from 'parse-link-header';
import Pagination from '../components/Pagination.vue';
let timeout = null;

export default {
    name: 'Items',
    components: { Pagination },
    data() {
        return {
            query: this.$route.params.query || '',
            currentPage: this.$route.params.page || 1,
            perPage: 20,
            lastPage: this.$route.params.page || 1,
            headerLink: '',
            apiBaseLink: this.$parent.epIssues,
            apiLink: '',
            type: this.$route.params.type,
            results: [],
            labels: [],
            labelsPerPage: 100
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
        },
        '$route.params.page': function() {
            this.currentPage= this.$route.params.page;
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
            console.log('header', header);
            let temp = this.lastPage;
            if (header !== undefined) {
                let parsed = parse(header);
                if (parsed['last'] !== null) {
                    this.lastPage = parseInt(parsed['last'].page);
                };
            } else {
                this.lastPage = temp;
            }
        },
        getLabels: function() {
            axios.get(this.$parent.epLabels + '?per_page=' + this.labelsPerPage).then(response => {
                this.labels = response.data;
            });
        },
        searchQuery: function() {
            let url = `https://api.github.com/search/issues?q=${this.query}+repo:jenstornell/kirby-plugins&sort=created&order=asc`;
            clearTimeout(timeout);
            timeout = setTimeout( ()=> {
                console.log(this.query, url);
                this.$router.push({name: 'search', params: {query: this.query}});
                if (this.query !== '') {
                    axios.get(url)
                        .then(response => {
                            this.results = response.data.items;
                            console.log(response.meta);
                        })
                        .catch( e => {
                            console.log(e);
                        })
                } else {
                    this.$router.push({name: 'list-label', params: {type: 'all'}});
                    this.getItems();
                }
            }, 1000);
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

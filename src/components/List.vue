<template>
<div class="list">

  <section class="list__search">
    <input class="list__searchfield" name="" type="text"
           placeholder="search for plugin, label, author or anything else"
           v-model="query"
           @input="searchQuery" />

    <div class="list__tools">
      <p class="list__ratelimit" v-if="rateLimit !== ''">
        Ratelimit:
        {{rateLimit.resources.search.remaining}}
        /
        {{rateLimit.resources.search.limit}}
      </p>
      <button class="list__searchbutton" @click="searchQuery">
        <img alt="" src="../assets/icons/search.png"/>
      </button>
    </div>
    <p class="list__smallprint">
      The public Github API is very limited without authentication. If the limit is reached, please wait a moment.
    </p>
  </section>

  <!-- <ul class="labels"> -->
  <!--   <li> -->
  <!--     <router-link :to="{ name: 'list', params: { type: 'all' }}"> -->
  <!--       all -->
  <!--     </router-link> -->
  <!--   </li> -->
  <!--   <li v-for="label in labels"> -->
  <!--     <router-link :to="{ name: 'list', params: { type: label.name }}"> -->
  <!--       {{ label.name}} -->
  <!--     </router-link> -->
  <!--   </li> -->
  <!-- </ul> -->

  <div class="loading" :loading="loading">
    <pacman-loader :loading="loading" color="red"></pacman-loader>
  </div>

  <div class="list__toolbar toolbar">
    <p class="toolbar__text" v-if="query_temp !== ''">
      <strong>{{ resultsCount }}</strong> results for term <strong>{{ query_temp }}</strong>:
    </p>

    <div class="toolbar__filter">
        <select v-model="sortBy">
          <option value="created">created</option>
          <option value="updated">updated</option>
          <option value="comments">comments</option>
        </select>

        <button class="btn btn--icon" v-if="sortDirection === 'asc'" @click="sortDirection = 'desc'" title="descending">
          <SvgIcon :icon="'sort-amount-asc'"></SvgIcon>
          asc
        </button>

        <button class="btn btn--icon" v-if="sortDirection === 'desc'" @click="sortDirection = 'asc'" title="ascending">
          <SvgIcon :icon="'sort-amount-desc'"></SvgIcon>
          desc
        </button>
    </div>
  </div>

  <ul class="list__items" v-if="results !== 0">
    <li class="list__item listitem" v-for="item in results">
      <router-link tag="h3" class="listitem__name" :to="'/detail/' + item.number" :key="item.id">
        <a>
          {{ item.title }}
        </a>
      </router-link>
      <ul class="labels listitem__labels">
        <li class="listitem__label" v-for="label in item.labels">
          <router-link
            :to="{name:'list', params:{ type: label.name }}"
            :class="['label', getLabelClass(label.name)]"
            >
            {{ label.name }}
          </router-link>
        </li>
      </ul>
      <VueMarkdown :source="item.body" class="listitem__description listitem__description--excerpt">
        {{ item.body }}
      </VueMarkdown>
    </li>
  </ul>

  <div v-if="results === 0">
    No Results
  </div>

  <Pagination v-if="!loading"
    :lastPage="lastPage"
    :query="query"
    :type="type"
    :perPage="perPage">
  </Pagination>

</div>
</template>

<script>
import axios from 'axios';
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import parse from 'parse-link-header';
import Pagination from '../components/Pagination.vue';
import VueMarkdown from 'vue-markdown';
import SvgIcon from './SvgIcon.vue';
let timeout = null;

export default {
    name: 'Items',
    components: { Pagination, VueMarkdown, PacmanLoader, SvgIcon },
    data() {
        return {
            query: this.$route.params.query || '',
            query_temp: '',
            rateLimit: '',
            rateLimitReset: '',
            currentPage: this.$route.params.page || 1,
            perPage: 20,
            lastPage: this.$route.params.page || 1,
            headerLink: '',
            apiBaseLink: this.$parent.epIssues,
            apiLink: '',
            type: this.$route.params.type,
            results: [],
            sortBy: 'created',
            sortDirection: 'desc',
            resultsCount: '',
            labels: [],
            loading: true,
            labelsPerPage: 100
        }
    },
    created() {
        this.getItems();
        this.getLabels();
        this.getRateLimit();
    },
    watch: {
        '$route.params.type': function() {
            this.type = this.$route.params.type;
            this.getItems();
        },
        '$route.params.query': function() {
            this.query = this.$route.params.query;
            this.getItems();
        },
        '$route.params.page': function() {
            this.currentPage = this.$route.params.page;
            this.getItems();
        },
        '$route': function (to, from){
            this.getRateLimit();
        },
        sortBy: function (to, from){
            this.getItems();
        },
        sortDirection: function (to, from){
            this.getItems();
        }
    },
    computed: {
    },
    methods: {
        getItems: function() {
          this.loading = true;
          this.results = [];
            // build all api url
            // todo: template literal
            if (this.type === 'all') {
                this.apiLink = this.$parent.epIssues + '?page=' + this.currentPage + '&per_page=' + this.perPage + '&sort=' + this.sortBy + '&direction=' + this.sortDirection;
            } else if(this.type === 'search') {
                this.apiLink = `https://api.github.com/search/issues?q=${this.query}+repo:jenstornell/kirby-plugins&sort=${this.sortBy}&order=${this.sortDirection}&page=${this.currentPage}&per_page=${this.perPage}`;
            } else {
                this.apiLink = this.$parent.epIssues + '?labels=' + this.type + '&page=' + this.currentPage + '&per_page=' + this.perPage + '&sort=' + this.sortBy + '&direction=' + this.sortDirection;
            }

            console.log("api link",this.apiLink)

            axios.get(this.apiLink)
                .then(response => {
                    if(this.type === 'search') {
                      this.loading = false;
                      this.results = response.data.items;
                      this.resultsCount = response.data.total_count;
                      this.getRateLimit();
                    } else {
                      this.loading = false;
                      this.results = response.data;
                    }
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
        getLabelClass: function(label) {
            return `is-${label}`;
        },
        getRateLimit: function() {
            axios.get('https://api.github.com/rate_limit')
                .then(response => {
                    this.rateLimit = response.data;
                })
                .catch( e => {
                    console.log(e);
                })
        },
        searchQuery: function() {
            let url = `https://api.github.com/search/issues?q=${this.query}+repo:jenstornell/kirby-plugins&sort=created&order=asc`;

            clearTimeout(timeout);

            timeout = setTimeout( ()=> {
                this.query_temp = this.query;
                this.resultsCount = '';
                if (this.query !== '') {
                    this.$router.push({name: 'list-search', params: {type: 'search', query: this.query}});
                } else {
                    this.query = '';
                    this.query_temp = this.query;
                    this.$router.push({name: 'list', params: {type: 'all'}});
                }
            }, 1000);
        }
    }
}
</script>

<style lang="scss">
@import './../assets/scss/_vars.scss';

.list {
  position: relative;
    padding: 10px;
    min-height: 70vh;

    &__search {
        position: relative;
        top: 1rem;
        width: 100%;
        margin-bottom: 5rem;
    }
    &__searchfield {
        width: 100%;
        padding: 1rem;
    }
    &__tools {
        @media screen and (min-width: $xs) {
          position: absolute;
          right: 1rem;
          top: 1rem;
        }
    }
    &__ratelimit,
    &__searchbutton {
        display: inline;
    }
    &__ratelimit {
        position: relative;
        font-size: 1.2rem;
        color: #aaa;
        margin-right: .5rem;
        vertical-align: text-top;
    }
    &__searchbutton {
        appearance: none;
        -webkit-appearance: none;
        border: 0;
        background: 0;
        img {
            width: 2rem;
            height: 2rem;
        }
    }
    &__smallprint {
        font-size: 1.2rem;
        color: #aaa;
        margin: 0;
        margin-top: 0.3rem;

        @media screen and (min-width: $xs) {
          text-align: right;
        }
    }


    &__items {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    &__item {
        border: 1px solid #eee;
        margin-bottom: 3rem;
        padding: 2rem;
    }
}

.listitem {
    display: grid;
    grid-template-areas: "name"
                          "description"
                          "labels";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto 1fr;

    @media screen and (min-width: $sm) {
      grid-template-areas: "name name labels"
                              "description description description";
      grid-template-columns: 40% 1fr;
      grid-template-rows: 1fr;
    }

    &__name {
        grid-area: name;
        display: block;
        margin: 0;
    }
    &__labels {
        grid-area: labels;
        text-align: left;
        margin: 0;
        padding: 1rem 0;
        @media screen and (min-width: $sm) {
          text-align: right;
          padding: 0;
        }
    }
    &__description {
        grid-area: description;
        margin-top: 1rem;
        &--excerpt {
            img, img, pre, ul, strong, br, table,
            h1, h2, h3, h4, h5, h6, p > a, blockquote + p
            { display: none; }

            p {
                padding: 0;
                margin: 0;
            }

            blockquote {
                font-style: italic;
                padding: 0;
                margin: 0;
                p {display: inline;}
            }
        }
    }
}

</style>

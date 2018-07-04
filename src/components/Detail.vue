<template>
<div class="detail">
  <h2 class="detail__headline">
    <a :href="detail.html_url">
      #{{detailId}}
    </a> &dash;
    {{ detail.title }}
    </h2>
    <vue-markdown class="detail__body" :source="detail.body">
      Loading Data
    </vue-markdown>
  </div>
</template>

<script>
import axios from 'axios';
import VueMarkdown from 'vue-markdown';

export default {
    name: 'detail',
    data() {
        return {
            detail: [],
            detailId: this.$route.params.id
        }
    },
    components: { VueMarkdown },
    mounted() {
        axios.get('https://api.github.com/repos/jenstornell/kirby-plugins/issues/' + this.detailId).then(response => {
            this.detail = response.data;
        });
    }
}
</script>

<style lang="scss">
.detail {
    position: relative;

    &__headline {
        margin-top: 3rem;
        font-weight: 400;

        span {
            font-size: inherit;
            color: #ccc;
        }
    }
    &__body {
        blockquote {
            border-left: 2px solid red;
            margin-left: 0;
            padding-left: 2rem;
            p {
                font-size: 2rem;
                font-style: italic;
            }
        }
    }
    img {
          max-width: 100%;
      }
  }
</style>

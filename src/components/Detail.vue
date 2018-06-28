<template>
  <div class="detail">
    <h1>Detail {{detailId}}: {{ detail.title }}</h1>
    <vue-markdown :source="detail.body">
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

<template>
<div class="label">
  <ul v-for="item in label">
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
    <!-- <vue-markdown :source="item.body"> -->
    <!-- </vue-markdown> -->
  </ul>
</div>
</template>

<script>
import axios from 'axios';
import VueMarkdown from 'vue-markdown';

export default {
    name: 'detail',
    data() {
        return {
            label: [],
            labelName: this.$route.params.name
        }
    },
    components: { VueMarkdown },
    mounted() {
        axios.get(this.$parent.epIssueLabel + this.labelName).then(response => {
            this.label = response.data;
        });
    }
}
</script>

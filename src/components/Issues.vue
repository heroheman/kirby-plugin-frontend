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

  <ul v-for="issue in issues">
    <li>
      <hr/>
      <router-link :to="'/detail/' + issue.number">
        {{ issue.title }}
      </router-link>
      <ul class="labels">
        <li v-for="label in issue.labels">
          {{ label.name }}
        </li>
      </ul>
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Issues',
    data() {
        return {
            results: [],
            labels: [],
            issues: []
        }
    },
    created() {
        axios.get(this.$parent.epIssues).then(response => {
            this.issues = response.data;
        });

        axios.get(this.$parent.epLabels).then(response => {
            this.labels = response.data;
        });
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

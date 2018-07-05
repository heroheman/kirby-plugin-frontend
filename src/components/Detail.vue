<template>
<section class="detail">
    <div class="detail__head">
        <h2 class="detail__headline">
            <a :href="detail.html_url">
                #{{detailId}}
            </a> &dash;
            {{ detail.title }}
        </h2>

        <ul class="detail__labels labels">
            <li class="listitem__label" v-for="label in detail.labels">
                <router-link
                :to="{name:'list-label', params:{ type: label.name }}"
                :class="['label', getLabelClass(label.name)]"
                >
                {{ label.name }}
                </router-link>
            </li>
        </ul>
    </div>

    <vue-markdown class="detail__body" :source="detail.body">
      Loading Data
    </vue-markdown>


    <div class="comment-wrapper">
        <p class="comment-note">
            <span v-if="detail.comments > 0">
                This Entry has {{detail.comments}} Comments.  Participate directly
                <a :href="detail.html_url">on Github</a>.
            </span>
            <span v-if="detail.comments === 0">
                There is currently no comment for this entry. Participate directly
                <a :href="detail.html_url">on Github</a>.
            </span>
        </p>
        <button class="btn" @click="showComments" v-if="detailComments.length === 0 && detail.comments > 0">
            <SvgIcon :icon="'comments'"></SvgIcon>
            Show Comments
        </button>
        <button class="btn" @click="hideComments" v-if="detailComments.length > 0">
            <SvgIcon :icon="'comments'"></SvgIcon>
            hide Comments
        </button>


        <div class="comments" v-if="detail.comments > 1">
            <div class="comment" v-for="comment in detailComments">
                <div class="comment__img">
                    <img :src="comment.user.avatar_url" :alt="comment.user.login">
                </div>
                <div class="comment__head">
                    <span class="comment__name">
                        <a :href="comment.user.html_url">
                            {{ comment.user.login }}
                        </a>
                    </span>
                    <span class="comment__date" :time="getRelTime(comment.created_at)">
                        test
                    </span>
                    <span class="comment__link">
                        <a :href="comment.html_url">
                            show comment on github
                        </a>
                    </span>
                </div>
                <VueMarkdown class="comment__body" :source="comment.body">
                </VueMarkdown> 
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import VueMarkdown from 'vue-markdown';
import SvgIcon from './SvgIcon.vue';

export default {
    name: 'detail',
    data() {
        return {
            detail: [],
            detailId: this.$route.params.id,
            detailComments: []
        }
    },
    components: { VueMarkdown, SvgIcon },
    mounted() {
        axios.get('https://api.github.com/repos/jenstornell/kirby-plugins/issues/' + this.detailId).then(response => {
            this.detail = response.data;
        });
    },
    methods: {
        showComments: function() {
            axios.get('https://api.github.com/repos/jenstornell/kirby-plugins/issues/' + this.detailId + '/comments').then(response => {
                this.detailComments = response.data;
            });
        },
        hideComments: function() {
            this.detailComments = '';
        },
        getLabelClass: function(label) {
            return `is-${label}`;
        },
        getRelTime: function() {
            moment().fromNow();
        }
    }
}
</script>

<style lang="scss">
.detail {
    position: relative;

    &__head {
        margin-top: 3rem;
    }

    &__headline {
        font-weight: 400;
        display: inline-block;
        margin: 0;

        span {
            font-size: inherit;
            color: #ccc;
        }                
    }
    &__labels {
        text-align: right;
        float: right;
        margin-top: .5rem;
        margin-bottom: 0;
    }
    &__body {
        border-bottom: 1px solid #ccc;
        margin-bottom: 2rem;
        padding-bottom: 2rem;

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

    .comment {
        display: grid;
        grid-template-areas: "img head"
                            "img body" 
                            "img body";
        grid-template-columns: 1fr 7fr;
        grid-template-rows: 1fr 1fr 1fr;

        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 2rem;
        padding: 2rem;

        &__img {
            grid-area: img;
            img {
                border-radius: 5px;
                height: auto;
                width: 100%;
                max-width: 8rem;
            }
        }
        &__head {
            grid-area: head;
        }
            &__name {
            }
            &__date {
            }
            &__link {
            }
        &__body {
            grid-area: body;
            p {
                margin: 0;
            }
        }
    }
</style>

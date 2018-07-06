<template>
<section class="detail">
    <div class="detail__head">
        <h2 class="detail__headline">
            <a :href="detail.html_url">
                #{{detailId}}
            </a> &dash;
            {{ detail.title }}
        </h2>

    </div>

    <div class="detail__body">


        <vue-markdown class="detail__body-main" :source="detail.body">
            Loading Data
        </vue-markdown>

        <div class="detail__body-section">
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


        <div class="detail__body-section">

            <h3 class="detail__subheadline is-toggle" title="Show Readme" @click="getReadme()" v-if="readme === ''">
                <SvgIcon :icon="'plus'"></SvgIcon>
                Show Readme
            </h3>
            <h3 class="detail__subheadline is-toggle" title="Hide Readme" @click="hideReadme()" v-if="readme !== ''">
                <SvgIcon :icon="'minus'"></SvgIcon>
                Hide Readme
            </h3>

            <vue-markdown class="detail__readme" :source="readme">
            </vue-markdown>
        </div>

        <div class="comment-wrapper detail__body-section">
            <h3 class="detail__subheadline is-toggle" @click="showComments" v-if="detailComments.length === 0 && detail.comments > 0">
                <SvgIcon :icon="'plus'"></SvgIcon>
                Show Comments
            </h3>
            <h3 class="detail__subheadline is-toggle" @click="hideComments" v-if="detailComments.length > 0">
                <SvgIcon :icon="'minus'"></SvgIcon>
                Hide Comments
            </h3>

            <p class="comments-note">
                <span v-if="detail.comments > 0">
                    <SvgIcon :icon="'comments'"></SvgIcon>
                    This Entry has {{detail.comments}} Comments.  Participate directly
                    <a :href="detail.html_url">on Github</a>.
                </span>
                <span v-if="detail.comments === 0">
                    <SvgIcon :icon="'comments'"></SvgIcon>
                    There is currently no comment for this entry. Participate directly
                    <a :href="detail.html_url">on Github</a>.
                </span>
            </p>


            <div class="comments" v-if="detail.comments > 0">
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
            detailComments: [],
            showReadme: false,
            readme: '',
            pluginUrl: '',
            pluginRepo: '',
        }
    },
    components: { VueMarkdown, SvgIcon },
    mounted() {
        axios.get('https://api.github.com/repos/jenstornell/kirby-plugins/issues/' + this.detailId).then(response => {
            this.detail = response.data;
            this.getRepoUrl(this.detail.body);
            // this.getReadme();
        });
    },
    methods: {
        showComments: function() {
            axios.get('https://api.github.com/repos/jenstornell/kirby-plugins/issues/' + this.detailId + '/comments').then(response => {
                this.detailComments = response.data;
            });
        },
        getReadme: function() {
            // axios.get('https://api.github.com/repos/octokit/octokit.rb/contents/README.md').then(response => {
            axios.get('https://api.github.com/repos/'+ this.pluginRepo + '/readme').then(response => {
                this.readme = atob(response.data.content);
            });
        },
        hideReadme: function () {
            this.readme = '';
        },
        hideComments: function() {
            this.detailComments = '';
        },
        getLabelClass: function(label) {
            return `is-${label}`;
        },
        getRelTime: function() {
            // #TODO: relative time 
        },
        getRepoUrl: function (bodytext) {
            console.log(bodytext);
            let urlparts = [];
            // find first github url. 
            // also remove a paranthesis, if its in markdown
            this.pluginUrl = bodytext.match(/https?:\/\/github.com[^\s\)]+/);
            urlparts = this.pluginUrl[0].split('/');
            this.pluginRepo = urlparts[3] + '/' + urlparts[4];  
        }
    }
}
</script>

<style lang="scss">
.detail {
    position: relative;

    &__head {
        margin-top: 3rem;
        width: 100%;
        margin-bottom: 2rem;
    }

    &__headline {
        font-weight: 400;
        margin: 0;

        span {
            font-size: inherit;
            color: #ccc;
        }                
    }
    &__subheadline {
        position: relative;
        display: block;
        padding-left: 3.5rem;
        transition: all .25s ease;

        &.is-toggle {
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        svg {
            position: absolute;
            left: 1rem;
            margin-top: .4rem;
            // fill: currentColor;
            fill: red;
            height: 1.5rem;
            width: 1.5rem;
            margin-right: .5rem;
        }
    }
    &__labels {
        margin-top: .5rem;
        margin-bottom: 0;
    }
    &__body {
        border-bottom: 1px solid #ccc;
        margin-bottom: 2rem;
        padding-bottom: 2rem;


        &-main,
        &-section {
            position: relative;
            margin-bottom: 2rem;
            padding: 1rem 2rem;
        }

        &-main {

        }

        &-section {
            background: #f8f8f8;
            border-radius: .5rem;
        }

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
    &__readme {
        padding: 0 1rem;
        h1, h2, h3, h4, h5, h6 {
            font-size: 2rem;
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
    .comments {
        margin-top: 2rem;
        &-note {
            margin: 0;

            .icon {
                margin-left: 1rem;
                margin-right: .5rem;
            }

            // + button {
            //     margin-top: 1rem;
            // }
        }
    }
</style>

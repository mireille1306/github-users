<template>
  <div>
    <h1 class="title-xl">Information about {{$route.params.login}}</h1>
    <div v-if="!loading && !error">
      <div class="card">
        <div class="statistics">
          <div class="stat">
            <span>{{userInfo.followers}}</span>
            <span>Followers</span>
          </div>
          <div class="stat">
            <span>{{userInfo.following}}</span>
            <span>Following</span>
          </div>
          <div class="stat">
            <span>{{userInfo.public_repos}}</span>
            <span>Public repos</span>
          </div>
          <div class="stat">
            <span>{{userInfo.public_gists}}</span>
            <span>Public gists</span>
          </div>
        </div>
        <figure><img :src="userInfo.avatar_url" alt=""></figure>
        <div class="text">
          <h2 class="title-m">{{userInfo.name}}</h2>
          <dl>
            <dt>Company:</dt>
            <dd>{{userInfo.company ? userInfo.company : 'Unknown'}}</dd>
            <dt>Location:</dt>
            <dd>{{userInfo.location ? userInfo.location : 'Unknown'}}</dd>
            <dt>Github page:</dt>
            <dd>
              <a :href="userInfo.html_url" v-if="userInfo.html_url" target="_blank">Link to Github</a>
              <span v-else>No Github page</span>
            </dd>
            <dt>Blog:</dt>
            <dd>
              <a :href="addHTTP(userInfo.blog)" v-if="userInfo.blog" target="_blank">Link to blog</a>
              <span v-else>No personal blog</span>
            </dd>
          </dl>
        </div>

        <div class="biography">
          <h3 class="title-s">Biography</h3>
          <p>{{userInfo.bio ? userInfo.bio : 'This user doesn`t seem to have a bio'}}</p>
        </div>
      </div>
    </div>
    <Loader v-if="loading && !error" />
    <Error v-if="error.length" :message="error.message" />
    <router-link to="/" @click="clearUser()" class="btn">Go back</router-link>
  </div>
</template>

<script>
  import Loader from '@/components/Loader.vue'
  import Error from '@/components/Error.vue'
  /* eslint-disable */
  export default {
    components: {
      Loader,
      Error
    },
    computed: {
      userInfo() {
        return this.$store.state.singleUser;
      },

      loading() {
        return this.$store.state.loading;
      },

      error() {
        return this.$store.state.error;
      }
    },

    methods: {
      clearUser() {
        this.store.commit('clearSingleUser');
      },

      addHTTP(url) {
        return url.includes('http') ? url : `http://${url}`;
      }
    },

    mounted() {
      this.$store.dispatch('getSingleUser', this.$route.params.login);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/colors';

  .card {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;

    figure {
      margin: 0 1rem 1rem 0;
      flex: 0 0 100%;
      height: 200px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }

    .text {
      width: 100%;
    }

    dl {
      display: grid;
      grid-template-columns: 135px 1fr;
      grid-gap: 0.5rem;
    }
  }

  .biography {
    width: 100%;

    p {
      max-width: 700px;
    }

    >:last-child {
      margin-bottom: 0;
    }
  }

  .statistics {
    display: flex;
    background: $primary;
    color: $tint-25;
    width: calc(100% + 2rem);
    margin: -1rem -1rem 1rem -1rem;
    padding: 1rem 0.5rem;
    justify-content: space-evenly;
  }

  .stat {
    text-align: center;

    span {
      display: block;

      &:first-child {
        font-size: 22px;
        font-weight: 600;
      }

      &:last-child {
        font-size: 12px;
        text-transform: uppercase;
      }
    }
  }

  .btn {
    margin-top: 2rem;
  }

  @media (min-width: 768px) {
    .card {
      padding: 2rem;

      figure {
        flex: 0 0 200px;
        height: 200px;
      }

      .text {
        width: calc(100% - (200px + 1rem));
        padding-top: 0;
      }
    }

    .statistics {
      width: calc(100% + 4rem);
      margin: -2rem -2rem 2rem -2rem;
      padding: 1rem;
      justify-content: center;

      .stat {
        margin-right: 2.5rem;

        span {
          &:first-child {
            font-size: 30px;
          }

          &:last-child {
            font-size: 16px;
          }
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
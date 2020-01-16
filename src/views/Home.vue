<template>
  <div class="home">
    <h1>Github users from Amsterdam</h1>
    <div v-if="!error">
      <Search />
      <p v-if="query.length">
        <strong>{{filteredUsers.length}}</strong> {{filteredUsers.length > 1 ? 'Results' : 'Result'}}
        for '<strong>{{query}}</strong>'
      </p>
      <div class="cards-wrapper" v-if="!loading">
        <Card v-for="user in filteredUsers" :userData="user" :key="user.login" />
      </div>
      <Loader v-if="loading" />
    </div>
    <Error v-if="error" />
  </div>
</template>

<script>
  import Loader from '@/components/Loader.vue'
  import Card from '@/components/Card.vue'
  import Search from '@/components/Search.vue'
  import Error from '@/components/Error.vue'

  export default {
    name: 'home',
    components: {
      Loader,
      Card,
      Search,
      Error
    },
    computed: {
      loading() {
        return this.$store.state.loading;
      },

      error() {
        return this.$store.state.error;
      },

      query() {
        return this.$store.state.query;
      },

      filteredUsers() {
        return [...this.$store.state.users].filter(u => u.login.toLowerCase().startsWith(this.query));
      },
    },
    methods: {
      loadMoreUsers() {
        this.$store.dispatch('getAllUsers');
      }
    },
    mounted() {
      this.$store.dispatch('getAllUsers');
    }
  }
</script>

<style scoped>
  .cards-wrapper {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 40px;
    margin: 50px 0;
  }

  @media (min-width: 576px) {
    .cards-wrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 768px) {
    .cards-wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1200px) {
    .cards-wrapper {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
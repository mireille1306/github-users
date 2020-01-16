<template>
  <div class="search">
    <input type="text" @keyup="searchUser" v-model="query" placeholder="search for users">
    <i class="icon-search"></i>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        query: ''
      };
    },
    methods: {
      searchUser () {
        this.$store.commit('setQuery', this.query.toLowerCase());
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/colors';
  .search {
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  .icon-search {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    height: 22px;
    font-size: 32px;
    color: $tint-20;

    &:after {
      content: '\26B2';
      transform: rotate(45deg);
      display: block;
      position: relative;
      top: -5px;
    }

  }

  input {
    padding: 1rem 2rem;
    border-radius: 2rem;
    border: 1px solid $tint-20;
    font-size: 18px;
    min-width: 100%;

    &::placeholder {
      color: $tint-20;
    }

    &:not(:placeholder-shown) {

      + .icon-search {
        color: $tint-10;
      }
    }

    &:focus {
      border: 1px solid $tint-10; 
      outline: none;
    }
  }

  @media (min-width: 768px) {
    input {
      min-width: 300px;
    }
  }
</style>
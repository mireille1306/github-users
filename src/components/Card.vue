<template>
  <router-link :to="'user-details/' + userData.login">
    <div class="card">
      <figure>
        <img :src="userData.avatar_url" :alt="userData.login">
      </figure>
      <div class="text">
        <h2>{{userData.login}}</h2>
      </div>
      <span class="btn readmore">More info</span>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      userData: Object
    },
    computed: {
      loading() {
        return this.$store.state.loading;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/colors';

  a {
    text-decoration: none;
  }

  .card {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    max-height: 400px;
    position: relative;
    animation: fadeIn 0.5s ease-out;
    color: $tint-0;

    &:hover {

      figure {
        height: 100px;
        background-size: 100% auto;
        height: 200px;
      }

      img {
        width: 106%;
        height: 106%;
        object-position: top center;
        transform: translate(-3%, -3%);
      }

      .readmore {
        transform: translate(-50%, 0px) scale(1);
        opacity: 1;
      }
    }

    figure {
      width: 100%;
      height: 220px;
      margin: 0;
      background-size: 110% auto;
      background-repeat: no-repeat;
      background-position: top center;
      transition: ease all 0.3s;
      overflow: hidden;
      background: $tint-23;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      transition: ease all 0.3s;
    }

    .text {
      padding: 2rem;
      overflow: hidden;
      transition: ease all 0.3s;
      background: $tint-25;

      > :last-child {
        margin-bottom: 0;
      }

      h2 {
        margin: 0 0 1rem 0;
        text-transform: uppercase;
        font-weight: 400;
      }
    }

    .readmore {
      position: absolute;
      left: 50%;
      bottom: -20px;
      transform: translate(-50%, 50px) scale(0);
      z-index: 1;
      display: block;
      transition: ease opacity 0.3s;
      opacity: 0;
    }
  }
</style>
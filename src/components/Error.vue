<template>
  <div class="error-message">
    <h2>Oh no... Something went wrong</h2>
    <p>Message: </p>
    <p class="message">'{{message}}'</p>
  </div>
</template>

<script>
  export default {
    computed: {
      message () {
        return this.$store.state.errorMessage;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/colors';

  .error-message {
    color: $primary;
    text-align: center;
  }

  .message {
    font-style: italic;
  }
</style>
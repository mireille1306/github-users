<template>
  <div class="loader">
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@import '@/styles/colors';

.loader {
  display: flex;
  justify-content: center;

  .loader-dot {
    width: 20px;
    height: 20px;
    margin: 2rem;
    background: $primary;
    border-radius: 50%;
    animation: grow infinite 2s;
    transform-origin: center;
    display: inline-block;
  }
}

@keyframes grow {
  0% {
    transform: scale(0);
  }

  40% {
    transform: scale(1.1);
  }

  50% {
    transform: scale(1);
  }

  60% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(0);
  }
}
</style>
<script setup lang="ts">
const show = ref(false)
window.$loading = {
  start: () => (show.value = true),
  finish: () => (show.value = false)
}
</script>
<template>
  <div id="global-loading" :style="{ display: show ? 'flex' : 'none' }">
    <svg class="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  </div>
</template>
<style lang="less">
@offset: 187;
@duration: 1.4s;

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(270deg);
  }
}

@keyframes colors {
  0% {
    stroke: #4285f4;
  }

  25% {
    stroke: #de3e35;
  }

  50% {
    stroke: #f7c223;
  }

  75% {
    stroke: #1b9a59;
  }

  100% {
    stroke: #4285f4;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: @offset;
  }

  50% {
    stroke-dashoffset: (@offset / 4);
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: @offset;
    transform: rotate(450deg);
  }
}

#global-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: rgb(0 0 0 / 10%);
  transition: display 500ms ease-in-out;

  .spinner {
    animation: rotator @duration linear infinite;

    .path {
      stroke-dasharray: @offset;
      stroke-dashoffset: 0;
      transform-origin: center;
      animation:
        dash @duration ease-in-out infinite,
        colors (@duration * 4) ease-in-out infinite;
    }
  }
}
</style>

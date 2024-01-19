<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div v-if="loading" class="loading">
    <p class="text">园区资源加载中…</p>
    <div class="loading-process">
      <div class="process-wrapper"></div>
    </div>
  </div>
</template>

<style lang="scss">
.loading {
  position: absolute;
  left: 66%;
  top: 40%;
  transform: translateX(-50%);
  text-align: center;

  .text {
    font-size: 14px;
    color: #909399;
    margin-bottom: 16px;
  }

  .loading-process {
    width: 280px;
    height: 4px;
    background: rgba(255, 255, 255, 0.16);
    border-radius: 20px;
    overflow: hidden;
  }

  .process-wrapper {
    height: 100%;
    width: 5%;
    background: linear-gradient(90deg, #48ffff 0%, #3656ff 100%);
    animation-duration: 1000s;
    animation-name: loading;
  }

  @keyframes loading {
    0% {
      transform: scaleX(1);
    }

    1% {
      transform: scaleX(38);
    }

    100% {
      transform: scaleX(40);
    }
  }
}
</style>

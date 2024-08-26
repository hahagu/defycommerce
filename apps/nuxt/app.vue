<script lang="ts" setup>
const appConfig = useAppConfig();
provideHeadlessUseId(() => useId());
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

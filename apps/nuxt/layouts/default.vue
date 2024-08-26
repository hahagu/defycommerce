<template>
  <div class="absolute flex min-h-dvh w-full flex-col">
    <AppHeader />
    <AppMenu />
    <AppCart />
    <div class="flex justify-center">
      <div class="w-10/12 md:w-6/12">
        <slot />
      </div>
    </div>
    <div class="flex-1"></div>
    <AppFooter />
  </div>
</template>

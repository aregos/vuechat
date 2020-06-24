<template>
  <div id="app">
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import './main.css';
</style>

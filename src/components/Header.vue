<template>
<header id="header" class="l-header">
  <slot></slot>
  <nav>
      <router-link to="/">Home</router-link>
      <router-link :to="{name: 'about'}">About</router-link>
  </nav>
</header>
</template>

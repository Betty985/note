<script>
import { test } from "@n/data.js";
export default {
  data() {
    return {
      test,
    };
  },
};
</script>

<template>
  <div class="catalogue">
    <a v-for="(item, index) in test" :key="index" :href="'#jump' + index">
      {{ index + 1 + "." }} {{ item.title }}
    </a>
  </div>
</template>

<style scoped>
@import url("@n/note.css");
</style>

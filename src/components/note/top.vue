<script>
import { top, show } from "@n/tool.js";
export default {
  computed: {
    a() {
      show();
    },
  },
  methods: {
    top,
  },
};
</script>

<template>
  <div class="top" @click="top">
    {{ a }}
    <div class="top-in"></div>
  </div>
</template>

<style scoped>
@import url("@n/note.css");
</style>

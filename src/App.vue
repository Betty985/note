<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import note from "@/components/note.vue";
import { $, show } from "@n/tool.js";
// mounted() {
//   $("#loading").style.display = "none";
//   $("#app").style.display = "block";
// },

export default {
  components: { note },
  methods: {
    show,
    $,
  },
};
</script>

<template>
  <div @scroll="show">
    <note></note>
  </div>
</template>

<style></style>

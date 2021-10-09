<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import ScrollView from './components/ScrollView.vue';

const log = console.log;
</script>

<template>
   <ScrollView @scroll="log" @created="() => {}" style="height: 300px; overflow-y: auto">
      <HelloWorld msg="hello" />
      <p v-for="n in 30">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quibusdam accusantium non, recusandae doloremque
         inventore! Quia dolore reiciendis, illum consectetur aliquid praesentium quaerat exercitationem illo voluptates
         magnam saepe facilis totam?
      </p>
   </ScrollView>
</template>

<style>
body {
   margin: 0;
   padding: 0;
}
</style>

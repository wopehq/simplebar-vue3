<script setup lang="ts">
import HelloWorld from './HelloWorld.vue';
import ScrollView from '../src/ScrollView.vue';
import { ref } from 'vue';
import { SimplebarInstanceRef } from '../src/lib.d';

const simplebar = ref<SimplebarInstanceRef>();
const isOpen = ref(true);
const log = console.log;
</script>

<template>
   <ScrollView ref="simplebar" @scroll="log" @created="log" @wheel="log" style="height: 300px; overflow-y: auto">
      <HelloWorld msg="hello" />
      <p v-for="n in 30">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quibusdam accusantium non, recusandae doloremque
         inventore! Quia dolore reiciendis, illum consectetur aliquid praesentium quaerat exercitationem illo voluptates
         magnam saepe facilis totam?
      </p>
   </ScrollView>
   <hr />
   <button @click="isOpen = !isOpen">Toggle</button>
   <KeepAlive>
      <ScrollView
         v-if="isOpen"
         tag="section"
         :ref="log"
         @scroll="log"
         @created="log"
         @wheel="log"
         style="height: 300px; overflow-y: auto"
      >
         <HelloWorld msg="hello" />
         <p v-for="n in 30">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quibusdam accusantium non, recusandae
            doloremque inventore! Quia dolore reiciendis, illum consectetur aliquid praesentium quaerat exercitationem
            illo voluptates magnam saepe facilis totam?
         </p>
      </ScrollView>
   </KeepAlive>
</template>

<style>
body {
   margin: 0;
   padding: 0;
}
</style>

<script setup lang="ts">
import HelloWorld from './HelloWorld.vue';
import { ref } from 'vue';
import { type SimplebarInstanceRef, SimpleBar } from '../src/lib';

const simplebar = ref<SimplebarInstanceRef>();
const isOpen = ref(true);
const log = console.log;
</script>

<template>
   <SimpleBar
      ref="simplebar"
      @scroll="log"
      @created="(instance) => log('Created 1:', instance)"
      @wheel="log"
      style="height: 300px; overflow-y: auto"
   >
      <HelloWorld msg="hello" />
      <p v-for="n in 30">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quibusdam accusantium non, recusandae doloremque
         inventore! Quia dolore reiciendis, illum consectetur aliquid praesentium quaerat exercitationem illo voluptates
         magnam saepe facilis totam?
      </p>
   </SimpleBar>
   <hr />
   <button @click="isOpen = !isOpen">Toggle</button>
   <KeepAlive>
      <SimpleBar
         v-if="isOpen"
         tag="section"
         :ref="log.bind({}, 'Ref: ')"
         @scroll="log"
         @created="(instance) => log('Created 1:', instance)"
         @wheel="log"
         style="height: 300px; overflow-y: auto"
      >
         <HelloWorld msg="hello" />
         <p v-for="n in 30">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quibusdam accusantium non, recusandae
            doloremque inventore! Quia dolore reiciendis, illum consectetur aliquid praesentium quaerat exercitationem
            illo voluptates magnam saepe facilis totam?
         </p>
      </SimpleBar>
   </KeepAlive>
</template>

<style>
body {
   margin: 0;
   padding: 0;
}
</style>

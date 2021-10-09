<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs } from 'vue';
import SimpleBar, { Options } from 'simplebar';
import { removeUndefinedsFromObject } from './helpers';

type TemplateRef = HTMLElement | null;

interface Emits {
   (event: 'created', value: SimpleBar): void;
}
interface Props {
   tag?: string;
   autoHide?: Options['autoHide'];
   classNames?: Options['classNames'];
   clickOnTrack?: Options['clickOnTrack'];
   direction?: Options['direction'];
   forceVisible?: Options['forceVisible'];
   scrollbarMaxSize?: Options['scrollbarMaxSize'];
   scrollbarMinSize?: Options['scrollbarMinSize'];
   timeout?: Options['timeout'];
}
const props = withDefaults(defineProps<Props>(), {
   tag: 'div'
});
const emit = defineEmits<Emits>();

const element = ref<TemplateRef>(null);
const { tag: tagRef, ...options } = toRefs(props);

onMounted(() => {
   if (element.value) {
      const simpleBarOptions = { ...reactive(options) };
      const simplebarFilteredOptions = removeUndefinedsFromObject(simpleBarOptions);
      const simplebar = new SimpleBar(
         element.value as HTMLElement,
         Object.keys(simplebarFilteredOptions).length > 0 ? simplebarFilteredOptions : undefined
      );
      emit('created', simplebar);
   }
});
</script>

<template>
   <div v-bind="$attrs" ref="element">
      <slot />
   </div>
</template>

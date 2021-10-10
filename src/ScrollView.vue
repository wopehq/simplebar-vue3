<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs, onDeactivated, onActivated, Ref } from 'vue';
import SimpleBar, { Options } from 'simplebar';
import { removeUndefinedsFromObject } from './helpers';
import type { SimplebarInstanceRef } from './lib.d';
import { provideSimplebar } from './composables/simplebar';

type TemplateRef = HTMLElement | null;

interface Emits {
   (event: 'created', value: SimpleBar): void;
   (event: 'scroll', value: Event): void;
   (event: 'wheel', value: WheelEvent): void;
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
const simplebarInstance = ref<SimplebarInstanceRef>(null);

const element = ref<TemplateRef>(null);
const { tag: tagRef, ...options } = toRefs(props);

defineExpose(simplebarInstance);
provideSimplebar(simplebarInstance as Ref<SimpleBar>);

function simplebarHookHandler(hook: 'mounted' | 'activated') {
   if (!element.value) return;
   if (hook === 'activated' && simplebarInstance.value) {
      return;
   }

   const simpleBarOptions = { ...reactive(options) };
   const simplebarFilteredOptions = removeUndefinedsFromObject(simpleBarOptions);
   const simplebar = new SimpleBar(
      element.value as HTMLElement,
      Object.keys(simplebarFilteredOptions).length > 0 ? simplebarFilteredOptions : undefined
   );
   //@ts-ignore
   simplebarInstance.value = simplebar;

   const scrollElement = simplebar.getScrollElement();
   scrollElement.addEventListener('scroll', (e) => {
      emit('scroll', e);
   });
   scrollElement.addEventListener('wheel', (e) => {
      emit('wheel', e);
   });
   emit('created', simplebar);
}

onMounted(() => simplebarHookHandler('mounted'));
onActivated(() => simplebarHookHandler('activated'));
onDeactivated(() => {
   simplebarInstance.value = null;
});
</script>

<template>
   <Component :is="tag" ref="element">
      <slot />
   </Component>
</template>

import {
   type PropType,
   onMounted,
   ref,
   onDeactivated,
   onActivated,
   type Ref,
   defineComponent,
   h,
   renderSlot
} from 'vue';
import SimpleBar, { type Options } from 'simplebar';

import { provideSimplebar } from './composables/simplebar';

export type SimplebarInstanceRef = SimpleBar | null;

type TemplateRef = HTMLElement | null;

export interface Props {
   tag: string;
   options: Options;
   onCreated(instance: SimpleBar): void;
   onScroll(event: Event): void;
   onWheel(event: WheelEvent): void;
}

export default defineComponent({
   name: 'SimpleBar',
   props: {
      tag: {
         type: String as PropType<Props['tag']>,
         default: 'div'
      },
      options: {
         type: Object as PropType<Props['options']>,
         default: undefined
      }
   },
   emits: {
      scroll: null as unknown as Props['onScroll'],
      wheel: null as unknown as Props['onWheel'],
      created: null as unknown as Props['onCreated']
   },
   setup(props, { emit, slots, expose }) {
      const simplebarInstance = ref<SimplebarInstanceRef>(null);
      const element = ref<TemplateRef>(null);

      expose(simplebarInstance);
      provideSimplebar(simplebarInstance as Ref<SimpleBar>);

      const simplebarHookHandler = (hook: 'mounted' | 'activated') => {
         if (!element.value) return;
         if (hook === 'activated' && simplebarInstance.value) {
            return;
         }

         const simplebar = new SimpleBar(element.value as HTMLElement, props.options);
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
      };

      onMounted(() => simplebarHookHandler('mounted'));
      onActivated(() => simplebarHookHandler('activated'));
      onDeactivated(() => {
         simplebarInstance.value = null;
      });

      return () =>
         h(
            props.tag,
            {
               ref: element
            },
            renderSlot(slots, 'default', { instance: simplebarInstance.value })
         );
   }
});

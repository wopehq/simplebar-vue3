import { InjectionKey, Ref, inject, provide } from 'vue';

import type SimpleBar from 'simplebar';

const injectionKey: InjectionKey<Ref<SimpleBar>> = Symbol('simplebar');

export function provideSimplebar(param: Ref<SimpleBar>) {
   provide(injectionKey, param);
}

export function useSimplebar() {
   return inject(injectionKey)!;
}

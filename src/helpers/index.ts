/**
 * Filters attributes by given state.
 */
export function filterAttrs(attrs: Record<string, any>, which: 'props' | 'events') {
   return Object.keys(attrs).reduce((acc, key) => {
      const isOn = key.startsWith('on');
      if ((which === 'events' && !isOn) || (which === 'props' && isOn)) {
         return acc;
      }

      return {
         ...acc,
         [key]: attrs[key]
      };
   }, {});
}

export function removeUndefinedsFromObject<T extends object>(object: T): Partial<T> {
   return Object.keys(object).reduce((acc, key) => {
      const targetValue = object[key as keyof typeof object];
      return targetValue ? { ...acc, [key]: targetValue } : acc;
   }, {});
}

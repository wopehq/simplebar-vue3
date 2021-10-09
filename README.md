### A Vue3 Wrapper for SimpleBar

Currently work in progress. Works but not finished yet. You can find the documentation below.

### Intallation

For npm and pnpm:

```
(npm or pnpm) install simplebar simplebar-vue3
```

For yarn:

```
yarn add simplebar simplebar-vue3
```

### Usage

You need to import simplebar stylesheet in your `main.(js|ts)` file for scrollbar to look normal and work. <br>

##### main.js

```ts
import 'simplebar/dist/simplebar.min.css';
```

To use it in `.vue` files just import the component and use.

```html
<template>
   <SimpleBar style="height: 500px; overflow-y: auto"> ... Content Goes here </SimpleBar>
</template>

<script setup>
   import { SimpleBar } from 'simplebar-vue3';
</script>
<!-- FOR NORMAL SCRIPT -->
<script>
   import { SimpleBar } from 'simplebar-vue3';
   import { defineComponent } from 'vue';

   export default defineComponent({
      components: { SimpleBar }
   });
</script>
```

### Options

You can give these options to the component as props.

```ts
import { Options } from 'simplebar';

interface SimpleBarProps {
   tag?: string; //default 'div'

   // Simplebar Options as prop
   autoHide?: Options['autoHide'];
   classNames?: Options['classNames'];
   clickOnTrack?: Options['clickOnTrack'];
   direction?: Options['direction'];
   forceVisible?: Options['forceVisible'];
   scrollbarMaxSize?: Options['scrollbarMaxSize'];
   scrollbarMinSize?: Options['scrollbarMinSize'];
   timeout?: Options['timeout'];
}
```

### TypeScript Support

This package has built-in typescript support for events and props it should work with `.tsx` files with no trouble.

To have types support in vue files we recommend you to use `Volar` plugin. <br>
[Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) <br>
[TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)

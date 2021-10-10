import _SimpleBar, { Options } from 'simplebar';
import { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue';

export declare const SimpleBar: {
   new (): {
      $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & SimpleBarProps;
   };
};

export declare interface SimpleBarProps {
   tag?: string;
   autoHide?: Options['autoHide'];
   classNames?: Options['classNames'];
   clickOnTrack?: Options['clickOnTrack'];
   direction?: Options['direction'];
   forceVisible?: Options['forceVisible'];
   scrollbarMaxSize?: Options['scrollbarMaxSize'];
   scrollbarMinSize?: Options['scrollbarMinSize'];
   timeout?: Options['timeout'];
   onCreated: (value: _SimpleBar) => void;
   onScroll: (event: Event) => void;
   onWheel: (event: WheelEvent) => void;
}

export declare type SimplebarInstanceRef = _SimpleBar | null;
export declare function useSimplebar(): _SimpleBar;

import { onDestroy } from 'svelte';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ShelfStore, Subscribe } from '@/index';
// import type { ShelfStore, Subscribe } from 'lenshelf';

export function connectShelfWithSvelte<T>(subscribe: Subscribe<T>) {
  return <V>(callback: (store: ShelfStore<T>) => ShelfStore<V>) => {
    const abortController = new AbortController();
    let signalValue!: Writable<V>;
    let shelf!: ShelfStore<V>;
    let changing = false;
    const change = (cb: () => void) => {
      changing = true;
      cb();
      changing = false;
    };

    onDestroy(() => {
      abortController.abort();
    });

    subscribe(shelfStore => {
      shelf = callback(shelfStore);

      if (!changing) {
        if (signalValue) {
          signalValue.set(shelf.value as V);
        } else {
          signalValue = writable(shelf.value as V);
        }
      }

      return abortController.signal;
    });

    signalValue.subscribe(newValue => {
      if (shelf.value !== newValue && !changing) {
        change(() => {
          console.log('b');
          shelf.value = newValue;
        });
      }
    });

    return signalValue;
  };
}

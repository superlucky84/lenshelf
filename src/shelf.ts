import { lens } from '@/lens';
import type { Lens } from '@/lens';
import type { StoreType } from '@/types';

export class Shelf<V, S extends StoreType<V>> {
  protected v: V;
  private depth: string[];
  private lensValue: Lens<S, S>;
  private rootValue: S;

  constructor(
    propertyValue: V,
    depthList: string[],
    lensValue: Lens<S, S> = lens<S>(),
    rootValue: S
  ) {
    this.v = propertyValue;
    this.depth = depthList;
    this.lensValue = lensValue;
    this.rootValue = rootValue;
  }

  get value() {
    return this.v;
  }

  set value(newValue: V) {
    const prop = this.depth.at(-1);

    if ((newValue as S[keyof S]) !== this.lensValue.get()(this.rootValue)) {
      const newTree = this.lensValue
        .k(prop as keyof S)
        .set(newValue as S[keyof S])(this.rootValue);

      this.rootValue.root = newTree.root;
    }
  }
}

export class ShelfPrimitive<V> {
  protected v: V;

  constructor(propertyValue: V) {
    this.v = propertyValue;
  }

  get value() {
    return this.v;
  }
  set value(newValue: V) {
    this.v = newValue;
  }
}

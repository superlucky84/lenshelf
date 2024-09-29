/**
 * S StoreType<V>; // 처음 제공받는 값 타입 V에 root를 달음
 * G ShelfStore<V>; // 끝에 root가 안달린 상태 끝에 value를 달음
 * T ShelfStore<StoreType<V>>; // 끝에 root가 달린 상태 끝에 value를 달음
 */
export type Renew<G> = (
  store: G,
  isFirst: boolean
) => boolean | AbortSignal | void;
export type Run = null | ((isFirst?: boolean) => boolean | AbortSignal | void);
export type StoreType<V> = { root: V };
export type WithRoot = { root: unknown } & { [key: string | symbol]: unknown };
export type ShelfStore<S> = S extends object
  ? {
      [K in keyof S]: ShelfStore<S[K]> & { value: S[K] };
    } & {
      value: { [K in keyof S]: ShelfStore<S[K]> } & { value: S };
    }
  : { value: S };

export type Subscribe<V> = (
  renew: Renew<ShelfStore<V>>,
  userOption?: { cache?: boolean }
) => ShelfStore<V>;

export type PrivitiveType =
  | string
  | number
  | symbol
  | null
  | undefined
  | boolean
  | bigint;

export type RunInfo<A> = {
  value: A;
  getNextValue: () => A;
  key: string;
  primitiveSetter?: (newValue: A) => void;
};

export type RenderListSub<A> = Map<string, RunInfo<A>>;

export type StoreRenderList<A> = Map<Run, RenderListSub<A>>;

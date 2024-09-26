import type { Run, RunInfo, StoreRenderList } from '@/types';

export function collector<V>(
  value: V,
  getNextValue: () => V,
  newDepthList: string[],
  run: Run,
  storeRenderList: StoreRenderList<V>
) {
  const runInfo: RunInfo<typeof value> = {
    value,
    getNextValue,
    key: newDepthList.join('.'),
  };
  console.log('COLECT', runInfo);

  if (run) {
    if (storeRenderList.has(run)) {
      const subList = storeRenderList.get(run);
      if (!subList!.has(runInfo.key)) {
        subList!.set(runInfo.key, runInfo);
      }
    } else {
      const subList = new Map<string, typeof runInfo>();
      subList.set(runInfo.key, runInfo);
      storeRenderList.set(run, subList);
    }
  }
}

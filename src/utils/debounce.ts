// 防抖（立即执行再判定）
export type TOptions = {
  timeout?: number;
  immediate?: boolean;
};

export const QSMYDebounce = (fn: (...args: any[]) => void, options: TOptions) => {
  let timer: any = null;
  let immediate = options.immediate ?? true;

  return (...args: any[]) => {
    if (immediate) {
      fn(args);
      immediate = false;

      timer = setTimeout(() => {
        immediate = true;
      }, options.timeout ?? 600);
    } else {
      clearTimeout(timer);

      timer = setTimeout(() => {
        immediate = true;
        fn(args);
      }, options.timeout ?? 600);
    }
  };
};

// 用于sleep一段指定时间，再响应data数据给js

export const QSMYSleep = (res?: { timeout: number; data?: any }) => {
  const timer: any = {
    current: null,
  };

  return new Promise((resolve) => {
    timer.current = setTimeout(() => {
      clearTimeout(timer.current);
      timer.current = null;
      resolve(res?.data ?? 'over!');
    }, res?.timeout ?? 1000);
  });
};

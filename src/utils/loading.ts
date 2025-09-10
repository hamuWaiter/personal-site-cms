import { ElLoading, LoadingInstance } from 'element-plus';
import { QSMYSleep } from './sleep';

class Loading {
  private instance: LoadingInstance | null = null;  // 初始化为null

  constructor() {}

  open(res?: { text?: string; fullscreen?: boolean }) {
    this.instance = ElLoading.service({
      lock: true,
      text: res?.text ?? 'Loading',
      fullscreen: res?.fullscreen ?? true,
      // background: 'rgba(0, 0, 0, 0.7)',
    });
  }

  async close() {
    await QSMYSleep({ timeout: 200 }); // 延时300ms再关闭
    this.instance?.close?.();
    this.instance = null;  // 重置为null
  }
}

export const QSMYLoading = new Loading();
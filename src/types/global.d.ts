declare global {
  interface Window {
    ym: (
      id: number,
      action: string,
      url?: string,
      params?: Record<string, any>
    ) => void;
  }
}

export {};
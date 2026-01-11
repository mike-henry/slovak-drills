/// <reference types="vite/client" />

interface ImportMeta {
  /**
   * Vite-specific glob import
   * Example: import.meta.glob('./*.md', { as: 'raw' })
   */
  glob(pattern: string, options?: Record<string, any>): Record<string, () => Promise<any>>;
}

declare const SOLIDTV_DOM_RENDERING: boolean | undefined;
declare const SOLIDTV_DISABLE_SHADERS: boolean | undefined;

export const isDev = !!(import.meta.env && import.meta.env.DEV);

/** Whether the DOM renderer is used instead of `@solidtv/renderer` */
export const DOM_RENDERING =
  typeof SOLIDTV_DOM_RENDERING !== 'undefined' &&
  SOLIDTV_DOM_RENDERING === true;

/** Whether element shaders are enabled */
export const SHADERS_ENABLED =
  typeof SOLIDTV_DISABLE_SHADERS === 'undefined' ||
  SOLIDTV_DISABLE_SHADERS !== true;

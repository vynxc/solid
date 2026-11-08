import * as lngr from '@solidtv/renderer';
import * as lngr_shaders from '@solidtv/renderer/webgl/shaders';

import type {
  HolePunchProps as ShaderHolePunchProps,
  LinearGradientProps as ShaderLinearGradientProps,
  RadialGradientProps as ShaderRadialGradientProps,
  RoundedProps as ShaderRoundedProps,
  ShadowProps as ShaderShadowProps,
} from '@solidtv/renderer';
import { type WebGlShaderType as WebGlShader } from '@solidtv/renderer';
export {
  ShaderHolePunchProps,
  ShaderLinearGradientProps,
  ShaderRadialGradientProps,
  ShaderRoundedProps,
  ShaderShadowProps,
};
export { WebGlShader };

import { SHADERS_ENABLED, isDomRendererActive } from './config.js';
import type { CoreShaderManager } from './intrinsicTypes.js';
import { IRendererShaderManager } from './dom-renderer/domRendererTypes.js';

export type Vec4 = [x: number, y: number, z: number, w: number];

export interface ShaderBorderProps extends lngr.BorderProps {
  /** Distance between the border and element edges. */
  gap: number;
  /**
   * If `false`, the border is drawn outside the element. \
   * If `true`, the border is drawn inside the element.
   * @default true
   */
  inset: boolean;
}

export type ShaderBorderPrefixedProps = {
  [P in keyof ShaderBorderProps as `border-${P}`]: ShaderBorderProps[P];
};
export type ShaderShadowPrefixedProps = {
  [P in keyof ShaderShadowProps as `shadow-${P}`]: ShaderShadowProps[P];
};

export type ShaderRoundedWithShadowProps = ShaderRoundedProps &
  ShaderShadowPrefixedProps;
export type ShaderRoundedWithBorderProps = ShaderRoundedProps &
  ShaderBorderPrefixedProps;
export type ShaderRoundedWithBorderAndShadowProps = ShaderRoundedProps &
  ShaderShadowPrefixedProps &
  ShaderBorderPrefixedProps;

export type ShaderRounded = WebGlShader<ShaderRoundedProps>;
export type ShaderShadow = WebGlShader<ShaderShadowProps>;
export type ShaderRoundedWithBorder = WebGlShader<ShaderRoundedWithBorderProps>;
export type ShaderRoundedWithShadow = WebGlShader<ShaderRoundedWithShadowProps>;
export type ShaderRoundedWithBorderAndShadow =
  WebGlShader<ShaderRoundedWithBorderAndShadowProps>;
export type ShaderHolePunch = WebGlShader<ShaderHolePunchProps>;
export type ShaderRadialGradient = WebGlShader<ShaderRadialGradientProps>;
export type ShaderLinearGradient = WebGlShader<ShaderLinearGradientProps>;

export const defaultShaderRounded: ShaderRounded = lngr_shaders.Rounded;
export const defaultShaderShadow: ShaderShadow = lngr_shaders.Shadow;
export const defaultShaderRoundedWithShadow: ShaderRoundedWithShadow =
  lngr_shaders.RoundedWithShadow;
// TODO: lngr_shaders.RoundedWithBorderAndShadow doesn't support border-gap
export const defaultShaderRoundedWithBorderAndShadow =
  lngr_shaders.RoundedWithBorderAndShadow as ShaderRoundedWithBorderAndShadow;
export const defaultShaderHolePunch: ShaderHolePunch = lngr_shaders.HolePunch;
export const defaultShaderRadialGradient: ShaderRadialGradient =
  lngr_shaders.RadialGradient;
export const defaultShaderLinearGradient: ShaderLinearGradient =
  lngr_shaders.LinearGradient;

export const defaultShaderRoundedWithBorder =
  lngr_shaders.RoundedWithBorder as ShaderRoundedWithBorder;

export function registerDefaultShaderRounded(
  shManager: IRendererShaderManager,
) {
  if (SHADERS_ENABLED && !isDomRendererActive())
    shManager.registerShaderType('rounded', defaultShaderRounded);
}
export function registerDefaultShaderShadow(shManager: CoreShaderManager) {
  if (SHADERS_ENABLED && !isDomRendererActive())
    shManager.registerShaderType('shadow', defaultShaderShadow);
}
export function registerDefaultShaderRoundedWithBorder(
  shManager: CoreShaderManager,
) {
  if (SHADERS_ENABLED && !isDomRendererActive())
    shManager.registerShaderType(
      'roundedWithBorder',
      defaultShaderRoundedWithBorder,
    );
}
export function registerDefaultShaderRoundedWithShadow(
  shManager: CoreShaderManager,
) {
  if (SHADERS_ENABLED && !isDomRendererActive())
    shManager.registerShaderType(
      'roundedWithShadow',
      defaultShaderRoundedWithShadow,
    );
}
export function registerDefaultShaderRoundedWithBorderAndShadow(
  shManager: CoreShaderManager,
) {
  if (SHADERS_ENABLED && !isDomRendererActive())
    shManager.registerShaderType(
      'roundedWithBorderWithShadow',
      defaultShaderRoundedWithBorderAndShadow,
    );
}
export function registerDefaultShaderHolePunch(shManager: CoreShaderManager) {
  if (SHADERS_ENABLED && !isDomRendererActive())
    shManager.registerShaderType('holePunch', defaultShaderHolePunch);
}
export function registerDefaultShaderRadialGradient(
  shManager: CoreShaderManager,
) {
  if (SHADERS_ENABLED && !isDomRendererActive())
    shManager.registerShaderType('radialGradient', defaultShaderRadialGradient);
}
export function registerDefaultShaderLinearGradient(
  shManager: CoreShaderManager,
) {
  if (SHADERS_ENABLED && !isDomRendererActive())
    shManager.registerShaderType('linearGradient', defaultShaderLinearGradient);
}

export function registerDefaultShaders(shManager: CoreShaderManager) {
  if (SHADERS_ENABLED && !isDomRendererActive()) {
    registerDefaultShaderRounded(shManager);
    registerDefaultShaderShadow(shManager);
    registerDefaultShaderRoundedWithBorder(shManager);
    registerDefaultShaderRoundedWithShadow(shManager);
    registerDefaultShaderRoundedWithBorderAndShadow(shManager);
    registerDefaultShaderHolePunch(shManager);
    registerDefaultShaderRadialGradient(shManager);
    registerDefaultShaderLinearGradient(shManager);
  }
}

import * as v from 'vitest';
import { ElementNode } from '@solidtv/solid';
import { setActiveElementCore } from '../src/core/focusManager.js';
import { mount } from './contract-focus-helpers.js';

v.test(
  'non-callable host focus slots do not interrupt focus and blur propagation',
  async () => {
    let a!: ElementNode;
    let b!: ElementNode;
    const onFocus = v.vi.fn();
    const onBlur = v.vi.fn();
    const onFocusChanged = v.vi.fn();
    const { dispose } = await mount(() => (
      <view onFocus={onFocus} onBlur={onBlur} onFocusChanged={onFocusChanged}>
        <view ref={a} />
        <view ref={b} />
      </view>
    ));
    a.onFocus = true as never;
    a.onFocusChanged = {} as never;
    a.onBlur = 1 as never;
    b.onFocus = false as never;
    b.onFocusChanged = 'pending' as never;
    b.onBlur = {} as never;
    v.expect(() => {
      setActiveElementCore(a);
      setActiveElementCore(b);
      setActiveElementCore(a);
    }).not.toThrow();
    v.expect(onFocus).toHaveBeenCalledTimes(1);
    v.expect(onFocusChanged).toHaveBeenCalledWith(true, a, undefined, a.parent);
    dispose();
  },
);

v.test('focus can traverse a host root without framework states', async () => {
  let a!: ElementNode;
  let b!: ElementNode;
  const { dispose } = await mount(() => (
    <view>
      <view ref={a} />
      <view ref={b} />
    </view>
  ));
  const parent = a.parent;
  const host = {
    lng: parent!.lng,
    onFocus: true,
    onFocusChanged: 'pending',
  } as unknown as ElementNode;
  a.parent = host;
  v.expect(() => {
    setActiveElementCore(a);
    setActiveElementCore(b);
  }).not.toThrow();
  a.parent = parent;
  dispose();
});

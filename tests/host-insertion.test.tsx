import * as v from 'vitest';
import { ElementNode, TextNode } from '@solidtv/solid';
import { renderer } from './setup.js';

v.test(
  'direct late insertion renders descendants before an anchor and reuses them on reorder',
  () => {
    let parent!: ElementNode;
    let anchor!: ElementNode;
    const dispose = renderer.render(() => (
      <view ref={parent}>
        <view ref={anchor} />
      </view>
    ));
    const child = new ElementNode('view');
    const text = new ElementNode('text');
    text.insertChild(new TextNode('late child'));
    child.insertChild(text);
    const onRender = v.vi.fn();
    child.onRender = onRender;

    parent.insertChild(child, anchor);
    v.expect(child.rendered).toBe(true);
    v.expect(text.rendered).toBe(true);
    v.expect(child.lng.parent).toBe(parent.lng);
    v.expect(parent.children).toEqual([child, anchor]);
    v.expect(onRender).toHaveBeenCalledTimes(1);
    const native = child.lng;

    parent.insertChild(child);
    v.expect(parent.children).toEqual([anchor, child]);
    v.expect(child.lng).toBe(native);
    v.expect(onRender).toHaveBeenCalledTimes(2);
    dispose();
  },
);

v.test('universal insertion calls onRender once', () => {
  const onRender = v.vi.fn();
  const dispose = renderer.render(() => (
    <view>
      <view onRender={onRender} />
    </view>
  ));
  v.expect(onRender).toHaveBeenCalledTimes(1);
  dispose();
});

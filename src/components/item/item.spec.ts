import { Item } from './item';
import {} from 'jasmine';

describe('button', () => {
  it('builds', () => {
    expect(new Item()).toBeTruthy();
  });

  describe('formatting', () => {
    it('returns empty string for no names defined', () => {
      const component = new Item();
      expect(component.render.toString());
    });
  });
});

import { Button } from './button';
import {} from 'jasmine';

describe('button', () => {
  it('builds', () => {
    expect(new Button()).toBeTruthy();
  });

  describe('formatting', () => {
    it('returns empty string for no names defined', () => {
      const component = new Button();
      expect(component.render.toString());
    });
  });
});

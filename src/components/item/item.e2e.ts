import { newE2EPage } from '@stencil/core/testing';
import {} from 'jasmine';

describe('item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<folia-item></folia-item>');
    const element = await page.find('item');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<folia-item></folia-item>');
    const component = await page.find('item');
    const element = await page.find('item >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});

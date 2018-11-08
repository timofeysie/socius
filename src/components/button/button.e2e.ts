import { newE2EPage } from '@stencil/core/testing';
import {} from 'jasmine';

describe('button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<button></button>');
    const element = await page.find('button');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<button></button>');
    const component = await page.find('button');
    const element = await page.find('button >>> div');
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

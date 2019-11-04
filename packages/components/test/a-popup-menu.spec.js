const assert = require('assert');

describe('a-popup-menu', () => {
    describe('initial state', () => {
        let menu;
        beforeEach(async () => {
            component = await showroom.setTestSubject('a-popup-menu');
            menu = await showroom.find('a-menu');
            await showroom.clearEventList();
        });

        it('Should show label correctly', async () => {
            await showroom.setProperty('label', 'Expected label');
            const labelEl = await showroom.find('// span#label');
            assert.strictEqual(await showroom.getTextContent(labelEl), 'Expected label');
        });

        it('Menu items should not be visible', async () => {
            assert.strictEqual(await showroom.isVisible(menu), false);
        });

        it('Should show menu items on mousedown', async () => {
            const labelEl = await showroom.find('// span#label');
            await labelEl.hover();
            await showroom.page.mouse.down();
            assert.strictEqual(await showroom.isVisible(menu), true);
        });

        it('Should select an item', async () => {
            let events;
            const labelEl = await showroom.find('// span#label');
            await labelEl.hover();
            await showroom.page.mouse.down();
            const menuItems = await menu.$$('a-menu-item');
            await menuItems[1].click();
            await menuItems[2].click();
            events = await showroom.getEventList();
            assert.strictEqual(events.length, 1);
            assert.strictEqual(events[0].detail, 'Option 2');
            assert.strictEqual(events.length, 1);
            assert.strictEqual(events[0].detail, 'Option 2');
            await labelEl.hover();
            await showroom.page.mouse.down();
            await menuItems[3].click();
            events = await showroom.getEventList();
            assert.strictEqual(events.length, 2);
            assert.strictEqual(events[1].detail, 'Another option');
        });
    });
});
export default {
    component: 'a-popup-menu',
    properties: {
        label: 'Hello'
    },
    events: ['selected'],
    innerHTML: /*html*/`
    <span slot="trigger">Open Menu ⬇️</span>
    <a-menu id="menu">
        <a-menu-item>Option 1</a-menu-item>
        <a-menu-item disabled>Disabled option</a-menu-item>
        <a-menu-item>Option 2</a-menu-item>
        <a-menu-item>Another option</a-menu-item>
        <a-menu-item>Yet another one</a-menu-item>
        <a-menu-item>Quit</a-menu-item>
    </a-menu>
    `
}
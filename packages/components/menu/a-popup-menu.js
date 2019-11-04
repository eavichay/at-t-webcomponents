class PopupMenu extends HTMLElement {
    constructor () {
        super();
        this
            .attachShadow({mode: 'open'})
            .innerHTML = /*html*/`
                <style>
                    :host {
                        user-select: none;
                        position: relative;
                    }
                    :host #wrapper {
                        display: none;
                    }
                    :host([open]) #wrapper {
                        display: inline-block;
                    }
                    :host([open]) #wrapper {
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                </style>
                <span id="trigger">
                    <slot name="trigger"></slot>
                </span>
                <span id="wrapper">
                    <slot></slot>
                </span>`;

        /** @type HTMLSpanElement */
        this.wrapper = this.shadowRoot.querySelector('#wrapper');

        /** @type HTMLSpanElement */
        this.trigger = this.shadowRoot.querySelector('#trigger');

        this.onWindowClick = this.onWindowClick.bind(this);
        this.trigger.addEventListener('mousedown', () => this.open());
        this.addEventListener('selected', () => this.close());
    }

    close () {
        this.removeAttribute('open');
    }

    open () {
        this.setAttribute('open', '');
        const menu = this.querySelector('a-menu');
        if (menu) {
            menu.focus();
        }
    }

    /**
     * @param {MouseEvent} event
     */
    onWindowClick (event) {
        if (event.composedPath().indexOf(this) >= 0) {
            return;
        }
        this.close();
    }

    connectedCallback () {
        window.addEventListener('mousedown', this.onWindowClick);
    }

    disconnectedCallback () {
        window.removeEventListener('mousedown', this.onWindowClick);
    }
}

customElements.define('a-popup-menu', PopupMenu);
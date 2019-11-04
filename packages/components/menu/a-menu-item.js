const template = /*html*/ `
  <style>
    :host([disabled]) {
      opacity: 0.6;
    }
    :host {
      user-select: none;
      font-family: "Open Sans", sans-serif;
      font-size: 13px;
      color: var(--black, #434343);
      padding: 5px 15px 5px 5px;
      border-bottom: 1px dotted var(--grey-lines) grey;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    :host(:last-of-type) {
      border-bottom: none;
    }
    :host(:hover:not([disabled])), :host([focused]) {
      cursor: pointer;
      color: var(--black, black);
      background-color: var(--selection-highlight, #ccf0ea);
    }
  </style>
  <slot></slot>
`;

class MenuItem extends HTMLElement {
  /**
   * @extends FocusableMixin(HTMLElement)
   */
  constructor() {
    super();

    /**
     * @type {*}
     */
    this.value = undefined;
    this.attachShadow({ mode: 'open' }).innerHTML = template;

    this.addEventListener('keydown', e => this.keypressHandler(e));
    this.addEventListener('mouseup', e => this.notifySelected(e));
  }

  connectedCallback () {
      if (!this.hasAttribute('tabindex')) {
          this.setAttribute('tabindex', -1);
      }
  }

  /**
   *
   * @param {boolean} value
   */
  set disabled(value) {
    if (!!value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * @return {boolean}
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * @param {KeyboardEvent|MouseEvent} e
   */
  keypressHandler(e) {
    if (!this.disabled) {
      const { key } = e;
      if (
        e.type === 'click' ||
        (key && (key.toString() === 'Enter' || key.toString() === ' '))
      ) {
        this.notifySelected();
      }
    }
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @see FocusableElement
   */
  onFocusIn() {
    super.onFocusIn();
  }

  notifySelected() {
    if (!this.disabled) {
      this.dispatchEvent(
        new CustomEvent('selected', {
          bubbles: true,
          composed: true,
          detail: this.value || this,
        })
      );
    }
  }
}

customElements.define('a-menu-item', MenuItem);
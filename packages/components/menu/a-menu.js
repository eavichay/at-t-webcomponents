const template = /*html*/ `
  <style>
    :host {
      display: inline-flex;
      flex-direction: column;
      border: none !important;
      background: var(--popover-background, white);
      box-shadow: var(--popover-shadow, 1px 0 2px 2px rgba(0,0,0,0.3));
      overflow: auto;
    }
    :host(:focus) {
        outline: none;
    }
    
    ::slotted(:focus) {
        outline: none;
    }

    ::slotted(ens-menu-item) {
      max-width: 500px;
    }

    slot#content {
      max-height: 500px;
      overflow-y: auto;
      display: inline-flex;
      width: 100%;
      flex-direction: column;
    }
    .horizontal-layout{
      flex-direction: row !important;
    }
    
  </style>
  <slot id="content"></slot>
`;

/**
 * @extends HTMLElement
 */
class Menu extends HTMLElement {

  /**
   * @extends HTMLElement
   */
  constructor () {
    super();
    this
      .attachShadow({ mode: 'open' })
      .innerHTML = template;
    this.addEventListener('keydown', e => this.onKeyPress(e));
    this.addEventListener('focusin', this.onFocusIn.bind(this));
  }

  static get observedAttributes() {
    return ['horizontal'];
  }


  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'horizontal') {
      this.horizontal = newValue;
    }
  }

  connectedCallback () {
    if (!this.hasAttribute('tabindex')) {
        this.setAttribute('tabindex', -1);
    }
  }

  get horizontal() {
    const classList = this.shadowRoot.querySelector('slot[id=content]').classList;
    return classList.contains('ens-menu slot#content.horizontal-layout');
  }

  set horizontal(value) {
    const classList = this.shadowRoot.querySelector('slot[id=content]').classList;
    classList.remove('horizontal-layout');
    if (value != null){
      classList.add('horizontal-layout');
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  onKeyPress (e) {
    switch (e.key) {
      case 'ArrowDown':
        this.selectNext();
        break;
      case 'ArrowUp':
        this.selectPrev();
        break;
    }
  }

  getFocusedItem () {
    return this.querySelector('[focused]');
  }

  setFocusedItem(idx) {
    Array.from(this.children).forEach(child => child.removeAttribute('focused'));
    this.getValidElements().forEach((item, i) => {
      if (idx === i) {
        item.setAttribute('focused', '');
        item.focus();
      } else {
        item.removeAttribute('focused');
      }
    });
  }

  onFocusIn() {
    void 0;
  }

  focus() {
      this.selectFirst();
  }

  getValidElements () {
    return Array.from(this.querySelectorAll(':not([hidden])'));
  }

  selectFirst() {
    this.setFocusedItem(0);
    this.getFocusedItem().focus();
  }

  selectLast () {
    this.setFocusedItem(this.getValidElements().length);
  }

  selectNext () {
    const allElements = this.getValidElements();
    const focusedElement = this.getFocusedItem() || allElements[allElements.length - 1];
    const curIdx = allElements.indexOf(focusedElement);
    this.setFocusedItem((curIdx + 1) % allElements.length);
  }

  selectPrev () {
    const allElements = this.getValidElements();
    const focusedElement = this.getFocusedItem() || allElements[0];
    const curIdx = allElements.indexOf(focusedElement);
    if (curIdx > 0) {
      this.setFocusedItem(curIdx - 1);
    } else {
      this.setFocusedItem(allElements.length - 1);
    }
  }

  unselect () {
    this.setFocusedItem(-1);
  }
}

customElements.define('a-menu', Menu);
import {BaseComponent} from './base-component.js';

export class HeaderComponent extends BaseComponent {

  constructor() {
    super();

    this.shadow.innerHTML = `
      <style>
      :host {
        display: flex;
        width: calc(100% - 16px);
        padding: 8px;
        flex-shrink: 0;
        color: #fff;
        background: #6a8caf;
        font-size: 1.3em;
      }
      .icon {
          width: 32px;
          height: 32px;
          margin-right: 16px;
          color: #fff;
      }
      </style>
      <object class="icon" data="assets/tv.svg" type="image/svg+xml"></object>
      <div class="header">Teleklinik Sound</div>
    `;
  }
}

window.customElements.define('sound-header', HeaderComponent);

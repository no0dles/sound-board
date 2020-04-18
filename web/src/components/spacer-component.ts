import {BaseComponent} from './base-component';

export class SpacerComponent extends BaseComponent {

  constructor() {
    super();

    this.shadow.innerHTML = `
      <style>
      :host {
        flex-grow: 1;
      }
      </style>
    `;
  }
}

window.customElements.define('sound-spacer', SpacerComponent);

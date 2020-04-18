import {BaseComponent} from './base-component';
import style from './settings-field-component.css'
//import html from './settings-field-component.html'

export class SettingsFieldComponent extends BaseComponent {
  private key: string;

  constructor() {
    super();

    console.log(style);
    this.shadow.innerHTML = `
      <style>
      :host {
        width: calc(50% - 16px);
        display: flex;
        flex-direction: column;
        margin: 0 8px;
      }
      input {
        border: 1px solid #cecece;
        border-radius: 3px;
        padding: 8px;
        outline: none;
      }
      </style>
      <label></label>
      <input type="text" />
    `;
  }

  setKey(value: string) {
    this.key = value;
    const label = this.shadow.querySelector('label');
    label.innerHTML = value;
  }

  getKey() {
    return this.key;
  }

  getValue() {
    const input = this.shadow.querySelector('input');
    return input.value;
  }

  setName(value: string) {
    const input = this.shadow.querySelector('input');
    input.value = value;
  }
}

window.customElements.define('sound-settings-field', SettingsFieldComponent);

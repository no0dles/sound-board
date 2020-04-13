import {BaseComponent} from './base-component.js';

export class SoundInputComponent extends BaseComponent {
  key: string;
  private name: string;
  private enabled: boolean;

  constructor() {
    super();

    this.shadow.innerHTML = `
      <style>
      :host {
        display: flex;
        background: #84c589;
        color: #fff;
        align-items: center;
        width: calc(50% - 32px);
        padding: 8px;
        margin: 8px;
        border-radius: 4px;
      }
      :host(.enabled) {
        background: #2b580c;
        color: #fff;
      }
      .icon {
          width: 32px;
          height: 32px;
          color: #adb5bd;
          margin-right: 16px;
      }
      </style>
      <svg class="icon" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="music" role="img"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-music fa-w-16 fa-9x">
          <path fill="#fff"
                d="M481.44 0a29.38 29.38 0 0 0-9.25 1.5l-290.78 96C168.72 101.72 160 114 160 128v244.75C143 360 120.69 352 96 352c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V256l288-96v148.75C463 296 440.69 288 416 288c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V32c0-18.25-14.31-32-30.56-32zM96 480c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm320-64c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm64-289.72l-288 96V128h-.56v-.12L480 32.62z"
                class=""></path>
      </svg>
      <div class="input">${this.name}</div>
    `;
  }

  setEnabled(value: boolean) {
    this.enabled = value;
    if (this.enabled) {
      this.classList.add('enabled');
    } else {
      this.classList.remove('enabled');
    }
  }

  setName(value: string) {
    this.name = value;
    this.shadow.querySelector('.input').innerHTML = this.name;
  }
}

window.customElements.define('sound-input', SoundInputComponent);

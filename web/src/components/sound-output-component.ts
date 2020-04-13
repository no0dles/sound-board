import {BaseComponent} from './base-component.js';

export class SoundOutputComponent extends BaseComponent {
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
        color: #333;
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
      <svg class="icon" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="speakers" role="img"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-speakers fa-w-20 fa-9x">
          <path fill="#fff"
                d="M592 0H304a48 48 0 0 0-48 48v416a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm16 464a16 16 0 0 1-16 16H304a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h288a16 16 0 0 1 16 16zM448 224a112 112 0 1 0 112 112 112 112 0 0 0-112-112zm0 192a80 80 0 1 1 80-80 80.09 80.09 0 0 1-80 80zm0-112a32 32 0 1 0 32 32 32 32 0 0 0-32-32zm0-112a64 64 0 1 0-64-64 64 64 0 0 0 64 64zm0-96a32 32 0 1 1-32 32 32 32 0 0 1 32-32zM224 229.2c-10.2-3.06-20.8-5.2-32-5.2a112 112 0 0 0 0 224c11.2 0 21.8-2.14 32-5.2v-33.58a80 80 0 1 1 0-146.44zM160 336a32 32 0 1 0 32-32 32 32 0 0 0-32 32zM240.41 0H48A48 48 0 0 0 0 48v416a48 48 0 0 0 48 48h192.41a79.15 79.15 0 0 1-14.79-32H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h177.62a79.15 79.15 0 0 1 14.79-32zM224 128a32 32 0 1 1-32-32 32 32 0 0 1 32 32V72.88A63.33 63.33 0 0 0 192 64a64 64 0 0 0 0 128 63.33 63.33 0 0 0 32-8.88z"
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

window.customElements.define('sound-output', SoundOutputComponent);

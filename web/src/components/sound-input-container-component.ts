import {Socket, SocketMessage} from '../websocket.js';
import {SoundInputComponent} from './sound-input-component.js';
import {BaseComponent} from './base-component.js';

export class SoundInputContainerComponent extends BaseComponent {
  private socket: Socket | null;
  private listener: (message: SocketMessage) => void | null;

  constructor() {
    super();

    this.shadow.innerHTML = `
      <style>
          :host {
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 8px;
            flex-shrink: 0;
          }
          .header {
            width: 100%;
            padding: 8px;
            background: #ececec;
            margin-bottom: 8px;
          }
      </style>
      <div class="header">Quelle</div>
    `;
  }

  setSocket(socket: Socket) {
    this.socket = socket;
  }

  connectedCallback() {
    if (this.socket) {
      this.listener = message => this.messageListener(message);
      this.socket.message.addListener(this.listener);
    }
  }

  disconnectedCallback() {
    if (this.socket) {
      this.socket.message.removeListener(this.listener);
    }
  }

  private messageListener(status: SocketMessage) {
    if (status.type === 'status') {
      this.removeChilds();
      for (const key in status.data.inputs) {
        const input = status.data.inputs[key];
        const component = new SoundInputComponent();
        component.setName(input.name);
        component.setEnabled(input.enabled);
        component.addEventListener('click', () => {
          this.socket.send({type: 'set_input', data: {key}});
        }, false);
        this.addChild(component);
      }
    }
  }
}

window.customElements.define('sound-input-container', SoundInputContainerComponent);

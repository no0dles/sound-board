import {BaseComponent} from './base-component.js';
import {Socket, SocketMessage} from '../websocket.js';
import {SettingsFieldComponent} from './settings-field-component.js';

export class SettingsComponent extends BaseComponent {
  private socket: Socket | null;
  inputFields: SettingsFieldComponent[] = [];
  outputFields: SettingsFieldComponent[] = [];

  constructor() {
    super();

    this.shadow.innerHTML = `
      <style>
      :host {
        display: flex;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
      }
      .content {
        background: #fff;
        padding: 16px;
        width: 100%;
      }
      .header {
        font-size: 1.3em;
      }
      .fields {
        display: flex;
        flex-wrap: wrap;
        margin-top: 8px;
        margin-bottom: 16px;
      }
      .footer {
        display: flex;
        justify-content: flex-end;
      }
      .btn {
           background: #2b580c;
           padding: 8px 16px;
           color: #fff;      
           border-radius: 4px; 
      }
      .btn.grey {
           background: #cecece;
           color: #333;
      }
      </style>
      <div class="content">
        <div class="header">
            Einstellungen        
        </div>
        <div class="fields"></div>
        <div class="footer">
            <button id="cancel" class="btn grey" style="margin-right: 8px">Abbrechen</button>
            <button id="save" class="btn">Speichern</button>
        </div>
      </div>
    `;

    this.shadow.getElementById('cancel').addEventListener('click', () => {
      document.body.removeChild(this);
    });
    this.shadow.getElementById('save').addEventListener('click', () => {
      const data = {
        inputs: {},
        outputs: {},
      };
      for (const field of this.inputFields) {
        data.inputs[field.getKey()] = field.getValue();
      }
      for (const field of this.outputFields) {
        data.outputs[field.getKey()] = field.getValue();
      }
      this.socket.send({type: 'update_config', data});
      document.body.removeChild(this);
    });
  }

  setSocket(socket: Socket) {
    this.socket = socket;
  }

  setStatus(message: SocketMessage) {
    if (message.type !== 'status') {
      return;
    }

    const fields = this.shadow.querySelector('.fields');
    for (const key in message.data.inputs) {
      const input = new SettingsFieldComponent();
      input.setKey(key);
      input.setName(message.data.inputs[key].name);
      this.inputFields.push(input);
      fields.appendChild(input);
    }

    for (const key in message.data.outputs) {
      const input = new SettingsFieldComponent();
      input.setKey(key);
      input.setName(message.data.outputs[key].name);
      this.outputFields.push(input);
      fields.appendChild(input);
    }
  }
}

window.customElements.define('sound-settings', SettingsComponent);

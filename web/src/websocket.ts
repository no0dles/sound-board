import {EventEmitter} from './event-emitter';
import {Queue} from './queue';

export type SocketStatusEvent = SocketStatusConnectedEvent | SocketStatusDisconnectedEvent | SocketStatusErrorEvent;

export interface SocketStatusConnectedEvent {
  type: 'connected';
}

export interface SocketStatusDisconnectedEvent {
  type: 'disconnected';
  event: CloseEvent;
}

export interface SocketStatusErrorEvent {
  type: 'error';
  error: Event;
}

export type SocketMessage =
  SocketStatusMessage
  | SocketSetInputMessage
  | SocketSetOutputMessage
  | SocketUpdateConfigMessage;

export interface SocketSetInputMessage {
  type: 'set_input';
  data: {
    key: string;
  }
}

export interface SocketSetOutputMessage {
  type: 'set_output';
  data: {
    key: string;
    enabled: boolean;
  }
}

export interface SocketStatusMessage {
  type: 'status';
  data: {
    inputs: { [key: string]: { name: string, enabled: boolean } },
    outputs: { [key: string]: { name: string, enabled: boolean } }
  }
}

export interface SocketUpdateConfigMessage {
  type: 'update_config';
  data: { inputs: { [key: string]: string }; outputs: { [key: string]: string } }
}

export class Socket {
  private ws: WebSocket;
  private sendQueue = new Queue<SocketMessage>();

  status = new EventEmitter<SocketStatusEvent>();
  message = new EventEmitter<SocketMessage>();

  constructor(private url: string) {
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.status.dispatchEvent({type: 'connected'});
      let sendMessage = this.sendQueue.pop();
      while (sendMessage) {
        this.transmit(sendMessage);
        sendMessage = this.sendQueue.pop();
      }
    };

    this.ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      this.message.dispatchEvent(msg);
    };

    this.ws.onclose = (e) => {
      this.status.dispatchEvent({type: 'disconnected', event: e});
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(() => {
        this.connect();
      }, 1000);
    };

    this.ws.onerror = (err) => {
      this.status.dispatchEvent({type: 'error', error: err});
      this.ws.close();
    };
  }

  send(data: SocketMessage) {
    if (this.status.currentEvent && this.status.currentEvent.type === 'connected') {
      this.transmit(data);
    } else {
      this.sendQueue.push(data);
    }
  }

  private transmit(data: SocketMessage) {
    this.ws.send(JSON.stringify(data));
  }
}

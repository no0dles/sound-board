import {Socket} from './websocket.js';

import {SoundInputContainerComponent} from './components/sound-input-container-component.js';
import {SoundOutputContainerComponent} from './components/sound-output-container-component.js';
import {HeaderComponent} from './components/header-component.js';
import {FooterComponent} from './components/footer-component.js';
import {SpacerComponent} from './components/spacer-component.js';

const socket = new Socket('ws://localhost:8080/ws');
socket.send({type: 'set_input', data: {key: 'input1'}});

const inputContainer = new SoundInputContainerComponent();
inputContainer.setSocket(socket);

const outputContainer = new SoundOutputContainerComponent();
outputContainer.setSocket(socket);

const footer = new FooterComponent();
footer.setSocket(socket);

document.body.append(new HeaderComponent());
document.body.append(inputContainer);
document.body.append(outputContainer);
document.body.append(new SpacerComponent());
document.body.append(footer);

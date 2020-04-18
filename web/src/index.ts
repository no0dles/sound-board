import {Socket} from './websocket';

import {SoundInputContainerComponent} from './components/sound-input-container-component';
import {SoundOutputContainerComponent} from './components/sound-output-container-component';
import {HeaderComponent} from './components/header-component';
import {FooterComponent} from './components/footer-component';
import {SpacerComponent} from './components/spacer-component';

const socket = new Socket((<any>window).socketUrl || `${window.location.protocol === 'http:' ? 'ws' : 'wss'}://${window.location.host}/ws`);

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

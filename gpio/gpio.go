package gpio

import (
	"sound-board/config"
)

func NewGpioInterface(config *config.ServerConfiguration) GpioInterface {
	var gpio GpioInterface
	if config.MockGPIO {
		gpio = &GpioMock{config}
	} else {
		gpio = newGpioHub(config)
	}
	return gpio
}

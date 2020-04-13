package gpio

import (
	"github.com/stianeikeland/go-rpio/v4"
	"log"
	"sound-board/config"
	"sound-board/status"
)

type GpioHub struct {
	config *config.ServerConfiguration
}

func newGpioHub(config *config.ServerConfiguration) GpioInterface {
	gpio := GpioHub{
		config: config,
	}

	if err := rpio.Open(); err != nil {
		log.Fatal(err)
	}

	for _, value := range config.Inputs {
		value.LeftPin.Output()
		value.RightPin.Output()
		value.LeftPin.High()
		value.RightPin.High()
	}

	for _, value := range config.Outputs {
		value.Pin.Output()
		value.Pin.High()
	}

	return &gpio
}

func (gpio *GpioHub) Close() {
	rpio.Close()
}

func (gpio *GpioHub) SetStatus(status *status.ServerStatus) {
	for _, input := range gpio.config.Inputs {
		input.LeftPin.High()
		input.RightPin.High()
	}

	for _, input := range status.Inputs {
		if input.Enabled {
			inputConfig := gpio.config.Inputs[input.Key]
			inputConfig.RightPin.Low()
			inputConfig.LeftPin.Low()
			break
		}
	}

	for _, output := range status.Outputs {
		outputConfig := gpio.config.Outputs[output.Key]
		if output.Enabled {
			outputConfig.Pin.Low()
			outputConfig.Pin.Low()
		} else {
			outputConfig.Pin.High()
			outputConfig.Pin.High()
		}
	}
}

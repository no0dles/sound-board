package gpio

import (
	"fmt"
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
		for _, pin := range value.Pins {
			pin.Output()
			pin.High()
		}
	}

	for _, value := range config.Outputs {
		for _, pin := range value.Pins {
			pin.Output()
			pin.High()
		}
	}

	return &gpio
}

func (gpio *GpioHub) Close() {
	rpio.Close()
}

func (gpio *GpioHub) SetStatus(status *status.ServerStatus) {
	for key, input := range gpio.config.Inputs {
		fmt.Printf("disable %v\n", key)
		for _, pin := range input.Pins {
			pin.High()
		}
	}

	for _, input := range status.Inputs {
		if input.Enabled {
			inputConfig := gpio.config.Inputs[input.Key]
			for _, pin := range inputConfig.Pins {
				pin.Low()
			}
			break
		}
	}

	for _, output := range status.Outputs {
		outputConfig := gpio.config.Outputs[output.Key]
		for _, pin := range outputConfig.Pins {
			if output.Enabled {
				pin.Low()
			} else {
				pin.High()
			}
		}
	}
}

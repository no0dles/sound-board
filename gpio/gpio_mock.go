package gpio

import (
	"fmt"
	"github.com/stianeikeland/go-rpio/v4"
	"sound-board/config"
	"sound-board/status"
)

type GpioMock struct {
	config *config.ServerConfiguration
}

func (gpio *GpioMock) SetStatus(status *status.ServerStatus) {
	outputPins := make([]rpio.Pin, 0)
	inputPins := make([]rpio.Pin, 0)

	for key, input := range status.Inputs {
		if input.Enabled {
			for _, pin := range gpio.config.Inputs[key].Pins {
				inputPins = append(inputPins, pin)
			}
		}
	}

	for key, output := range status.Outputs {
		if output.Enabled {
			for _, pin := range gpio.config.Outputs[key].Pins {
				outputPins = append(outputPins, pin)
			}
		}
	}

	fmt.Print("GPIO: input: ")
	for _, pin := range inputPins {
		fmt.Print(pin)
		fmt.Print(" ")
	}
	fmt.Print("output: ")
	for _, pin := range outputPins {
		fmt.Print(pin)
		fmt.Print(" ")
	}
	fmt.Print("\n")
}

func (gpio *GpioMock) Close() {

}

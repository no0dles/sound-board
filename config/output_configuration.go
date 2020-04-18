package config

import "github.com/stianeikeland/go-rpio/v4"

type OutputConfiguration struct {
	Pins []rpio.Pin `json:"pins"`
	Name string     `json:"name"`
}

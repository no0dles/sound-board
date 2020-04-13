package config

import "github.com/stianeikeland/go-rpio/v4"

type OutputConfiguration struct {
	Pin rpio.Pin `json:"pin"`
	Name     string   `json:"name"`
}
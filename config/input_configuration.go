package config

import "github.com/stianeikeland/go-rpio/v4"

type InputConfiguration struct {
	LeftPin  rpio.Pin `json:"leftPin"`
	RightPin rpio.Pin `json:"rightPin"`
	Name     string   `json:"name"`
}

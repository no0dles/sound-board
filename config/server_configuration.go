package config

type ServerConfiguration struct {
	MockGPIO bool                           `json:"mockGPIO"`
	Inputs   map[string]*InputConfiguration  `json:"inputs"`
	Outputs  map[string]*OutputConfiguration `json:"outputs"`
}

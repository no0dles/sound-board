package config

type UpdateConfig struct {
	Inputs map[string]string `json:"inputs"`
	Outputs map[string]string `json:"output"`
}

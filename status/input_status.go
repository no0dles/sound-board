package status

import "sound-board/config"

type InputStatus struct {
	Key     string `json:"key"`
	Name    string `json:"name"`
	Enabled bool   `json:"enabled"`
}

func NewStatus(config *config.ServerConfiguration) *ServerStatus {
	var status ServerStatus
	status.Inputs = make(map[string]*InputStatus)
	status.Outputs = make(map[string]*OutputStatus)

	for key, input := range config.Inputs {
		status.Inputs[key] = &InputStatus{
			Key:     key,
			Name:    input.Name,
			Enabled: false,
		}
	}

	for key, output := range config.Outputs {
		status.Outputs[key] = &OutputStatus{
			Key:     key,
			Name:    output.Name,
			Enabled: false,
		}
	}

	return &status
}

func UpdateStatus(status *ServerStatus, config *config.ServerConfiguration) {
	for key, input := range config.Inputs {
		if currentInput, ok := status.Inputs[key]; ok {
			currentInput.Name = input.Name
		} else {
			status.Inputs[key] = &InputStatus{
				Key:     key,
				Name:    input.Name,
				Enabled: false,
			}
		}
	}

	for key, _ := range status.Inputs {
		if _, ok := config.Inputs[key]; !ok {
			delete(status.Inputs, key)
		}
	}

	for key, output := range config.Outputs {
		if currentOutput, ok := status.Outputs[key]; ok {
			currentOutput.Name = output.Name
		} else {
			status.Outputs[key] = &OutputStatus{
				Key:     key,
				Name:    output.Name,
				Enabled: false,
			}
		}
	}

	for key, _ := range status.Outputs {
		if _, ok := config.Outputs[key]; !ok {
			delete(status.Outputs, key)
		}
	}
}

package status

type ServerStatus struct {
	Inputs  map[string]*InputStatus  `json:"inputs"`
	Outputs map[string]*OutputStatus `json:"outputs"`
}

func (status ServerStatus) SetInput(setInput *SetInput) {
	for key, input := range status.Inputs {
		input.Enabled = key == setInput.Key
	}
}

func (status ServerStatus) SetOutput(setOutput *SetOutput) {
	for key, output := range status.Outputs {
		output.Enabled = key == setOutput.Key
	}
}

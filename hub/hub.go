package hub

import (
	"fmt"
	"sound-board/config"
	"sound-board/gpio"
	"sound-board/socket"
	"sound-board/status"
)

type Hub struct {
	config         *config.ServerConfiguration
	status         *status.ServerStatus
	gpio           gpio.GpioInterface
	clients        []*socket.Client
	clientMessages chan *socket.ClientMessage
}

func NewHub(cfg *config.ServerConfiguration, gpio gpio.GpioInterface) *Hub {
	clientMessages := make(chan *socket.ClientMessage)

	hub := &Hub{
		config:         cfg,
		clients:        make([]*socket.Client, 0),
		status:         status.NewStatus(cfg),
		gpio:           gpio,
		clientMessages: clientMessages,
	}
	hub.gpio.SetStatus(hub.status)

	cfgWatcher := config.WatchConfig(cfg)

	go func() {
		for newCfg := range cfgWatcher {
			hub.config = newCfg
			status.UpdateStatus(hub.status, newCfg)
			hub.Broadcast(hub.ServerStatusMessage())
		}
	}()

	go func() {
		for message := range clientMessages {
			fmt.Println(message)
			if message.Data == nil {
				fmt.Println("invalid client message with no data")
				continue
			}

			if message.Type == "set_input" {
				setInput := &status.SetInput{
					Key: message.Data["key"].(string),
				}
				hub.SetInput(setInput)
			} else if message.Type == "set_output" {
				setOutput := &status.SetOutput{
					Enabled: message.Data["enabled"].(bool),
					Key:     message.Data["key"].(string),
				}
				hub.SetOutput(setOutput)
			} else if message.Type == "update_config" {
				updateConfig := &config.UpdateConfig{
					Inputs:  convertMap(message.Data["inputs"].(map[string]interface{})),
					Outputs: convertMap(message.Data["outputs"].(map[string]interface{})),
				}
				config.WriteConfig(updateConfig)
			} else {
				fmt.Println("unknown message")
			}
		}
	}()

	return hub
}

func convertMap(src map[string]interface{}) map[string]string {
	result := make(map[string]string)

	for key, value := range src {
		result[key] = fmt.Sprintf("%v", value)
	}

	return result
}

func (hub *Hub) ServerStatusMessage() *socket.ServerMessage {
	return &socket.ServerMessage{Type: "status", Data: hub.status}
}

func (hub *Hub) SetInput(input *status.SetInput) {
	hub.status.SetInput(input)
	hub.gpio.SetStatus(hub.status)
	hub.Broadcast(hub.ServerStatusMessage())
}

func (hub *Hub) SetOutput(output *status.SetOutput) {
	hub.status.SetOutput(output)
	hub.gpio.SetStatus(hub.status)
	hub.Broadcast(hub.ServerStatusMessage())
}

func (hub *Hub) Broadcast(message *socket.ServerMessage) {
	for _, client := range hub.clients {
		client.Send(message)
	}
}

func (hub *Hub) AddClient(client *socket.Client) {
	hub.clients = append(hub.clients, client)
	client.Send(hub.ServerStatusMessage())
	go client.Read(hub.clientMessages)
}

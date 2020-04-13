package socket

type ServerMessage struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

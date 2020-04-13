package socket

type ClientMessage struct {
	Type string                 `json:"type"`
	Data map[string]interface{} `json:"data"`
}
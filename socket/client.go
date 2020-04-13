package socket

import (
	"bytes"
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"time"
)

type Client struct {
	conn *websocket.Conn
}

func (client *Client) Send(message *ServerMessage) {
	client.conn.WriteJSON(message)
}

func (client *Client) Read(clientMessages chan *ClientMessage) {
	client.conn.SetReadLimit(maxMessageSize)
	client.conn.SetPongHandler(func(string) error { client.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		_, message, err := client.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))

		var clientMessage ClientMessage
		err = json.Unmarshal(message, &clientMessage)
		if err != nil {
			log.Fatal("error parsing socket message")
		}

		clientMessages <- &clientMessage
	}

	client.conn.Close()
}
package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"sound-board/config"
	"sound-board/gpio"
	"sound-board/hub"
	"sound-board/socket"
)

var (
	addr = flag.String("addr", "0.0.0.0:8080", "http service address")
)

func main() {
	flag.Parse()

	cfg := config.ReadConfig()

	var gpio = gpio.NewGpioInterface(cfg)
	var hub = hub.NewHub(cfg, gpio)

	defer gpio.Close()

	http.Handle("/", http.FileServer(http.Dir("./web/dist/sound-board")))
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		client := socket.ServeWs(w, r)
		hub.AddClient(client)
	})

	fmt.Printf("Listening on %s\n", *addr)
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

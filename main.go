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
	"sound-board/status"
	"time"
)

var (
	addr = flag.String("addr", "0.0.0.0:8080", "http service address")
	test = flag.Bool("test", false, "test config")
)

func main() {
	flag.Parse()

	cfg := config.ReadConfig()

	var gpio = gpio.NewGpioInterface(cfg)
	//defer gpio.Close()

	if *test {
		testProgram(cfg, gpio)
	}

	var hub = hub.NewHub(cfg, gpio)

	http.Handle("/", http.FileServer(http.Dir("./web/dist")))
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

func testProgram(cfg *config.ServerConfiguration, gpio gpio.GpioInterface) {
	stat := status.NewStatus(cfg)
	for {
		for inputKey, _ := range cfg.Inputs {
			stat.SetInput(&status.SetInput{
				Key: inputKey,
			})

			for outputKey, _ := range cfg.Outputs {
				stat.SetOutput(&status.SetOutput{
					Key:     outputKey,
					Enabled: true,
				})
				runTestStatus(gpio, stat)
			}
		}
	}
}

func runTestStatus(gpio gpio.GpioInterface, status *status.ServerStatus) {
	gpio.SetStatus(status)
	//jsonString, _ := json.MarshalIndent(status, "", "  ")
	//fmt.Println(string(jsonString))
	time.Sleep(1000 * time.Millisecond)
}

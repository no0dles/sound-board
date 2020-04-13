package config

import (
	"encoding/json"
	"github.com/fsnotify/fsnotify"
	"io/ioutil"
	"log"
	"os"
)

func ReadConfig() *ServerConfiguration {
	jsonFile, err := os.Open("config.json")
	if err != nil {
		log.Fatal("config.json not found")
	}
	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		log.Fatal("error reading config file")
	}

	var config ServerConfiguration
	err = json.Unmarshal(byteValue, &config)
	if err != nil {
		log.Fatal("error parsing config file")
	}

	return &config
}

func WriteConfig(update *UpdateConfig) {
	config := ReadConfig()
	for key, value := range update.Inputs {
		if currentInput, ok := config.Inputs[key]; ok {
			currentInput.Name = value
		}
	}
	for key, value := range update.Outputs {
		if currentOutput, ok := config.Outputs[key]; ok {
			currentOutput.Name = value
		}
	}

	jsonString, _ := json.MarshalIndent(config, "", "  ")
	ioutil.WriteFile("config.json", jsonString, os.ModePerm)
}

func WatchConfig(config *ServerConfiguration) chan *ServerConfiguration {
	changedConfig := make(chan *ServerConfiguration)

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}

	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				if event.Op&fsnotify.Write == fsnotify.Write {
					newCfg := ReadConfig()
					changedConfig <- newCfg
				}
			}
		}
	}()

	err = watcher.Add("./config.json")
	if err != nil {
		log.Fatal(err)
	}

	return changedConfig
}

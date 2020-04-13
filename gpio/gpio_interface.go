package gpio

import "sound-board/status"

type GpioInterface interface {
	SetStatus(status *status.ServerStatus)
	Close()
}

import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

pins = [
    40,
    16,
    26,
    24,

    38,
    36,
    32,
    22,
]


try:
    for pin in pins:
        print(pin)
        GPIO.setup(pin, GPIO.OUT)
        GPIO.output(pin, GPIO.HIGH)

    # Endlosschleife
    while True:
        for pin in pins:
            print(pin)
            GPIO.output(pin, GPIO.LOW)
            time.sleep(0.5)
            GPIO.output(pin, GPIO.HIGH)
            time.sleep(0.5)
finally:
    GPIO.cleanup()
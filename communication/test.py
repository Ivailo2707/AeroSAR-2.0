#pip install rpi-rf


#TX

from rpi_rf import RFDevice
import time

rfdevice = RFDevice(17)  # GPIO 17 TX (NOTE try 11)
rfdevice.enable_tx()
time.sleep(1)

try:
    while True:
        rfdevice.tx_code(123456, protocol=1, pulselength=350)
        print("Sent code: 123456")
        time.sleep(1)
except KeyboardInterrupt:
    rfdevice.cleanup()

#RX

from rpi_rf import RFDevice
import time

rfdevice = RFDevice(27)  # GPIO 27 RX (NOTE try 13)
rfdevice.enable_rx()
timestamp = None

print("Listening for RF signals...")
try:
    while True:
        if rfdevice.rx_code_timestamp != timestamp:
            timestamp = rfdevice.rx_code_timestamp
            print("Received: {}".format(rfdevice.rx_code))
        time.sleep(0.01)
except KeyboardInterrupt:
    rfdevice.cleanup()
